import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockCertificates } from '../data/mockData';
import { Search, Filter, CheckCircle2, Award, ExternalLink, Download } from 'lucide-react';

export const AdminCertificationsPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredCerts = mockCertificates.filter(c => {
    const matchSearch = c.workerName.toLowerCase().includes(search.toLowerCase()) || c.moduleTitle.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest">
            CREDENTIAL AUDIT
          </span>
          <h1 className="text-3xl font-black text-stone-900">Enterprise Certifications Registry</h1>
          <p className="text-xs sm:text-sm text-stone-600">Verifiable practical competency certificates across all workforce divisions.</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search worker or cert ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-xs bg-white border border-stone-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-48 sm:w-64"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-xs bg-white border border-stone-300 rounded-xl px-3 py-2 font-medium focus:outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="VERIFIED">Verified</option>
            <option value="Expiring">Expiring Soon</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-mono text-[10px] uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-6">Certificate ID & Module</th>
              <th className="py-3.5 px-4">Worker</th>
              <th className="py-3.5 px-3 text-center">Score</th>
              <th className="py-3.5 px-4">Issued</th>
              <th className="py-3.5 px-4">Valid Until</th>
              <th className="py-3.5 px-4 text-center">Status</th>
              <th className="py-3.5 px-4 text-right">Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filteredCerts.map((c) => (
              <tr key={c.id} className="hover:bg-stone-50 transition-all">
                <td className="py-4 px-6">
                  <p className="font-extrabold text-stone-900 text-xs">{c.moduleTitle}</p>
                  <p className="text-[10px] text-emerald-700 font-mono">{c.id}</p>
                </td>
                <td className="py-4 px-4 font-bold text-stone-800">{c.workerName}</td>
                <td className="py-4 px-3 text-center font-black font-mono text-emerald-700">{c.score}%</td>
                <td className="py-4 px-4 text-stone-600 font-mono">{c.issueDate}</td>
                <td className="py-4 px-4 text-stone-600 font-mono">{c.validUntil}</td>
                <td className="py-4 px-4 text-center">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-mono text-[10px] font-bold">
                    ✓ VERIFIED
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <button
                    onClick={() => navigateTo(`/verify/${c.id}`)}
                    className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-emerald-600 text-white font-bold text-[11px] shadow-sm transition-all inline-flex items-center gap-1"
                  >
                    Verify Link <ExternalLink className="w-3 h-3" />
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
