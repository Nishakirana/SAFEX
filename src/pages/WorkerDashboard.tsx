import React from 'react';
import { useApp } from '../context/AppContext';
import { mockScenarios, mockCertificates } from '../data/mockData';
import { 
  ShieldAlert, 
  PlayCircle, 
  ArrowRight, 
  Scan, 
  Award, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Wifi,
  WifiOff,
  Flame,
  Zap,
  Sparkles
} from 'lucide-react';

export const WorkerDashboard: React.FC = () => {
  const { activeWorker, isOffline, navigateTo } = useApp();

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      
      {/* Welcome & Safety Readiness Ring Header */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 font-mono">Good morning,</span>
            <span className="px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono font-bold">
              PLANT TECH #409
            </span>
          </div>
          <h1 className="text-3xl font-black text-white">{activeWorker.name}</h1>
          <p className="text-xs text-stone-300 font-medium">{activeWorker.role} — <span className="text-emerald-400">{activeWorker.department}</span></p>

          <div className="flex items-center gap-3 pt-2 text-xs text-stone-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" /> {activeWorker.modulesCompleted} Modules Mastered
            </span>
            <span className="flex items-center gap-1 text-amber-400 font-mono">
              🔥 {activeWorker.safetyStreakDays} Day Streak
            </span>
            {isOffline && (
              <span className="flex items-center gap-1 text-amber-400 font-mono bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                <WifiOff className="w-3.5 h-3.5" /> OFFLINE MODE
              </span>
            )}
          </div>
        </div>

        {/* Safety Readiness Score Ring */}
        <div className="flex items-center gap-6 bg-stone-950 p-4 sm:p-5 rounded-2xl border border-stone-800 shrink-0">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="48" cy="48" r="40" stroke="#292524" strokeWidth="8" fill="transparent" />
              <circle 
                cx="48" 
                cy="48" 
                r="40" 
                stroke="#10B981" 
                strokeWidth="8" 
                fill="transparent" 
                strokeDasharray="251" 
                strokeDashoffset={251 - (251 * activeWorker.overallCompetency) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
              <span className="text-2xl font-black text-white">{activeWorker.overallCompetency}%</span>
              <span className="text-[9px] text-stone-400 uppercase">READINESS</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-stone-400 font-mono block">RECOMMENDED ACTION</span>
            <button
              onClick={() => navigateTo('/simulations/fire')}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold text-xs shadow-lg flex items-center gap-2 transition-all"
            >
              Continue Training
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

      </div>

      {/* Recommended Next Module Card */}
      <div className="bg-amber-500/10 border border-amber-500/30 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-900 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0 font-bold">
            <Sparkles className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-amber-900 uppercase tracking-wider">
              TARGETED RETRAINING ASSIGNED
            </span>
            <h3 className="text-base font-extrabold text-stone-900">Emergency Evacuation Response — Level 2</h3>
            <p className="text-xs text-stone-600 mt-0.5">Recommended to resolve 1 recorded evacuation sequencing error.</p>
          </div>
        </div>

        <button
          onClick={() => navigateTo('/retraining')}
          className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          Start 4-Min Drill
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2-Column Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Simulations Library & Recent (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-stone-900">Practical Safety Simulations</h2>
            <button
              onClick={() => navigateTo('/simulations')}
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
            >
              View All 6 <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mockScenarios.slice(0, 4).map((sim) => (
              <div 
                key={sim.id}
                onClick={() => navigateTo(`/simulations/${sim.id}`)}
                className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm hover:shadow-md hover:border-emerald-500 cursor-pointer transition-all space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-2xl">{sim.thumbnail}</span>
                    <span className="text-[10px] font-mono font-bold bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                      {sim.difficulty}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm text-stone-900 mt-2">{sim.title}</h3>
                  <p className="text-xs text-stone-500 mt-0.5 leading-snug line-clamp-2">{sim.description}</p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-mono">
                  <span className="text-stone-500">{sim.duration}</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    Start Sim <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Quick Certs & Scanner Card (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Environment Scanner Widget Card */}
          <div className="bg-stone-900 text-white rounded-3xl p-6 border border-stone-800 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Scan className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white">AR Surroundings Scan</h3>
                <p className="text-[11px] text-stone-400 font-mono">3D Spatial Hazard Detector</p>
              </div>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Scan your active workplace bay to identify missing guards, unchained cylinders, and electrical hazards.
            </p>
            <button
              onClick={() => navigateTo('/scan')}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              Launch AR Camera Scanner
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

          {/* Active Certificates Quick View */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-sm text-stone-900">Earned Certificates</h3>
              <span className="text-xs text-emerald-700 font-bold font-mono">5 Total</span>
            </div>

            <div className="space-y-3">
              {mockCertificates.slice(0, 2).map((c) => (
                <div 
                  key={c.id}
                  onClick={() => navigateTo(`/verify/${c.id}`)}
                  className="p-3 rounded-xl bg-stone-50 border border-stone-200 hover:border-emerald-500 cursor-pointer transition-all text-xs space-y-1"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-stone-900 truncate">{c.moduleTitle}</span>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold">{c.score}%</span>
                  </div>
                  <p className="text-[10px] text-stone-500 font-mono">ID: {c.id}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigateTo('/certificates')}
              className="w-full py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all text-center"
            >
              View All Credentials
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
