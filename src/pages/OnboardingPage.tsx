import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, PlayCircle, ArrowRight, ChevronLeft, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [step, setStep] = useState(1);

  const onboardingSteps = [
    { title: 'Train without the risk.', desc: 'Experience dangerous industrial flash fires and chemical leaks safely in AR.', icon: '🔥' },
    { title: 'Experience real-world hazards.', desc: 'Inspect real plant machinery, high-voltage equipment, and gas valves.', icon: '☣️' },
    { title: 'Your decisions are measured.', desc: 'Every response choice calculates live competency, duration, and error impact.', icon: '⏱️' },
    { title: 'Retrain where you need it.', desc: 'Receive targeted adaptive micro-learning drills based on your exact mistakes.', icon: '🎯' },
    { title: 'Prove your competency.', desc: 'Earn verifiable digital certificates for site clearance & regulatory audits.', icon: '📜' },
  ];

  const current = onboardingSteps[step - 1];

  return (
    <div className="max-w-2xl mx-auto my-12 px-4">
      <div className="bg-white rounded-3xl border-2 border-stone-200 shadow-2xl p-8 text-center space-y-8 relative">
        
        <div className="flex justify-between items-center text-xs font-mono text-stone-400">
          <span>SAFEX ONBOARDING</span>
          <span>STEP {step} OF 5</span>
        </div>

        <div className="w-24 h-24 rounded-3xl bg-stone-900 text-emerald-400 text-5xl mx-auto flex items-center justify-center shadow-xl animate-float">
          {current.icon}
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-stone-900 tracking-tight">{current.title}</h2>
          <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">{current.desc}</p>
        </div>

        {/* Step Progress Dots */}
        <div className="flex justify-center items-center gap-2">
          {onboardingSteps.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i + 1 === step ? 'w-8 bg-emerald-600' : 'w-2 bg-stone-300'
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          <button
            onClick={() => step > 1 && setStep(step - 1)}
            disabled={step === 1}
            className="px-4 py-2 rounded-xl text-xs font-bold text-stone-500 hover:text-stone-900 disabled:opacity-30 flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => navigateTo('/dashboard')}
              className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xl transition-all flex items-center gap-2"
            >
              Enter SafeX Dashboard
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
