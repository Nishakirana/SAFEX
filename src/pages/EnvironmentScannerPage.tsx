import React from 'react';
import { ARCameraViewport } from '../components/simulation/ARCameraViewport';

export const EnvironmentScannerPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-16">
      <div className="space-y-1">
        <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest">
          SAFE-X AR SCANNER
        </span>
        <h1 className="text-3xl font-black text-stone-900">Scan Your Surroundings</h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Point device camera at your work environment to detect spatial hazards, missing safety controls, and required PPE.
        </p>
      </div>

      <ARCameraViewport />
    </div>
  );
};
