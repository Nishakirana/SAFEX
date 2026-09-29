import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { mockDetectedHazards } from '../../data/mockData';
import { DetectedHazard } from '../../types';
import { Camera, Scan, AlertTriangle, CheckCircle2, ShieldAlert, ArrowRight, RefreshCw, Zap } from 'lucide-react';

export const ARCameraViewport: React.FC<{ onScanComplete?: () => void }> = ({ onScanComplete }) => {
  const { navigateTo } = useApp();
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanned, setScanned] = useState(false);
  const [detectedList, setDetectedList] = useState<DetectedHazard[]>([]);

  const handleStartScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanned(false);
    setDetectedList([]);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isScanning) {
      timer = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setIsScanning(false);
            setScanned(true);
            setDetectedList(mockDetectedHazards);
            if (onScanComplete) onScanComplete();
            return 100;
          }
          return prev + 5;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isScanning, onScanComplete]);

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border-2 border-stone-800 bg-stone-950 text-white shadow-2xl relative">
      
      {/* Smartphone Viewport Header HUD */}
      <div className="bg-stone-900/90 backdrop-blur-md px-4 py-3 border-b border-stone-800 flex items-center justify-between text-xs font-mono text-stone-300 z-20 relative">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="font-bold text-white flex items-center gap-1.5">
            <Camera className="w-4 h-4 text-emerald-400" /> SAFEX AR CAMERA v4.2
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>FPS: <strong className="text-emerald-400">60.0</strong></span>
          <span>DEPTH MESH: <strong className="text-emerald-400">ACTIVE</strong></span>
          <span>LATENCY: <strong className="text-emerald-400">4ms</strong></span>
        </div>
      </div>

      {/* Main AR Simulated Viewport Area */}
      <div className="relative h-[420px] sm:h-[500px] w-full bg-stone-900 overflow-hidden flex items-center justify-center">
        
        {/* Background Visual Industrial Scene Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 filter contrast-125 saturate-150"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80')`
          }}
        />

        {/* AR Grid Matrix Overlay */}
        <div className="absolute inset-0 ar-grid-overlay opacity-30 pointer-events-none" />

        {/* Animated Laser Scanning Line */}
        {isScanning && (
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10B981] animate-scan-bar z-10" />
        )}

        {/* Reticle / Viewfinder Frame Corners */}
        <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-emerald-400 z-10" />
        <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-emerald-400 z-10" />
        <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-emerald-400 z-10" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-emerald-400 z-10" />

        {/* Center Target Indicator */}
        {!scanned && !isScanning && (
          <div className="z-10 text-center space-y-3">
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-emerald-400/80 mx-auto flex items-center justify-center animate-spin-slow">
              <Scan className="w-8 h-8 text-emerald-400" />
            </div>
            <p className="text-sm font-bold text-stone-200 bg-stone-900/80 px-4 py-1.5 rounded-full inline-block backdrop-blur">
              Point camera at industrial bay & click Start Scan
            </p>
          </div>
        )}

        {/* Live Scanning Progress HUD */}
        {isScanning && (
          <div className="z-10 text-center space-y-3 bg-stone-950/80 p-6 rounded-2xl border border-emerald-500/40 backdrop-blur-md">
            <div className="w-16 h-16 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin mx-auto" />
            <div>
              <p className="text-base font-extrabold text-emerald-400 tracking-wide">SCANNING ENVIRONMENT...</p>
              <p className="text-xs text-stone-400 mt-0.5">Analyzing 3D spatial point cloud & safety compliance</p>
            </div>
            <div className="w-48 bg-stone-800 h-2 rounded-full overflow-hidden mx-auto">
              <div className="bg-emerald-500 h-full transition-all duration-100" style={{ width: `${scanProgress}%` }} />
            </div>
            <p className="text-xs font-mono text-emerald-400 font-bold">{scanProgress}% COMPLETE</p>
          </div>
        )}

        {/* AR Detected Hazard Hotspot Overlays */}
        {scanned && (
          <div className="absolute inset-0 z-10">
            {detectedList.map((hazard) => (
              <div 
                key={hazard.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-in zoom-in-50 duration-500"
                style={{ left: `${hazard.x}%`, top: `${hazard.y}%` }}
              >
                <div className="relative group cursor-pointer">
                  {/* Pulsing Beacon */}
                  <div className="w-8 h-8 rounded-full bg-amber-500/40 animate-ping absolute -inset-0" />
                  <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center shadow-lg text-stone-950 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4 fill-amber-950 text-amber-500" />
                  </div>

                  {/* AR Label Floating Tag */}
                  <div className="absolute left-10 -top-4 w-52 bg-stone-900/95 backdrop-blur-md border border-amber-500/60 p-2.5 rounded-xl shadow-2xl text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-amber-400 uppercase text-[10px] tracking-wider flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-400" /> {hazard.severity} HAZARD
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono">{hazard.confidence}%</span>
                    </div>
                    <p className="font-bold text-white text-xs">{hazard.title}</p>
                    <p className="text-[10px] text-stone-300 leading-tight">{hazard.remediation}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Success Overlay Banner */}
            <div className="absolute bottom-6 left-6 right-6 bg-stone-900/95 backdrop-blur-md border border-emerald-500/50 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    3 Industrial Hazards Identified
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono">CONFIDENCE 98.4%</span>
                  </h4>
                  <p className="text-xs text-stone-300">Environment scan ready for practical safety evaluation simulation.</p>
                </div>
              </div>
              <button
                onClick={() => navigateTo('/simulations/fire')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 transition-all shrink-0"
              >
                Enter Fire Simulation
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Footer Controls Bar */}
      <div className="bg-stone-950 px-6 py-4 border-t border-stone-800 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-4 text-xs text-stone-400">
          <span>Surface Depth: <strong className="text-white font-mono">1.4m</strong></span>
          <span>Lighting: <strong className="text-emerald-400 font-mono">OPTIMAL</strong></span>
          <span>Object Detection: <strong className="text-emerald-400 font-mono">READY</strong></span>
        </div>

        <div className="flex items-center gap-2">
          {scanned && (
            <button
              onClick={handleStartScan}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Rescan Area
            </button>
          )}

          {!isScanning && !scanned && (
            <button
              onClick={handleStartScan}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-extrabold text-xs shadow-lg flex items-center gap-2 transition-all"
            >
              <Scan className="w-4 h-4" /> Start Safety Scan
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
