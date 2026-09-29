import React from 'react';
import { useApp } from '../context/AppContext';
import { mockTrainees } from '../data/mockData';
import { ShieldAlert, User, ShieldCheck, Building2, PlayCircle, ArrowRight, Sparkles } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { setRole, setActiveWorker, navigateTo, setPresentationMode } = useApp();

  const handleSelectRole = (roleType: 'worker' | 'trainer' | 'admin', workerIndex = 0) => {
    setRole(roleType);
    if (mockTrainees[workerIndex]) {
      setActiveWorker(mockTrainees[workerIndex]);
    }
    if (roleType === 'admin') {
      navigateTo('/admin');
    } else {
      navigateTo('/dashboard');
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-12 px-4 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-stone-900 text-emerald-400 mx-auto flex items-center justify-center font-bold text-3xl shadow-xl">
          <ShieldAlert className="w-9 h-9 stroke-[2.5]" />
        </div>
        <h1 className="text-3xl font-black text-stone-900 tracking-tight">SafeX Demo Authentication</h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">Select a persona below to enter the live prototype instantly without registration.</p>
      </div>

      {/* Role Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Worker Card */}
        <div 
          onClick={() => handleSelectRole('worker', 0)}
          className="p-6 bg-white rounded-3xl border-2 border-stone-200 hover:border-emerald-500 shadow-xl cursor-pointer transition-all space-y-4 hover:-translate-y-1 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">ROLE A</span>
            <h3 className="text-lg font-black text-stone-900 mt-1 group-hover:text-emerald-700 transition-colors">Trainee / Worker</h3>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">Experience simulations, scan surroundings, perform safety actions, earn certificates.</p>
          </div>
          <div className="pt-2 border-t border-stone-100 text-xs font-bold text-stone-900 flex items-center gap-2">
            <img src={mockTrainees[0].avatar} className="w-6 h-6 rounded-full object-cover" />
            <span>Aarav Kumar (91% Score)</span>
          </div>
        </div>

        {/* Safety Officer Card */}
        <div 
          onClick={() => handleSelectRole('trainer', 1)}
          className="p-6 bg-white rounded-3xl border-2 border-stone-200 hover:border-amber-500 shadow-xl cursor-pointer transition-all space-y-4 hover:-translate-y-1 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">ROLE B</span>
            <h3 className="text-lg font-black text-stone-900 mt-1 group-hover:text-amber-700 transition-colors">Safety Officer / Trainer</h3>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">Review trainee mistakes, assign adaptive retraining, monitor compliance.</p>
          </div>
          <div className="pt-2 border-t border-stone-100 text-xs font-bold text-stone-900 flex items-center gap-2">
            <img src={mockTrainees[1].avatar} className="w-6 h-6 rounded-full object-cover" />
            <span>Priya Sharma (Inspector)</span>
          </div>
        </div>

        {/* Enterprise Admin Card */}
        <div 
          onClick={() => handleSelectRole('admin', 0)}
          className="p-6 bg-white rounded-3xl border-2 border-stone-200 hover:border-stone-900 shadow-xl cursor-pointer transition-all space-y-4 hover:-translate-y-1 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-stone-900 text-white flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold bg-stone-200 text-stone-900 px-2 py-0.5 rounded">ROLE C</span>
            <h3 className="text-lg font-black text-stone-900 mt-1 group-hover:text-stone-700 transition-colors">Enterprise Admin</h3>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">Workforce overview, competency analytics matrix, regulatory compliance reports.</p>
          </div>
          <div className="pt-2 border-t border-stone-100 text-xs font-bold text-stone-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-stone-800 text-emerald-400 font-mono text-[10px] flex items-center justify-center font-bold">HQ</span>
            <span>Vikramaditya Mehta</span>
          </div>
        </div>

      </div>

      {/* Instant Presentation Demo Trigger */}
      <div className="bg-amber-500/10 border border-amber-500/40 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-900 shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-900 uppercase">
            <Sparkles className="w-4 h-4 text-amber-600" /> Hackathon & Presentation Mode
          </div>
          <p className="text-xs text-stone-700">Launch guided 12-step automated demonstration sequence designed for judges.</p>
        </div>
        <button
          onClick={() => {
            setPresentationMode(true);
            navigateTo('/');
          }}
          className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <PlayCircle className="w-4 h-4 fill-stone-950 text-amber-500" />
          Launch Guided Presentation Tour
        </button>
      </div>

    </div>
  );
};
