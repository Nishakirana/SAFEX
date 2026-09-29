import React from 'react';
import { useApp } from '../context/AppContext';
import { mockScenarios } from '../data/mockData';
import { 
  ShieldAlert, 
  PlayCircle, 
  ArrowRight, 
  Scan, 
  Flame, 
  Radio, 
  Wrench, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  Sparkles, 
  ChevronRight,
  Zap,
  BarChart2,
  Users
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t, navigateTo, setPresentationMode } = useApp();

  const methodologySteps = [
    { num: '01', title: 'SIMULATE', desc: 'Step into AR-driven industrial hazard environments without physical danger.' },
    { num: '02', title: 'PERFORM', desc: 'Execute real tactical choices under stress: alarms, fuel cutoff, PASS method.' },
    { num: '03', title: 'ANALYZE', desc: 'Measure practical competency, response duration, and critical safety mistakes.' },
    { num: '04', title: 'RETRAIN', desc: 'Receive targeted adaptive micro-drills addressing your exact decision gaps.' },
    { num: '05', title: 'CERTIFY', desc: 'Earn verifiable digital safety credentials backed by cryptographic audit logs.' },
  ];

  const journeySteps = [
    { step: '01', title: 'SCAN', desc: 'Point mobile camera at workplace bay to detect 3D spatial hazards.' },
    { step: '02', title: 'SIMULATE', desc: 'AR overlays active thermal, gas, or electrical risk scenarios.' },
    { step: '03', title: 'RESPOND', desc: 'Make split-second procedural decisions on real industrial controls.' },
    { step: '04', title: 'ANALYZE', desc: 'Receive immediate score breakdown across 5 competency vectors.' },
    { step: '05', title: 'RETRAIN', desc: 'Practice targeted drills until zero critical mistakes remain.' },
    { step: '06', title: 'CERTIFY', desc: 'Issue tamper-proof competency certificate for site clearance.' },
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-950 text-xs font-extrabold uppercase tracking-widest border border-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              {t('brandTagline')}
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-black text-stone-900 tracking-tight leading-[1.08]">
              {t('heroTitle1')}<br />
              <span className="text-emerald-700">{t('heroTitle2')}</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl font-normal leading-relaxed">
              {t('heroSubtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={() => navigateTo('/scan')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-stone-900 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-2xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5"
              >
                <Scan className="w-5 h-5 text-emerald-400" />
                Start Safety Scan
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                onClick={() => setPresentationMode(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <PlayCircle className="w-5 h-5 fill-stone-950 text-amber-500" />
                Launch Interactive Demo
              </button>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200/80 text-xs">
              <div>
                <span className="text-2xl font-black text-stone-900 font-mono">1,248+</span>
                <p className="text-stone-500 font-medium">Active Trainees</p>
              </div>
              <div>
                <span className="text-2xl font-black text-emerald-700 font-mono">98.4%</span>
                <p className="text-stone-500 font-medium">Compliance Rate</p>
              </div>
              <div>
                <span className="text-2xl font-black text-stone-900 font-mono">6 Scenarios</span>
                <p className="text-stone-500 font-medium">AR Simulations</p>
              </div>
            </div>

          </div>

          {/* Hero Right Visual Mockup (5 Cols) */}
          <div className="lg:col-span-5 relative">
            
            {/* Interactive Phone Frame Visual Container */}
            <div className="relative mx-auto w-full max-w-sm bg-stone-950 rounded-[40px] p-4 border-4 border-stone-800 shadow-2xl overflow-hidden text-white">
              
              {/* Phone Header Notch */}
              <div className="w-32 h-4 bg-stone-900 mx-auto rounded-b-xl mb-3 flex items-center justify-center">
                <span className="w-8 h-1 rounded-full bg-stone-700"></span>
              </div>

              {/* Viewport Canvas Graphic */}
              <div className="relative h-96 rounded-3xl bg-stone-900 overflow-hidden border border-stone-800 flex flex-col justify-between p-4">
                
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-50 filter saturate-150"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80')` }}
                />

                <div className="absolute inset-0 ar-grid-overlay opacity-30" />

                {/* Top AR Header */}
                <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-emerald-400 bg-stone-950/80 p-2 rounded-xl backdrop-blur">
                  <span className="flex items-center gap-1 font-bold">
                    <Scan className="w-3.5 h-3.5" /> SAFEX AR CAMERA
                  </span>
                  <span className="bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded">60 FPS</span>
                </div>

                {/* AR Beacon Markers Overlay */}
                <div className="relative z-10 space-y-2">
                  <div className="bg-stone-900/90 backdrop-blur border border-amber-500/80 p-2.5 rounded-xl shadow-lg animate-float">
                    <div className="flex justify-between items-center text-[10px] text-amber-400 font-mono font-bold">
                      <span>⚠ CRITICAL HAZARD</span>
                      <span>98%</span>
                    </div>
                    <p className="text-xs font-bold text-white">Pressurized Methane Leak</p>
                    <p className="text-[10px] text-stone-300">Remote shutoff valve trip required</p>
                  </div>

                  <div className="bg-stone-900/90 backdrop-blur border border-emerald-500/80 p-2 rounded-xl text-[10px] text-emerald-400 font-mono flex items-center justify-between">
                    <span>✓ Emergency Exit Upwind</span>
                    <span>14m</span>
                  </div>
                </div>

                {/* Bottom Trigger Button */}
                <button
                  onClick={() => navigateTo('/simulations/fire')}
                  className="relative z-10 w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold text-xs shadow-lg flex items-center justify-center gap-1.5 transition-all"
                >
                  <Flame className="w-4 h-4 fill-stone-950" /> Start Fire Simulation
                </button>

              </div>

              <p className="text-[10px] text-center text-stone-500 font-mono mt-3">Simulated AR Viewport Interface</p>
            </div>

          </div>

        </div>

      </section>

      {/* Methodology Strip Section */}
      <section className="bg-stone-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-y border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">
              THE SAFEX METHODOLOGY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              From Passive Watching to Practical Competency
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {methodologySteps.map((m) => (
              <div key={m.num} className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-2 hover:border-emerald-500 transition-all">
                <span className="text-xs font-mono text-emerald-400 font-black">{m.num}</span>
                <h3 className="font-extrabold text-base text-white">{m.title}</h3>
                <p className="text-xs text-stone-400 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Comparison Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              THE INDUSTRIAL SAFETY GAP
            </span>
            <h2 className="text-3xl font-black text-stone-900">
              Why Traditional Safety Training Fails Under Pressure
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Standard LMS platforms measure what someone remembers on a quiz. SafeX measures how someone responds when real hazards emerge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            
            {/* Traditional LMS */}
            <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-4">
              <div className="flex items-center gap-2 text-rose-900 font-extrabold text-base">
                <AlertTriangle className="w-5 h-5 text-rose-600" /> Traditional LMS Training
              </div>
              <ul className="space-y-2.5 text-xs text-rose-950 font-medium">
                <li className="flex items-center gap-2">• 40-minute passive video lectures</li>
                <li className="flex items-center gap-2">• Multiple-choice recall quizzes</li>
                <li className="flex items-center gap-2">• Zero practical spatial hazard evaluation</li>
                <li className="flex items-center gap-2">• Certificate issued without stress testing</li>
              </ul>
            </div>

            {/* SafeX Immersive */}
            <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-300 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-950 font-extrabold text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> SafeX Practical Competency
              </div>
              <ul className="space-y-2.5 text-xs text-emerald-950 font-semibold">
                <li className="flex items-center gap-2">✓ Interactive AR hazard simulation</li>
                <li className="flex items-center gap-2">✓ Live decision choices under time pressure</li>
                <li className="flex items-center gap-2">✓ Real-time score calculation & critical mistake audit</li>
                <li className="flex items-center gap-2">✓ Targeted adaptive retraining for identified gaps</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* How SafeX Works 6-Step Journey */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">PRODUCT JOURNEY</span>
          <h2 className="text-3xl font-black text-stone-900">How SafeX Operates</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {journeySteps.map((j) => (
            <div key={j.step} className="p-5 rounded-2xl bg-white border border-stone-200 shadow-md space-y-2 hover:shadow-lg transition-all">
              <span className="text-2xl font-black font-mono text-emerald-700">{j.step}</span>
              <h3 className="font-extrabold text-sm text-stone-900">{j.title}</h3>
              <p className="text-xs text-stone-500 leading-relaxed">{j.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Simulation Library Teaser Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">SIMULATION SCENARIOS</span>
            <h2 className="text-3xl font-black text-stone-900">Ready Industrial Modules</h2>
          </div>
          <button
            onClick={() => navigateTo('/simulations')}
            className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
          >
            Explore All 6 Simulations
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockScenarios.slice(0, 3).map((sim) => (
            <div key={sim.id} className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xl space-y-4 hover:border-emerald-500 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-3xl">{sim.thumbnail}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-800 text-[10px] font-mono font-bold">
                    {sim.difficulty}
                  </span>
                </div>
                <h3 className="font-extrabold text-lg text-stone-900 mt-3">{sim.title}</h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">{sim.description}</p>
              </div>

              <div className="pt-4 border-t border-stone-100 space-y-3">
                <div className="flex justify-between text-xs font-mono text-stone-600">
                  <span>Duration: {sim.duration}</span>
                  <span>{sim.competencyCount} Competencies</span>
                </div>
                <button
                  onClick={() => navigateTo(`/simulations/${sim.id}`)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  Start Simulation
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Admin Dashboard CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-stone-900 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-stone-800">
          <div className="space-y-2">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">
              FOR SAFETY OFFICERS & ENTERPRISE ADMINS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Enterprise Workforce Analytics & Compliance Command
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
              Track 1,248+ active trainees across methane, drilling, and chemical divisions with live competency matrixes and automated re-certification alerts.
            </p>
          </div>
          <button
            onClick={() => navigateTo('/admin')}
            className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold text-sm shadow-xl flex items-center gap-2 transition-all shrink-0"
          >
            Open Admin Dashboard
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </section>

    </div>
  );
};
