import React from 'react';
import { useApp } from '../../context/AppContext';
import { PlayCircle, ChevronRight, ChevronLeft, X, Sparkles, Award, ShieldAlert } from 'lucide-react';

const presentationSteps = [
  { step: 1, title: '1. Product Overview', subtitle: 'SafeX Landing & Core Methodology', route: '/' },
  { step: 2, title: '2. AR Environment Scan', subtitle: 'Camera Viewport & Hazard Detection', route: '/scan' },
  { step: 3, title: '3. Simulation Library', subtitle: 'Select Interactive Scenarios', route: '/simulations' },
  { step: 4, title: '4. Fire Simulation (Start)', subtitle: 'Step 1: Inspect Atmosphere & Fire Hazard', route: '/simulations/fire' },
  { step: 5, title: '5. Unsafe Decision Test', subtitle: 'Demonstrate Critical Safety Violation', route: '/simulations/fire' },
  { step: 6, title: '6. Correct Evacuation Sequence', subtitle: 'Execute Remote Valve & PASS Method', route: '/simulations/fire' },
  { step: 7, title: '7. Score Calculation', subtitle: 'Competency Breakdown (91%)', route: '/simulations/results' },
  { step: 8, title: '8. Adaptive Retraining', subtitle: 'Targeted Remedial Recommendations', route: '/retraining' },
  { step: 9, title: '9. Earned Certificate', subtitle: 'Digital Competency Credentials', route: '/certificates' },
  { step: 10, title: '10. QR Verification', subtitle: 'Public Blockchain Verification Page', route: '/verify/SFX-2026-98421' },
  { step: 11, title: '11. Admin Command Center', subtitle: 'Workforce Competency Matrix', route: '/admin' },
  { step: 12, title: '12. Enterprise Analytics', subtitle: 'Scenario Failure Rates & Reports', route: '/admin/analytics' },
];

export const PresentationBar: React.FC = () => {
  const { 
    presentationMode, 
    setPresentationMode, 
    presentationStep, 
    nextPresentationStep, 
    prevPresentationStep,
    setPresentationStep,
    navigateTo
  } = useApp();

  if (!presentationMode) return null;

  const currentStepObj = presentationSteps[presentationStep - 1] || presentationSteps[0];

  return (
    <div className="sticky top-16 z-50 bg-stone-900 text-white border-b-2 border-amber-500 shadow-xl px-4 py-2.5 animate-in slide-in-from-top duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        
        {/* Left Indicator */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-black text-sm shadow-inner shrink-0">
            {presentationStep}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 fill-amber-400 text-amber-950" />
                Judge Presentation Mode
              </span>
              <span className="text-[10px] bg-stone-800 text-stone-300 px-2 py-0.5 rounded-full font-mono">
                Step {presentationStep} of 12
              </span>
            </div>
            <p className="text-xs font-semibold text-stone-100">{currentStepObj.title}: <span className="font-normal text-stone-300">{currentStepObj.subtitle}</span></p>
          </div>
        </div>

        {/* Step Nav Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={prevPresentationStep}
            disabled={presentationStep === 1}
            className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-xs font-bold flex items-center gap-1 text-stone-200 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </button>

          {/* Step Selector Dropdown */}
          <select
            value={presentationStep}
            onChange={(e) => {
              const s = parseInt(e.target.value);
              setPresentationStep(s);
              const target = presentationSteps[s - 1];
              if (target) navigateTo(target.route);
            }}
            className="bg-stone-800 text-amber-300 text-xs font-bold rounded-lg px-2 py-1.5 border border-stone-700 focus:outline-none cursor-pointer"
          >
            {presentationSteps.map((s) => (
              <option key={s.step} value={s.step}>
                {s.step}. {s.title}
              </option>
            ))}
          </select>

          <button
            onClick={nextPresentationStep}
            disabled={presentationStep === 12}
            className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-extrabold flex items-center gap-1 shadow-md transition-all disabled:opacity-40"
          >
            Next
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>

          <button
            onClick={() => setPresentationMode(false)}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-rose-900/60 text-stone-400 hover:text-white transition-all ml-2"
            title="Exit Presentation Mode"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
