import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Play, Scan, Award, BarChart2 } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activeRoute, navigateTo, role } = useApp();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-2 py-2 flex items-center justify-around shadow-lg">
      <button
        onClick={() => navigateTo('/')}
        className={`flex flex-col items-center gap-1 p-1 text-xs transition-all ${
          activeRoute === '/' ? 'text-emerald-700 font-bold' : 'text-stone-500'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </button>

      <button
        onClick={() => navigateTo('/simulations')}
        className={`flex flex-col items-center gap-1 p-1 text-xs transition-all ${
          activeRoute.startsWith('/simulations') ? 'text-emerald-700 font-bold' : 'text-stone-500'
        }`}
      >
        <Play className="w-5 h-5" />
        <span>Sims</span>
      </button>

      {/* Primary Floating AR Scan Button */}
      <button
        onClick={() => navigateTo('/scan')}
        className="flex flex-col items-center justify-center w-12 h-12 -mt-5 rounded-full bg-stone-900 text-emerald-400 shadow-xl ring-4 ring-white transition-all active:scale-95"
      >
        <Scan className="w-6 h-6 stroke-[2.5]" />
      </button>

      <button
        onClick={() => navigateTo('/progress')}
        className={`flex flex-col items-center gap-1 p-1 text-xs transition-all ${
          activeRoute === '/progress' ? 'text-emerald-700 font-bold' : 'text-stone-500'
        }`}
      >
        <BarChart2 className="w-5 h-5" />
        <span>Progress</span>
      </button>

      <button
        onClick={() => navigateTo(role === 'admin' ? '/admin' : '/certificates')}
        className={`flex flex-col items-center gap-1 p-1 text-xs transition-all ${
          activeRoute.startsWith('/admin') || activeRoute === '/certificates' ? 'text-emerald-700 font-bold' : 'text-stone-500'
        }`}
      >
        <Award className="w-5 h-5" />
        <span>{role === 'admin' ? 'Admin' : 'Certs'}</span>
      </button>
    </div>
  );
};
