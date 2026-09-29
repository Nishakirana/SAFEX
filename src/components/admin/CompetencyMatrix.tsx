import React, { useState } from 'react';
import { mockTrainees } from '../../data/mockData';
import { WorkerProfile } from '../../types';
import { Search, Filter, ShieldAlert, CheckCircle2, AlertTriangle, XCircle, ChevronRight, User } from 'lucide-react';

export const CompetencyMatrix: React.FC<{ onSelectWorker: (w: WorkerProfile) => void }> = ({ onSelectWorker }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');

  const filteredTrainees = mockTrainees.filter(w => {
    const matchesSearch = w.name.toLowerCase().includes(searchTerm.toLowerCase()) || w.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = departmentFilter === 'All' || w.department.includes(departmentFilter);
    return matchesSearch && matchesDept;
  });

  const getStatusBadge = (score: number) => {
    if (score >= 85) {
      return (
        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-mono text-[11px] font-extrabold flex items-center justify-center gap-1 border border-emerald-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> {score}%
        </span>
      );
    } else if (score >= 70) {
      return (
        <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-mono text-[11px] font-extrabold flex items-center justify-center gap-1 border border-amber-300">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-700" /> {score}%
        </span>
      );
    } else {
      return (
        <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-900 font-mono text-[11px] font-extrabold flex items-center justify-center gap-1 border border-rose-300 animate-pulse">
          <XCircle className="w-3.5 h-3.5 text-rose-700" /> {score}%
        </span>
      );
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden space-y-4">
      
      {/* Search & Filter Header */}
      <div className="p-6 pb-2 border-b border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-extrabold text-stone-900">Enterprise Competency Matrix</h3>
          <p className="text-xs text-stone-500">Live practical evaluation status across 6 industrial modules</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              placeholder="Search worker or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs bg-stone-100 border border-stone-300 rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-2.5 top-2.5 pointer-events-none" />
          </div>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="text-xs bg-stone-100 border border-stone-300 rounded-xl px-3 py-2 font-medium focus:outline-none cursor-pointer"
          >
            <option value="All">All Departments</option>
            <option value="Methane">Methane Processing</option>
            <option value="HSE">HSE Oversight</option>
            <option value="Drilling">Drilling Ops</option>
            <option value="Polymers">Polymers</option>
          </select>
        </div>
      </div>

      {/* Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-50 border-y border-stone-200 text-stone-500 font-mono text-[10px] uppercase tracking-wider">
            <tr>
              <th className="py-3 px-6">Worker & Department</th>
              <th className="py-3 px-3 text-center">Overall</th>
              <th className="py-3 px-3 text-center">Fire Safety</th>
              <th className="py-3 px-3 text-center">Gas Leak</th>
              <th className="py-3 px-3 text-center">Machinery</th>
              <th className="py-3 px-3 text-center">PPE Matrix</th>
              <th className="py-3 px-3 text-center">Emergency</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filteredTrainees.map((w) => (
              <tr 
                key={w.id} 
                onClick={() => onSelectWorker(w)}
                className="hover:bg-stone-50/80 cursor-pointer transition-all"
              >
                <td className="py-3.5 px-6">
                  <div className="flex items-center gap-3">
                    <img src={w.avatar} alt={w.name} className="w-9 h-9 rounded-full object-cover border border-stone-200" />
                    <div>
                      <p className="font-bold text-stone-900 text-xs">{w.name}</p>
                      <p className="text-[11px] text-stone-500">{w.role} • <span className="font-medium">{w.department}</span></p>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-3 text-center">
                  <span className="font-black text-sm text-stone-900 font-mono">{w.overallCompetency}%</span>
                </td>

                <td className="py-3.5 px-3 text-center">{getStatusBadge(w.scoresByCategory.fireSafety)}</td>
                <td className="py-3.5 px-3 text-center">{getStatusBadge(w.scoresByCategory.gasLeak)}</td>
                <td className="py-3.5 px-3 text-center">{getStatusBadge(w.scoresByCategory.machinery)}</td>
                <td className="py-3.5 px-3 text-center">{getStatusBadge(w.scoresByCategory.ppeSelection)}</td>
                <td className="py-3.5 px-3 text-center">{getStatusBadge(w.scoresByCategory.emergencyResponse)}</td>

                <td className="py-3.5 px-4 text-right">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onSelectWorker(w); }}
                    className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-600 transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
