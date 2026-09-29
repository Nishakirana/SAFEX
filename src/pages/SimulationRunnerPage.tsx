import React from 'react';
import { useApp } from '../context/AppContext';
import { FireExplosionSim } from '../components/simulation/FireExplosionSim';
import { GasConfinedSim } from '../components/simulation/GasConfinedSim';
import { MachinerySafetySim } from '../components/simulation/MachinerySafetySim';
import { HazardHuntSim } from '../components/simulation/HazardHuntSim';
import { PPESelectionSim } from '../components/simulation/PPESelectionSim';
import { SimulationScoreCard } from '../components/simulation/SimulationScoreCard';

export const SimulationRunnerPage: React.FC<{ subRoute?: string }> = ({ subRoute }) => {
  const { activeRoute } = useApp();
  const routeKey = subRoute || activeRoute.replace('/simulations/', '');

  const renderSim = () => {
    switch (routeKey) {
      case 'fire':
        return <FireExplosionSim />;
      case 'gas':
        return <GasConfinedSim />;
      case 'machinery':
        return <MachinerySafetySim />;
      case 'hazard-hunt':
        return <HazardHuntSim />;
      case 'ppe':
        return <PPESelectionSim />;
      case 'results':
        return <SimulationScoreCard />;
      default:
        return <FireExplosionSim />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-16">
      {renderSim()}
    </div>
  );
};
