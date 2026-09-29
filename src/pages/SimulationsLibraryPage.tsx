import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockScenarios } from '../data/mockData';
import { Search, Filter, ArrowRight, PlayCircle, ShieldCheck, Clock, Flame } from 'lucide-react';

export const SimulationsLibraryPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const filtered = mockScenarios.filter(s => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
    const matchDiff = difficultyFilter === 'All' || s.difficulty === difficultyFilter;
    return matchSearch && matchDiff;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest">
            SIMULATION SCENARIOS
          </span>
          <h1 className="text-3xl font-black text-stone-900">Safety Simulations Library</h1>
          <p className="text-xs sm:text-sm text-stone-600">Select an interactive simulation scenario to evaluate practical competency under stress.</p>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search scenarios..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-xs bg-white border border-stone-300 rounded-xl pl-8 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-48 sm:w-64"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-2.5 top-3 pointer-events-none" />
          </div>

          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="text-xs bg-white border border-stone-300 rounded-xl px-3 py-2.5 font-medium focus:outline-none cursor-pointer"
          >
            <option value="All">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Grid of 6 Simulation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((sim) => (
          <div 
            key={sim.id}
            className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xl space-y-4 hover:border-emerald-500 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex justify-between items-start">
                <span className="text-4xl p-2 bg-stone-50 rounded-2xl border border-stone-100">{sim.thumbnail}</span>
                <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold ${
                  sim.difficulty === 'Advanced' ? 'bg-rose-100 text-rose-900 border border-rose-200' :
                  sim.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-900 border border-amber-200' :
                  'bg-emerald-100 text-emerald-900 border border-emerald-200'
                }`}>
                  {sim.difficulty}
                </span>
              </div>

              <h3 className="font-extrabold text-lg text-stone-900 mt-4 group-hover:text-emerald-700 transition-colors">{sim.title}</h3>
              <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">{sim.description}</p>
            </div>

            <div className="pt-4 border-t border-stone-100 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-stone-600">
                <div className="flex items-center gap-1 bg-stone-50 p-2 rounded-lg border border-stone-100">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>{sim.duration}</span>
                </div>
                <div className="flex items-center gap-1 bg-stone-50 p-2 rounded-lg border border-stone-100">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{sim.competencyCount} Competencies</span>
                </div>
              </div>

              <button
                onClick={() => navigateTo(`/simulations/${sim.id}`)}
                className="w-full py-3 rounded-xl bg-stone-900 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                Launch Simulation
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
