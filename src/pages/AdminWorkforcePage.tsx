import React, { useState } from 'react';
import { CompetencyMatrix } from '../components/admin/CompetencyMatrix';
import { WorkerDetailModal } from '../components/admin/WorkerDetailModal';
import { WorkerProfile } from '../types';

export const AdminWorkforcePage: React.FC = () => {
  const [selectedWorker, setSelectedWorker] = useState<WorkerProfile | null>(null);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-16">
      <div>
        <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest">
          WORKFORCE DIRECTORY
        </span>
        <h1 className="text-3xl font-black text-stone-900">Plant Workforce Competency Matrix</h1>
        <p className="text-xs sm:text-sm text-stone-600">Inspect individual worker scores, critical error records, and assigned retraining.</p>
      </div>

      <CompetencyMatrix onSelectWorker={(w) => setSelectedWorker(w)} />

      {selectedWorker && (
        <WorkerDetailModal worker={selectedWorker} onClose={() => setSelectedWorker(null)} />
      )}
    </div>
  );
};
