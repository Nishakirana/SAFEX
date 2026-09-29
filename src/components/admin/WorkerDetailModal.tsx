import React from 'react';
import { WorkerProfile } from '../../types';
import { X, Award, AlertOctagon, CheckCircle2, ShieldAlert, BookOpen, Clock, Calendar } from 'lucide-react';

export const WorkerDetailModal: React.FC<{ worker: WorkerProfile; onClose: () => void }> = ({ worker, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 border border-stone-200">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-4">
            <img src={worker.avatar} alt={worker.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500 shadow-md" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-stone-900">{worker.name}</h3>
                <span className="text-xs bg-emerald-100 text-emerald-900 font-mono font-bold px-2.5 py-0.5 rounded-full">
                  {worker.overallCompetency}% Competent
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">{worker.role} • <span className="font-semibold text-stone-700">{worker.department}</span></p>
              <p className="text-[11px] text-stone-400 font-mono">Location: {worker.siteLocation}</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-500 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
            <span className="text-stone-500 text-[10px] block uppercase font-medium">Modules Completed</span>
            <span className="text-lg font-black text-stone-900 font-mono">{worker.modulesCompleted} / {worker.totalModules}</span>
          </div>

          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
            <span className="text-stone-500 text-[10px] block uppercase font-medium">Certificates Earned</span>
            <span className="text-lg font-black text-emerald-700 font-mono">{worker.certificatesEarned}</span>
          </div>

          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
            <span className="text-stone-500 text-[10px] block uppercase font-medium">Critical Errors</span>
            <span className={`text-lg font-black font-mono ${worker.criticalErrorsRecorded > 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
              {worker.criticalErrorsRecorded}
            </span>
          </div>

          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
            <span className="text-stone-500 text-[10px] block uppercase font-medium">Safety Streak</span>
            <span className="text-lg font-black text-amber-600 font-mono">{worker.safetyStreakDays} Days</span>
          </div>
        </div>

        {/* Competencies Scores by Category */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-sm text-stone-900">Module Competency Ratings</h4>
          
          <div className="space-y-2 text-xs">
            {Object.entries(worker.scoresByCategory).map(([key, val]) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between font-medium text-stone-700 capitalize text-[11px]">
                  <span>{key.replace(/([AZ])/g, ' $1')}</span>
                  <span className="font-bold font-mono text-stone-900">{val}%</span>
                </div>
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all rounded-full ${val >= 85 ? 'bg-emerald-600' : val >= 70 ? 'bg-amber-500' : 'bg-rose-600'}`}
                    style={{ width: `${val}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Retraining Gaps */}
        {worker.retrainingNeeds.length > 0 && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-2">
            <p className="font-bold flex items-center gap-1.5 text-amber-900">
              <BookOpen className="w-4 h-4 text-amber-600" /> Active Retraining Assigned ({worker.retrainingNeeds.length})
            </p>
            <div className="flex flex-wrap gap-1.5">
              {worker.retrainingNeeds.map((need, idx) => (
                <span key={idx} className="bg-white text-stone-800 font-medium px-2.5 py-1 rounded-md border border-amber-200 text-[11px]">
                  • {need}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
