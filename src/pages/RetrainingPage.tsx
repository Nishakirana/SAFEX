import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Sparkles, ArrowRight, CheckCircle2, Flame, ShieldAlert } from 'lucide-react';

export const RetrainingPage: React.FC = () => {
  const { navigateTo } = useApp();

  const retrainingModules = [
    {
      id: 'retrain_1',
      title: 'Emergency Evacuation & Alarm Sequencing Level 2',
      duration: '04:00',
      reason: 'Generated because alarm pull was delayed during Methane Fire simulation.',
      focusPoints: ['Manual Station Alarm Pull Protocol', 'CO2 Extinguisher Selection', 'Upwind Route Navigation'],
      status: 'Recommended'
    },
    {
      id: 'retrain_2',
      title: 'Confined Space SCBA Face Seal Verification',
      duration: '03:15',
      reason: 'Generated due to missing SCBA positive pressure test step.',
      focusPoints: ['200 Bar Pressure Gauge Reading', 'Straps Tension Adjustment'],
      status: 'Assigned'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      <div>
        <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest flex items-center gap-1">
          <Sparkles className="w-4 h-4 text-amber-600" /> SAFEX ADAPTIVE ENGINE
        </span>
        <h1 className="text-3xl font-black text-stone-900">Targeted Adaptive Retraining</h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Personalized micro-learning drills generated automatically to resolve your specific decision gaps.
        </p>
      </div>

      <div className="space-y-4">
        {retrainingModules.map((m) => (
          <div key={m.id} className="p-6 bg-white rounded-3xl border-2 border-amber-200 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded uppercase">
                  {m.status} DRILL
                </span>
                <h3 className="text-lg font-black text-stone-900 mt-1">{m.title}</h3>
              </div>
              <span className="text-xs font-mono text-stone-500 font-bold bg-stone-100 px-3 py-1 rounded-full w-max">
                Duration: {m.duration}
              </span>
            </div>

            <p className="text-xs text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200 font-medium">
              ⚠ Gap Rationale: {m.reason}
            </p>

            <div className="space-y-1 text-xs text-stone-700">
              <span className="font-bold text-stone-900 block">Drill Focus Objectives:</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {m.focusPoints.map((f, i) => (
                  <span key={i} className="bg-stone-100 text-stone-800 px-3 py-1 rounded-lg border border-stone-200 text-[11px] font-medium">
                    ✓ {f}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigateTo('/simulations/fire')}
              className="w-full py-3 rounded-xl bg-stone-900 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" /> Start Targeted Retraining Drill Now
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
