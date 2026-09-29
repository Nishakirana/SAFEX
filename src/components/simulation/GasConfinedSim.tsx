import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Radio, AlertTriangle, ShieldCheck, CheckCircle2, ArrowRight, RotateCcw, Wind } from 'lucide-react';
import { SimulationResult } from '../../types';

export const GasConfinedSim: React.FC = () => {
  const { navigateTo, setSimulationResult } = useApp();
  const [step, setStep] = useState(1);
  const [gasLevels, setGasLevels] = useState({ o2: 18.2, h2s: 18.5, co: 45 });
  const [ventilationActive, setVentilationActive] = useState(false);
  const [scbaDonned, setScbaDonned] = useState(false);
  const [buddyVerified, setBuddyVerified] = useState(false);
  const [permitSigned, setPermitSigned] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(100);
  const [criticals, setCriticals] = useState<string[]>([]);

  const handleTurnVentilation = () => {
    setVentilationActive(true);
    setGasLevels({ o2: 20.9, h2s: 2.1, co: 5 });
    setScore(s => s + 15);
    setFeedback("Forced ventilation blower activated! Toxic gas purged to safe levels (O2: 20.9%, H2S: 2.1 ppm).");
  };

  const handleDonSCBA = () => {
    setScbaDonned(true);
    setScore(s => s + 15);
    setFeedback("Full-Face Positive Pressure SCBA donned. Face seal test verified clean at 200 Bar.");
  };

  const handleUnsafeEntryAttempt = () => {
    setScore(s => Math.max(0, s - 30));
    setCriticals(c => [...c, "Attempted confined space entry without forced blower ventilation or SCBA harness!"]);
    setFeedback("CRITICAL SAFETY ERROR! Entering toxic H2S atmosphere (> 10 ppm) without SCBA causes loss of consciousness in 30 seconds!");
  };

  const handleCompleteSim = () => {
    const finalRes: SimulationResult = {
      scenarioId: 'gas',
      scenarioTitle: 'Gas Leak & Confined Space',
      completionTime: '04:12',
      scores: {
        overallScore: score,
        hazardRecognition: score >= 80 ? 92 : 65,
        procedureAccuracy: score >= 80 ? 95 : 60,
        responseTimeScore: 88,
        ppeCompliance: scbaDonned ? 100 : 50,
        safetyDiscipline: criticals.length === 0 ? 98 : 45
      },
      criticalErrors: criticals,
      actionLogs: [],
      passed: score >= 75 && criticals.length === 0,
      retrainingRecommended: {
        title: 'H2S Atmospheric Monitoring & SCBA Entry Drills',
        duration: '03:30',
        focusAreas: ['4-Gas Detector Calibration', 'Buddy Lifeline Inspection', 'Forced Blower Purge Time']
      },
      earnedCertificateId: score >= 75 && criticals.length === 0 ? 'SFX-2026-76114' : undefined
    };

    setSimulationResult(finalRes);
    navigateTo('/simulations/results');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-stone-900 text-white p-5 rounded-2xl border border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/30 border border-amber-400 text-amber-400 flex items-center justify-center">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-950 px-2 py-0.5 rounded font-bold">
              CONFINED SPACE PROTOCOL
            </span>
            <h2 className="text-lg font-extrabold text-white mt-0.5">Atmospheric Sampling & Purge Protocol</h2>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-stone-400">Score:</span>
          <p className="text-xl font-black text-emerald-400 font-mono">{score}%</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Atmospheric 4-Gas Monitor Instrument HUD */}
        <div className="bg-stone-950 p-6 rounded-3xl border-2 border-stone-800 text-white space-y-6">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h3 className="font-extrabold text-sm text-stone-200 flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400" />
              4-Gas Atmospheric Detector HUD
            </h3>
            <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded font-mono">CALIBRATED</span>
          </div>

          <div className="grid grid-cols-3 gap-3 font-mono">
            
            {/* O2 Meter */}
            <div className={`p-4 rounded-2xl border text-center ${gasLevels.o2 < 19.5 ? 'bg-rose-950/60 border-rose-600 text-rose-300' : 'bg-stone-900 border-stone-700 text-emerald-400'}`}>
              <span className="text-[10px] text-stone-400 block font-sans">OXYGEN (O2)</span>
              <span className="text-2xl font-black">{gasLevels.o2}%</span>
              <span className="text-[9px] block mt-1">{gasLevels.o2 < 19.5 ? 'DEFICIENT' : 'NORMAL'}</span>
            </div>

            {/* H2S Meter */}
            <div className={`p-4 rounded-2xl border text-center ${gasLevels.h2s > 10 ? 'bg-rose-950/60 border-rose-600 text-rose-300' : 'bg-stone-900 border-stone-700 text-emerald-400'}`}>
              <span className="text-[10px] text-stone-400 block font-sans font-bold">TOXIC H2S</span>
              <span className="text-2xl font-black">{gasLevels.h2s} <span className="text-[10px]">PPM</span></span>
              <span className="text-[9px] block mt-1">{gasLevels.h2s > 10 ? 'LETHAL REDLINE' : 'SAFE'}</span>
            </div>

            {/* CO Meter */}
            <div className={`p-4 rounded-2xl border text-center ${gasLevels.co > 25 ? 'bg-amber-950/60 border-amber-600 text-amber-300' : 'bg-stone-900 border-stone-700 text-emerald-400'}`}>
              <span className="text-[10px] text-stone-400 block font-sans">CARB MONOXIDE</span>
              <span className="text-2xl font-black">{gasLevels.co} <span className="text-[10px]">PPM</span></span>
              <span className="text-[9px] block mt-1">{gasLevels.co > 25 ? 'HIGH' : 'SAFE'}</span>
            </div>

          </div>

          {/* Status Indicators */}
          <div className="space-y-2 text-xs font-medium">
            <div className="flex items-center justify-between p-3 rounded-xl bg-stone-900 border border-stone-800">
              <span className="text-stone-300 flex items-center gap-2">
                <Wind className="w-4 h-4 text-emerald-400" /> Forced Air Blower Ventilation:
              </span>
              <span className={`font-bold ${ventilationActive ? 'text-emerald-400' : 'text-stone-500'}`}>
                {ventilationActive ? 'ACTIVE (AIR FLOW 800 CFM)' : 'INACTIVE'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-stone-900 border border-stone-800">
              <span className="text-stone-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> SCBA Positive Seal Harness:
              </span>
              <span className={`font-bold ${scbaDonned ? 'text-emerald-400' : 'text-stone-500'}`}>
                {scbaDonned ? 'DONNED (200 BAR)' : 'NOT DONNED'}
              </span>
            </div>
          </div>

        </div>

        {/* Right Column: Actions & Permits */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold text-stone-900 mb-2">Confined Space Safe Entry Checklist</h3>
            <p className="text-xs text-stone-500 mb-4">Execute all mandatory HSE controls prior to breaking vessel seal.</p>

            <div className="space-y-3">
              <button
                onClick={handleTurnVentilation}
                disabled={ventilationActive}
                className={`w-full p-3.5 rounded-2xl border text-xs font-bold transition-all flex items-center justify-between ${
                  ventilationActive ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-emerald-600" /> 1. Start Forced Ventilation Blower
                </span>
                {ventilationActive ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <ArrowRight className="w-4 h-4 text-stone-400" />}
              </button>

              <button
                onClick={handleDonSCBA}
                disabled={scbaDonned}
                className={`w-full p-3.5 rounded-2xl border text-xs font-bold transition-all flex items-center justify-between ${
                  scbaDonned ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> 2. Don SCBA Apparatus & Seal Test
                </span>
                {scbaDonned ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <ArrowRight className="w-4 h-4 text-stone-400" />}
              </button>

              <button
                onClick={handleUnsafeEntryAttempt}
                className="w-full p-3.5 rounded-2xl border border-rose-200 bg-rose-50/50 hover:bg-rose-100 text-rose-900 text-xs font-bold transition-all flex items-center justify-between"
              >
                <span>3. Enter Vessel immediately without waiting for blower purge</span>
                <AlertTriangle className="w-4 h-4 text-rose-600" />
              </button>
            </div>

            {feedback && (
              <div className="mt-4 p-3.5 rounded-xl bg-stone-900 text-white text-xs leading-relaxed font-mono">
                {feedback}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-stone-100">
            <button
              onClick={handleCompleteSim}
              disabled={!ventilationActive || !scbaDonned}
              className="w-full py-3 rounded-xl bg-stone-900 hover:bg-emerald-600 disabled:opacity-40 text-white font-extrabold text-xs shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Sign Permit & Complete Gas Simulation
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
