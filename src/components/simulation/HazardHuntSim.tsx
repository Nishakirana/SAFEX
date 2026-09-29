import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Clock, CheckCircle2, AlertTriangle, ArrowRight, ShieldAlert } from 'lucide-react';
import { SimulationResult } from '../../types';

interface HuntItem {
  id: string;
  name: string;
  x: number;
  y: number;
  question: string;
  correctAnswer: string;
  options: string[];
  found: boolean;
}

export const HazardHuntSim: React.FC = () => {
  const { navigateTo, setSimulationResult } = useApp();
  const [timeLeft, setTimeLeft] = useState(120); // 2 mins
  const [activeHazard, setActiveHazard] = useState<HuntItem | null>(null);
  const [hazards, setHazards] = useState<HuntItem[]>([
    {
      id: 'h1',
      name: 'Exposed Electrical Wire',
      x: 25,
      y: 30,
      question: 'Bare copper wire is visible near 415V distribution bus.',
      correctAnswer: 'Isolate breaker & wrap with rubber insulation boot',
      options: ['Isolate breaker & wrap with rubber insulation boot', 'Tape over wire with duct tape while live', 'Ignore if dry'],
      found: false
    },
    {
      id: 'h2',
      name: 'Blocked Exit Aisle',
      x: 75,
      y: 40,
      question: 'Wooden pallets obstruct green emergency evacuation door.',
      correctAnswer: 'Remove pallets immediately to clear 1.2m egress width',
      options: ['Remove pallets immediately to clear 1.2m egress width', 'Leave pallets until shift end', 'Stack them higher'],
      found: false
    },
    {
      id: 'h3',
      name: 'Hydraulic Oil Spill',
      x: 45,
      y: 70,
      question: 'Slick hydraulic oil pooled on high-traffic gangway.',
      correctAnswer: 'Spread absorbant granules & erect slip caution barrier',
      options: ['Spread absorbant granules & erect slip caution barrier', 'Mop with water', 'Walk around it'],
      found: false
    },
    {
      id: 'h4',
      name: 'Unchained Gas Cylinder',
      x: 18,
      y: 65,
      question: 'Acetylene cylinder standing upright without safety chain restraint.',
      correctAnswer: 'Secure cylinder with dual steel safety chain & cap',
      options: ['Secure cylinder with dual steel safety chain & cap', 'Lay cylinder flat on floor', 'No action needed'],
      found: false
    },
    {
      id: 'h5',
      name: 'Unguarded Flywheel',
      x: 60,
      y: 25,
      question: 'High-speed rotating pulley missing protective yellow interlock guard.',
      correctAnswer: 'Stop machine & install physical pinch-point guard',
      options: ['Stop machine & install physical pinch-point guard', 'Operate at lower speed', 'Warn workers verbally'],
      found: false
    }
  ]);

  const [score, setScore] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  const foundCount = hazards.filter(h => h.found).length;

  const handleSelectOption = (opt: string) => {
    if (!activeHazard) return;
    if (opt === activeHazard.correctAnswer) {
      setHazards(prev => prev.map(h => h.id === activeHazard.id ? { ...h, found: true } : h));
      setScore(s => s + 20);
    }
    setActiveHazard(null);
  };

  const handleFinish = () => {
    const finalScore = (foundCount / hazards.length) * 100;
    const finalRes: SimulationResult = {
      scenarioId: 'hazard-hunt',
      scenarioTitle: 'Workplace Hazard Hunt',
      completionTime: `${120 - timeLeft}s`,
      scores: {
        overallScore: finalScore,
        hazardRecognition: finalScore,
        procedureAccuracy: 90,
        responseTimeScore: Math.min(100, timeLeft * 2),
        ppeCompliance: 100,
        safetyDiscipline: 95
      },
      criticalErrors: [],
      actionLogs: [],
      passed: finalScore >= 80,
      retrainingRecommended: {
        title: 'Site Visual Inspection & Ergonomics',
        duration: '02:00',
        focusAreas: ['Compressed Gas Storage Standards', 'Walkway Clearance']
      },
      earnedCertificateId: finalScore >= 80 ? 'SFX-2026-87302' : undefined
    };

    setSimulationResult(finalRes);
    navigateTo('/simulations/results');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-stone-900 text-white p-5 rounded-2xl border border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/30 border border-emerald-400 text-emerald-400 flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded font-bold">
              SITE INSPECTION MODE
            </span>
            <h2 className="text-lg font-extrabold text-white mt-0.5">Find 5 Industrial Hazards</h2>
          </div>
        </div>
        <div className="flex items-center gap-6 font-mono text-xs">
          <div className="bg-stone-800 px-3 py-1.5 rounded-lg text-amber-400 flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> TIME: <strong className="text-white">{timeLeft}s</strong>
          </div>
          <div className="bg-emerald-950 border border-emerald-800 text-emerald-400 px-3 py-1.5 rounded-lg font-bold">
            FOUND: {foundCount} / {hazards.length}
          </div>
        </div>
      </div>

      {/* Visual Scene Canvas */}
      <div className="relative h-[420px] bg-stone-950 rounded-3xl border-2 border-stone-800 overflow-hidden shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center filter saturate-125 brightness-90"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80')` }}
        />
        <div className="absolute inset-0 ar-grid-overlay opacity-20 pointer-events-none" />

        {/* Hotspots */}
        {hazards.map(h => (
          <button
            key={h.id}
            onClick={() => setActiveHazard(h)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 focus:outline-none z-20 group"
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
          >
            <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center shadow-xl transition-all ${
              h.found 
                ? 'bg-emerald-500 border-white text-stone-950 font-black' 
                : 'bg-rose-600/90 border-amber-300 text-white animate-pulse'
            }`}>
              {h.found ? '✓' : '!'}
            </div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] bg-stone-900 text-white px-2 py-0.5 rounded font-mono font-bold whitespace-nowrap border border-stone-700">
              {h.found ? h.name : 'Inspect Hazard'}
            </span>
          </button>
        ))}
      </div>

      {/* Answer Modal */}
      {activeHazard && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-rose-700 font-extrabold text-sm">
              <AlertTriangle className="w-5 h-5" />
              Hazard Identified: {activeHazard.name}
            </div>
            <p className="text-xs text-stone-700 font-medium">{activeHazard.question}</p>
            <p className="text-xs font-bold text-stone-900">What is the correct remediation?</p>

            <div className="space-y-2">
              {activeHazard.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectOption(opt)}
                  className="w-full text-left p-3 rounded-xl border border-stone-200 hover:bg-stone-900 hover:text-white text-xs font-medium transition-all"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleFinish}
          className="px-8 py-3 rounded-xl bg-stone-900 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-xl transition-all flex items-center gap-2"
        >
          Submit Hazard Inspection Results
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>

    </div>
  );
};
