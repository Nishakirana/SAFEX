import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AnalyticsCharts } from '../components/admin/AnalyticsCharts';
import { CompetencyMatrix } from '../components/admin/CompetencyMatrix';
import { WorkerDetailModal } from '../components/admin/WorkerDetailModal';
import { WorkerProfile } from '../types';
import { Users, Award, AlertOctagon, CheckCircle2, TrendingUp, BarChart2, ShieldAlert } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { navigateTo } = useApp();
  const [selectedWorker, setSelectedWorker] = useState<WorkerProfile | null>(null);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest">
            ENTERPRISE SAFETY OVERVIEW
          </span>
          <h1 className="text-3xl font-black text-stone-900">Safety Command Center</h1>
          <p className="text-xs sm:text-sm text-stone-600">Workforce practical competency oversight across all plants and refineries.</p>
        </div>

        <button
          onClick={() => navigateTo('/admin/reports')}
          className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
        >
          Export Compliance Reports
        </button>
      </div>

      {/* 5 Enterprise Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="p-5 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-1">
          <span className="text-stone-400 text-[10px] font-mono block uppercase">ACTIVE TRAINEES</span>
          <span className="text-3xl font-black text-stone-900 font-mono">1,248</span>
          <span className="text-[10px] text-emerald-600 block">across 4 sites</span>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-1">
          <span className="text-stone-400 text-[10px] font-mono block uppercase">TRAINING COMPLETION</span>
          <span className="text-3xl font-black text-stone-900 font-mono">86.4%</span>
          <span className="text-[10px] text-emerald-600 block">+4.2% this month</span>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-1">
          <span className="text-stone-400 text-[10px] font-mono block uppercase">AVG COMPETENCY</span>
          <span className="text-3xl font-black text-emerald-700 font-mono">82.7%</span>
          <span className="text-[10px] text-emerald-600 block">High Standard</span>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-1">
          <span className="text-stone-400 text-[10px] font-mono block uppercase">CERTIFICATIONS</span>
          <span className="text-3xl font-black text-stone-900 font-mono">1,034</span>
          <span className="text-[10px] text-stone-500 block">12 expiring soon</span>
        </div>

        <div className="p-5 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-1 col-span-2 sm:col-span-1">
          <span className="text-stone-400 text-[10px] font-mono block uppercase">CRITICAL GAPS</span>
          <span className="text-3xl font-black text-rose-600 font-mono">74</span>
          <span className="text-[10px] text-rose-600 block">Retraining assigned</span>
        </div>
      </div>

      {/* Analytics Charts */}
      <AnalyticsCharts />

      {/* Workforce Competency Matrix Grid */}
      <CompetencyMatrix onSelectWorker={(w) => setSelectedWorker(w)} />

      {/* Worker Detail Modal */}
      {selectedWorker && (
        <WorkerDetailModal worker={selectedWorker} onClose={() => setSelectedWorker(null)} />
      )}

    </div>
  );
};
