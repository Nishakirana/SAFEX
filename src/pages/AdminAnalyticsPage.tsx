import React from 'react';
import { AnalyticsCharts } from '../components/admin/AnalyticsCharts';
import { mockAnalyticsData } from '../data/mockData';
import { Flame, Clock, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

export const AdminAnalyticsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      <div>
        <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest">
          SIMULATION ANALYTICS
        </span>
        <h1 className="text-3xl font-black text-stone-900">Scenario Performance Analytics</h1>
        <p className="text-xs sm:text-sm text-stone-600">Deep-dive into common procedural failure points across all training modules.</p>
      </div>

      {/* Scenario Performance Spotlight Card */}
      <div className="bg-stone-900 text-white p-6 sm:p-8 rounded-3xl border border-stone-800 shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-600/30 border border-rose-500 text-rose-400 flex items-center justify-center font-bold">
            <Flame className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-rose-400 bg-rose-950 px-2 py-0.5 rounded font-bold">
              SPOTLIGHT SCENARIO
            </span>
            <h2 className="text-xl font-black text-white mt-1">Fire & Explosion Response Analytics</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono text-xs">
          <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800">
            <span className="text-stone-400 block text-[10px]">AVG COMPETENCY SCORE</span>
            <span className="text-2xl font-black text-emerald-400">84%</span>
          </div>
          <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800">
            <span className="text-stone-400 block text-[10px]">SIMULATION PASS RATE</span>
            <span className="text-2xl font-black text-white">88%</span>
          </div>
          <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800">
            <span className="text-stone-400 block text-[10px]">AVG RESPONSE TIME</span>
            <span className="text-2xl font-black text-stone-300">04:12</span>
          </div>
          <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800">
            <span className="text-stone-400 block text-[10px]">RETRAINING ASSIGNED</span>
            <span className="text-2xl font-black text-amber-400">12%</span>
          </div>
        </div>

        {/* Common Errors Breakdown */}
        <div className="space-y-3 pt-2 border-t border-stone-800">
          <h4 className="font-extrabold text-sm text-stone-200">Fire & Explosion Top Mistakes</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 bg-stone-950 rounded-xl border border-rose-900/60 text-rose-200 space-y-1">
              <span className="text-lg font-black text-rose-400 font-mono">34%</span>
              <p className="font-bold text-white">Incorrect Evacuation Sequence</p>
              <p className="text-[10px] text-stone-400">Running downwind in smoke column</p>
            </div>
            <div className="p-3.5 bg-stone-950 rounded-xl border border-amber-900/60 text-amber-200 space-y-1">
              <span className="text-lg font-black text-amber-400 font-mono">21%</span>
              <p className="font-bold text-white">Wrong Extinguisher Selection</p>
              <p className="text-[10px] text-stone-400">Selecting water reel on electrical gear</p>
            </div>
            <div className="p-3.5 bg-stone-950 rounded-xl border border-amber-900/60 text-amber-200 space-y-1">
              <span className="text-lg font-black text-amber-400 font-mono">18%</span>
              <p className="font-bold text-white">Delayed Alarm Activation</p>
              <p className="text-[10px] text-stone-400">Attempting intervention before alarm</p>
            </div>
          </div>
        </div>

      </div>

      <AnalyticsCharts />
    </div>
  );
};
