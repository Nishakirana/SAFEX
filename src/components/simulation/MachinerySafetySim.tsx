import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Wrench, ShieldAlert, CheckCircle2, Lock, ArrowRight, AlertTriangle } from 'lucide-react';
import { SimulationResult } from '../../types';

export const MachinerySafetySim: React.FC = () => {
  const { navigateTo, setSimulationResult } = useApp();
  const [lotoApplied, setLotoApplied] = useState(false);
  const [eStopPressed, setEStopPressed] = useState(false);
  const [guardInspected, setGuardInspected] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleApplyLOTO = () => {
    setLotoApplied(true);
    setFeedback("Lockout/Tagout padlock and physical warning tag attached to breaker panel 4B. Energy isolated.");
  };

  const handleEStop = () => {
    setEStopPressed(true);
    setFeedback("Emergency Stop mushroom button engaged. Main motor drive zero-rpm confirmed.");
  };

  const handleInspectGuard = () => {
    setGuardInspected(true);
    setFeedback("Nip-Point interlock guard re-aligned and safety pin inserted.");
  };

  const handleFinish = () => {
    const finalRes: SimulationResult = {
      scenarioId: 'machinery',
      scenarioTitle: 'Machinery & Equipment Safety',
      completionTime: '03:45',
      scores: {
        overallScore: 92,
        hazardRecognition: 94,
        procedureAccuracy: 90,
        responseTimeScore: 85,
        ppeCompliance: 95,
        safetyDiscipline: 96
      },
      criticalErrors: [],
      actionLogs: [],
      passed: true,
      retrainingRecommended: {
        title: 'Zero Energy Lockout/Tagout Level 1',
        duration: '02:30',
        focusAreas: ['Physical Tagout Signing', 'Hydraulic Pressure Bleed']
      },
      earnedCertificateId: 'SFX-2026-87302'
    };

    setSimulationResult(finalRes);
    navigateTo('/simulations/results');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="bg-stone-900 text-white p-5 rounded-2xl border border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-600/30 border border-orange-500 text-orange-400 flex items-center justify-center">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-orange-400 bg-orange-950 px-2 py-0.5 rounded font-bold">
              MECHANICAL ISOLATION
            </span>
            <h2 className="text-lg font-extrabold text-white mt-0.5">Heavy Industrial Press Line Lockout</h2>
          </div>
        </div>
        <span className="text-xs bg-stone-800 text-emerald-400 px-3 py-1 rounded-full font-mono font-bold">
          LOTO STATUS: {lotoApplied ? 'ISOLATED' : 'LIVE POWER'}
        </span>
      </div>

      {/* Main Interactive Workstation */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xl space-y-6">
        
        {/* Machinery Diagram Mockup */}
        <div className="relative h-64 bg-stone-950 rounded-2xl overflow-hidden border border-stone-800 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80')` }}
          />

          <div className="relative z-10 text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-stone-900 border-2 border-orange-500 text-orange-400 flex items-center justify-center mx-auto animate-spin-slow">
              <Lock className="w-8 h-8" />
            </div>
            <p className="text-sm font-bold text-white">400-Ton Automated Stamping Press #4</p>
            <p className="text-xs text-stone-400 font-mono">STATUS: {lotoApplied ? 'LOTO LOCKED & TAGGED' : 'LIVE 415V ENERGIZED'}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={handleEStop}
            disabled={eStopPressed}
            className={`p-4 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-2 ${
              eStopPressed ? 'bg-rose-100 border-rose-300 text-rose-900' : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800'
            }`}
          >
            <AlertTriangle className="w-6 h-6 text-rose-600" />
            <span>1. Press E-Stop Mushroom</span>
            {eStopPressed && <span className="text-[10px] text-rose-700 font-extrabold">ENGAGED</span>}
          </button>

          <button
            onClick={handleApplyLOTO}
            disabled={lotoApplied}
            className={`p-4 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-2 ${
              lotoApplied ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800'
            }`}
          >
            <Lock className="w-6 h-6 text-emerald-600" />
            <span>2. Apply LOTO Lock & Tag</span>
            {lotoApplied && <span className="text-[10px] text-emerald-700 font-extrabold">LOCKED</span>}
          </button>

          <button
            onClick={handleInspectGuard}
            disabled={guardInspected}
            className={`p-4 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-2 ${
              guardInspected ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800'
            }`}
          >
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <span>3. Re-align Safety Interlock</span>
            {guardInspected && <span className="text-[10px] text-emerald-700 font-extrabold font-mono">VERIFIED</span>}
          </button>
        </div>

        {feedback && (
          <div className="p-4 rounded-xl bg-stone-900 text-white text-xs font-mono leading-relaxed">
            {feedback}
          </div>
        )}

        <div className="pt-4 border-t border-stone-100">
          <button
            onClick={handleFinish}
            disabled={!lotoApplied || !eStopPressed}
            className="w-full py-3 rounded-xl bg-stone-900 hover:bg-emerald-600 disabled:opacity-40 text-white font-extrabold text-xs shadow-xl transition-all flex items-center justify-center gap-2"
          >
            Complete Machinery Safety Evaluation
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

      </div>

    </div>
  );
};
