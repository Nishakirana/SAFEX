import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, CheckCircle2, AlertOctagon, ArrowRight, RotateCcw, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';

export const SimulationScoreCard: React.FC = () => {
  const { simulationResult, navigateTo } = useApp();

  if (!simulationResult) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 bg-white rounded-3xl border border-stone-200 text-center space-y-4">
        <h3 className="text-xl font-bold text-stone-900">No Active Simulation Evaluation</h3>
        <p className="text-xs text-stone-500">Please launch a simulation from the library to evaluate practical competency.</p>
        <button
          onClick={() => navigateTo('/simulations')}
          className="px-6 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold"
        >
          Go to Simulation Library
        </button>
      </div>
    );
  }

  const { scores, passed, criticalErrors, scenarioTitle, completionTime, retrainingRecommended, earnedCertificateId } = simulationResult;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Pass/Fail Status Banner */}
      <div className={`p-6 rounded-3xl border text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 ${
        passed 
          ? 'bg-gradient-to-br from-emerald-900 via-stone-900 to-stone-900 border-emerald-500/50' 
          : 'bg-gradient-to-br from-rose-950 via-stone-900 to-stone-900 border-rose-500/50'
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border ${
            passed ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400' : 'bg-rose-500/20 border-rose-400 text-rose-400'
          }`}>
            {passed ? <Award className="w-9 h-9" /> : <AlertOctagon className="w-9 h-9" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded border ${
                passed ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-rose-950 text-rose-300 border-rose-800'
              }`}>
                {passed ? 'PRACTICAL COMPETENCY VERIFIED' : 'CRITICAL COMPETENCY GAP DETECTED'}
              </span>
              <span className="text-xs text-stone-400 font-mono">TIME: {completionTime}</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1">{scenarioTitle}</h2>
            <p className="text-xs text-stone-300 mt-0.5">
              {passed 
                ? 'Demonstrated strong practical safety compliance & procedural discipline.' 
                : 'Performance indicates procedural gaps requiring adaptive retraining.'}
            </p>
          </div>
        </div>

        <div className="text-center sm:text-right shrink-0">
          <p className="text-xs text-stone-400 font-mono">OVERALL COMPETENCY</p>
          <p className={`text-4xl font-black ${passed ? 'text-emerald-400' : 'text-rose-400'}`}>
            {scores.overallScore}%
          </p>
        </div>
      </div>

      {/* 5-Category Competency Breakdown Grid */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xl space-y-4">
        <h3 className="font-extrabold text-stone-900 text-base">Competency Breakdown Metrics</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-[10px] text-stone-500 font-medium block uppercase">Hazard Recognition</span>
            <span className="text-xl font-black text-stone-900 font-mono">{scores.hazardRecognition}%</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-[10px] text-stone-500 font-medium block uppercase">Procedure Accuracy</span>
            <span className="text-xl font-black text-stone-900 font-mono">{scores.procedureAccuracy}%</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-[10px] text-stone-500 font-medium block uppercase">Response Time</span>
            <span className="text-xl font-black text-stone-900 font-mono">{scores.responseTimeScore}%</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-[10px] text-stone-500 font-medium block uppercase">PPE Compliance</span>
            <span className="text-xl font-black text-stone-900 font-mono">{scores.ppeCompliance}%</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-[10px] text-stone-500 font-medium block uppercase">Safety Discipline</span>
            <span className="text-xl font-black text-stone-900 font-mono">{scores.safetyDiscipline}%</span>
          </div>
        </div>
      </div>

      {/* Critical Safety Errors Callout Section */}
      {criticalErrors.length > 0 && (
        <div className="p-5 rounded-3xl bg-rose-50 border border-rose-200 text-rose-950 space-y-3 shadow-md">
          <div className="flex items-center gap-2 text-rose-900 font-extrabold text-sm">
            <AlertOctagon className="w-5 h-5 text-rose-600" />
            Critical Safety Mistakes Identified ({criticalErrors.length})
          </div>
          <div className="space-y-2 text-xs">
            {criticalErrors.map((err, idx) => (
              <div key={idx} className="p-3 bg-white rounded-xl border border-rose-200 font-medium leading-relaxed text-rose-900">
                • {err}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Adaptive Retraining Card */}
      <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-stone-900 space-y-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
            <Sparkles className="w-5 h-5 text-amber-600" />
            Adaptive Retraining Recommended
          </div>
          <span className="text-xs bg-amber-200 text-amber-900 font-mono font-bold px-2.5 py-1 rounded-full">
            {retrainingRecommended.duration} Drill
          </span>
        </div>

        <h4 className="font-extrabold text-base text-stone-900">{retrainingRecommended.title}</h4>
        <p className="text-xs text-stone-600">Personalized micro-learning drill generated based on your simulation choice patterns:</p>

        <div className="flex flex-wrap gap-2">
          {retrainingRecommended.focusAreas.map((f, i) => (
            <span key={i} className="text-xs bg-white text-stone-800 font-medium px-3 py-1 rounded-lg border border-amber-200">
              • {f}
            </span>
          ))}
        </div>

        <button
          onClick={() => navigateTo('/retraining')}
          className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
        >
          <BookOpen className="w-4 h-4" /> Start Targeted Retraining Drill
        </button>
      </div>

      {/* Earned Certificate CTA Banner */}
      {passed && (
        <div className="p-6 rounded-3xl bg-emerald-900 text-white space-y-3 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
            <div>
              <h4 className="font-extrabold text-base">Verified Certificate Ready!</h4>
              <p className="text-xs text-emerald-200">Certificate ID: {earnedCertificateId || 'SFX-2026-98421'}</p>
            </div>
          </div>
          <button
            onClick={() => navigateTo(`/verify/${earnedCertificateId || 'SFX-2026-98421'}`)}
            className="px-6 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-extrabold text-xs shadow-lg flex items-center gap-2 transition-all shrink-0"
          >
            View & Verify Certificate
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      )}

      {/* Bottom Nav Actions */}
      <div className="flex justify-between items-center pt-4">
        <button
          onClick={() => navigateTo('/simulations')}
          className="px-6 py-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs flex items-center gap-2"
        >
          Back to Simulations Library
        </button>

        <button
          onClick={() => navigateTo('/progress')}
          className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-xl flex items-center gap-2"
        >
          View Overall Progress Dashboard
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
