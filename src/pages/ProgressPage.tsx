import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, CheckCircle2, AlertTriangle, ArrowRight, BookOpen, Flame, BarChart2, ShieldCheck, Clock } from 'lucide-react';

export const ProgressPage: React.FC = () => {
  const { activeWorker, navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      
      {/* Header */}
      <div>
        <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest">
          MY COMPETENCY JOURNEY
        </span>
        <h1 className="text-3xl font-black text-stone-900">Personal Practical Progress</h1>
        <p className="text-xs sm:text-sm text-stone-600">Track competency metrics, identified safety gaps, and active certs.</p>
      </div>

      {/* Top 5 Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        
        <div className="p-5 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-1">
          <span className="text-stone-400 text-[10px] font-mono block uppercase">OVERALL COMPETENCY</span>
          <span className="text-3xl font-black text-emerald-700 font-mono">{activeWorker.overallCompetency}%</span>
          <span className="text-[10px] text-emerald-600 block">Top 10% in Plant</span>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-1">
          <span className="text-stone-400 text-[10px] font-mono block uppercase">TRAINING COMPLETED</span>
          <span className="text-3xl font-black text-stone-900 font-mono">8 / 12</span>
          <span className="text-[10px] text-stone-500 block">66% Complete</span>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-1">
          <span className="text-stone-400 text-[10px] font-mono block uppercase">CERTIFIED MODULES</span>
          <span className="text-3xl font-black text-stone-900 font-mono">{activeWorker.certificatesEarned}</span>
          <span className="text-[10px] text-emerald-600 block">All Valid</span>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-1">
          <span className="text-stone-400 text-[10px] font-mono block uppercase">AVG RESPONSE TIME</span>
          <span className="text-3xl font-black text-stone-900 font-mono">4.2s</span>
          <span className="text-[10px] text-stone-500 block">Fast Decision</span>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-1 col-span-2 sm:col-span-1">
          <span className="text-stone-400 text-[10px] font-mono block uppercase">SAFETY STREAK</span>
          <span className="text-3xl font-black text-amber-600 font-mono">{activeWorker.safetyStreakDays} Days</span>
          <span className="text-[10px] text-amber-700 block">Zero Critical Errors</span>
        </div>

      </div>

      {/* 2-Column Strengths vs Needs Practice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Your Strengths */}
        <div className="bg-emerald-50/60 rounded-3xl border border-emerald-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-950 font-extrabold text-base">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Your Safety Strengths
          </div>
          <div className="space-y-3">
            <div className="p-3.5 bg-white rounded-2xl border border-emerald-100 flex justify-between items-center text-xs">
              <span className="font-bold text-stone-900">Hazard Recognition</span>
              <span className="font-black text-emerald-700 font-mono">94% Competent</span>
            </div>
            <div className="p-3.5 bg-white rounded-2xl border border-emerald-100 flex justify-between items-center text-xs">
              <span className="font-bold text-stone-900">PPE Matrix Selection</span>
              <span className="font-black text-emerald-700 font-mono">100% Perfect</span>
            </div>
          </div>
        </div>

        {/* Needs Practice */}
        <div className="bg-amber-50/60 rounded-3xl border border-amber-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-amber-950 font-extrabold text-base">
            <AlertTriangle className="w-5 h-5 text-amber-600" /> Competency Gaps (Needs Practice)
          </div>
          <div className="space-y-3">
            <div className="p-3.5 bg-white rounded-2xl border border-amber-100 flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-stone-900 block">Emergency Evacuation Sequencing</span>
                <span className="text-[10px] text-stone-500">Alarm activation timing delay</span>
              </div>
              <span className="font-black text-amber-700 font-mono">72%</span>
            </div>
            <div className="p-3.5 bg-white rounded-2xl border border-amber-100 flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-stone-900 block">Confined Space Lockout</span>
                <span className="text-[10px] text-stone-500">SCBA seal test step missed</span>
              </div>
              <span className="font-black text-amber-700 font-mono">68%</span>
            </div>
          </div>

          <button
            onClick={() => navigateTo('/retraining')}
            className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            Launch Adaptive Retraining Module
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
