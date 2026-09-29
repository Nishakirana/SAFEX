import React from 'react';
import { ReportsGenerator } from '../components/admin/ReportsGenerator';

export const AdminReportsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-16">
      <div>
        <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest">
          REGULATORY AUDIT EXPORTS
        </span>
        <h1 className="text-3xl font-black text-stone-900">Compliance & Gap Reports</h1>
        <p className="text-xs sm:text-sm text-stone-600">Export regulatory CSV & PDF audit reports for industrial safety authorities.</p>
      </div>

      <ReportsGenerator />
    </div>
  );
};
