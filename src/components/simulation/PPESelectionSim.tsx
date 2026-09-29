import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { SimulationResult } from '../../types';

interface PPEItem {
  id: string;
  name: string;
  category: 'head' | 'eyes' | 'respirator' | 'hands' | 'body' | 'feet' | 'hearing' | 'harness';
  requiredForZone: boolean;
  spec: string;
  icon: string;
}

export const PPESelectionSim: React.FC = () => {
  const { navigateTo, setSimulationResult } = useApp();

  const [selectedPpe, setSelectedPpe] = useState<Record<string, boolean>>({
    helmet: true,
    goggles: true,
    gloves: true,
    boots: true,
  });

  const ppeOptions: PPEItem[] = [
    { id: 'helmet', name: 'Industrial Hard Hat (EN 397)', category: 'head', requiredForZone: true, spec: 'Rated for 20kg top impact', icon: '🪖' },
    { id: 'goggles', name: 'Chemical Splash Goggles', category: 'eyes', requiredForZone: true, spec: 'ANSI Z87.1 anti-fog seal', icon: '🥽' },
    { id: 'respirator', name: 'Viton Chemical Respirator', category: 'respirator', requiredForZone: true, spec: 'Organic vapor cartridge', icon: '😷' },
    { id: 'gloves', name: 'Viton Chemical Gloves', category: 'hands', requiredForZone: true, spec: 'Heavy acid permeation resistant', icon: '🧤' },
    { id: 'apron', name: 'Heavy Neoprene Chemical Apron', category: 'body', requiredForZone: true, spec: 'Full front acid splash shield', icon: '🥼' },
    { id: 'boots', name: 'Steel-Toe Chemical Boots', category: 'feet', requiredForZone: true, spec: 'Anti-slip puncture resistant', icon: '🥾' },
    { id: 'earplugs', name: '32dB NRR Ear Defenders', category: 'hearing', requiredForZone: false, spec: 'High-decibel noise dampening', icon: '🎧' },
    { id: 'harness', name: 'Full Body Fall Arrest Harness', category: 'harness', requiredForZone: false, spec: 'Dual-lanyard shock absorber', icon: '🦺' },
  ];

  const togglePpe = (id: string) => {
    setSelectedPpe(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleVerifyPpe = () => {
    // Calculate compliance score
    let score = 100;
    const missingRequired = ppeOptions.filter(p => p.requiredForZone && !selectedPpe[p.id]);
    const unnecessaryExtra = ppeOptions.filter(p => !p.requiredForZone && selectedPpe[p.id]);

    score -= missingRequired.length * 20;
    score -= unnecessaryExtra.length * 5;
    score = Math.max(0, score);

    const finalRes: SimulationResult = {
      scenarioId: 'ppe',
      scenarioTitle: 'PPE & Chemical Site Induction',
      completionTime: '02:15',
      scores: {
        overallScore: score,
        hazardRecognition: 95,
        procedureAccuracy: 90,
        responseTimeScore: 98,
        ppeCompliance: score,
        safetyDiscipline: 96
      },
      criticalErrors: missingRequired.map(m => `Missing essential ${m.name} for chemical transfer bay!`),
      actionLogs: [],
      passed: score >= 85,
      retrainingRecommended: {
        title: 'Chemical PPE Matrix Standard Operating Procedure',
        duration: '02:00',
        focusAreas: ['Viton Chemical Resistance Chart', 'Apron Tie Down Protocol']
      },
      earnedCertificateId: score >= 85 ? 'SFX-2026-76114' : undefined
    };

    setSimulationResult(finalRes);
    navigateTo('/simulations/results');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="bg-stone-900 text-white p-5 rounded-2xl border border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/30 border border-emerald-400 text-emerald-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded font-bold">
              ZONE: ACID TRANSFER BAY B-4
            </span>
            <h2 className="text-lg font-extrabold text-white mt-0.5">Personal Protective Equipment (PPE) Matrix</h2>
          </div>
        </div>
        <span className="text-xs text-stone-400">
          Target: <strong className="text-white">100% Chemical Splash Protection</strong>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Worker Avatar Silhouette Visual (5 Cols) */}
        <div className="lg:col-span-5 bg-stone-950 rounded-3xl border-2 border-stone-800 p-6 text-white flex flex-col items-center justify-between shadow-2xl relative">
          
          <div className="w-full border-b border-stone-800 pb-3 flex justify-between items-center text-xs font-mono">
            <span className="text-stone-400">TRAINEE SILHOUETTE</span>
            <span className="text-emerald-400 font-bold">LIVE FITMENT</span>
          </div>

          {/* Avatar Graphic Stack */}
          <div className="relative w-48 h-80 my-4 flex items-center justify-center bg-stone-900/60 rounded-2xl border border-stone-800">
            <div className="text-center space-y-3">
              <div className="text-6xl animate-bounce-slow">
                {selectedPpe['helmet'] ? '🪖' : '👤'}
              </div>
              <div className="text-4xl">
                {selectedPpe['goggles'] ? '🥽' : ''} {selectedPpe['respirator'] ? '😷' : ''}
              </div>
              <div className="text-5xl">
                {selectedPpe['apron'] ? '🥼' : '👕'} {selectedPpe['gloves'] ? '🧤' : ''}
              </div>
              <div className="text-4xl">
                {selectedPpe['boots'] ? '🥾' : '👟'}
              </div>
            </div>
          </div>

          {/* Active Equipment Badges */}
          <div className="w-full flex flex-wrap gap-1.5 justify-center">
            {ppeOptions.map(p => selectedPpe[p.id] && (
              <span key={p.id} className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-mono font-bold">
                ✓ {p.name.split(' ')[0]}
              </span>
            ))}
          </div>

        </div>

        {/* Right Column: PPE Options Grid (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold text-stone-900 mb-1">Equip Appropriate PPE for Chemical Transfer</h3>
            <p className="text-xs text-stone-500 mb-4">Select items required to safely withstand 98% concentrated Sulfuric Acid line inspection.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ppeOptions.map(p => {
                const isSelected = selectedPpe[p.id];
                return (
                  <button
                    key={p.id}
                    onClick={() => togglePpe(p.id)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                      isSelected 
                        ? 'bg-stone-900 text-white border-stone-900 shadow-md' 
                        : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800'
                    }`}
                  >
                    <span className="text-2xl">{p.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-xs truncate">{p.name}</p>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </div>
                      <p className={`text-[10px] mt-0.5 truncate ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                        {p.spec}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-stone-100 mt-6 flex items-center justify-between">
            <span className="text-xs text-stone-400 font-mono">
              {Object.values(selectedPpe).filter(Boolean).length} items equipped
            </span>
            <button
              onClick={handleVerifyPpe}
              className="px-8 py-3 rounded-xl bg-stone-900 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-xl transition-all flex items-center gap-2"
            >
              Verify Fitment & Complete PPE Induction
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
