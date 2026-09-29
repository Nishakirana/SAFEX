import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { mockFireStepDetails } from '../../data/mockData';
import { SimulationStepOption, ActionLogItem, SimulationResult } from '../../types';
import { 
  Flame, 
  Clock, 
  AlertOctagon, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Volume2, 
  ShieldAlert, 
  Info,
  Award
} from 'lucide-react';

export const FireExplosionSim: React.FC = () => {
  const { navigateTo, setSimulationResult } = useApp();
  
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<SimulationStepOption | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  
  // Real-time score state logic
  const [currentScore, setCurrentScore] = useState(100);
  const [actionLogs, setActionLogs] = useState<ActionLogItem[]>([]);
  const [criticalErrors, setCriticalErrors] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const currentStep = mockFireStepDetails[currentStepIdx];

  // Simulation Step Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isCompleted && !showFeedbackModal) {
      timer = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isCompleted, showFeedbackModal]);

  const handleOptionSelect = (opt: SimulationStepOption) => {
    setSelectedOption(opt);
  };

  const handleConfirmChoice = () => {
    if (!selectedOption) return;

    // Calculate score impact
    const scoreDelta = selectedOption.scoreDelta;
    const newScore = Math.max(0, Math.min(100, currentScore + scoreDelta));
    setCurrentScore(newScore);

    // Track critical error if applicable
    let updatedCriticals = [...criticalErrors];
    if (selectedOption.isCriticalError) {
      updatedCriticals.push(selectedOption.feedback);
      setCriticalErrors(updatedCriticals);
    }

    // Log action
    const newLog: ActionLogItem = {
      stepId: currentStep.id,
      stepTitle: currentStep.title,
      selectedOptionText: selectedOption.text,
      isCorrect: selectedOption.isCorrect,
      isCriticalError: selectedOption.isCriticalError,
      feedback: selectedOption.feedback,
      timeSpentSeconds: secondsElapsed
    };
    const updatedLogs = [...actionLogs, newLog];
    setActionLogs(updatedLogs);

    setShowFeedbackModal(true);
  };

  const handleNextStep = () => {
    setShowFeedbackModal(false);
    setSelectedOption(null);
    setActiveHotspot(null);

    if (currentStepIdx < mockFireStepDetails.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    } else {
      // Complete Simulation
      setIsCompleted(true);
      
      const timeFormatted = `${Math.floor(secondsElapsed / 60).toString().padStart(2, '0')}:${(secondsElapsed % 60).toString().padStart(2, '0')}`;
      
      const finalRes: SimulationResult = {
        scenarioId: 'fire',
        scenarioTitle: 'Fire & Explosion Response',
        completionTime: timeFormatted,
        scores: {
          overallScore: currentScore,
          hazardRecognition: currentScore >= 80 ? 94 : 70,
          procedureAccuracy: currentScore >= 80 ? 92 : 65,
          responseTimeScore: Math.max(60, 100 - secondsElapsed * 2),
          ppeCompliance: 100,
          safetyDiscipline: criticalErrors.length > 0 ? 50 : 96
        },
        criticalErrors,
        actionLogs,
        passed: currentScore >= 75 && criticalErrors.length === 0,
        retrainingRecommended: {
          title: 'Emergency Evacuation & Alarm Sequencing Level 2',
          duration: '04:00',
          focusAreas: ['Manual Station Alarm Pull Protocol', 'CO2 Extinguisher Selection', 'Upwind Route Navigation']
        },
        earnedCertificateId: currentScore >= 75 && criticalErrors.length === 0 ? 'SFX-2026-98421' : undefined
      };

      setSimulationResult(finalRes);
    }
  };

  const formatTime = (totalSec: number) => {
    const m = Math.floor(totalSec / 60).toString().padStart(2, '0');
    const s = (totalSec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (isCompleted) {
    // Immediate auto redirection to results page or score summary trigger
    return (
      <div className="max-w-4xl mx-auto my-8 p-8 bg-white rounded-3xl border border-stone-200 shadow-2xl text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
          <Award className="w-10 h-10" />
        </div>
        <div>
          <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            SIMULATION COMPLETE
          </span>
          <h2 className="text-3xl font-extrabold text-stone-900 mt-3">Fire & Explosion Response Evaluation</h2>
          <p className="text-stone-600 text-sm mt-1">Your choices have been analyzed against industrial HSE standards.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-200">
          <div>
            <p className="text-xs text-stone-500 font-medium">Final Competency</p>
            <p className={`text-2xl font-black ${currentScore >= 75 && criticalErrors.length === 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
              {currentScore}%
            </p>
          </div>
          <div>
            <p className="text-xs text-stone-500 font-medium">Time Taken</p>
            <p className="text-2xl font-black text-stone-900 font-mono">{formatTime(secondsElapsed)}</p>
          </div>
          <div>
            <p className="text-xs text-stone-500 font-medium">Critical Errors</p>
            <p className={`text-2xl font-black ${criticalErrors.length === 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
              {criticalErrors.length}
            </p>
          </div>
          <div>
            <p className="text-xs text-stone-500 font-medium">Status</p>
            <p className="text-lg font-bold text-stone-900">
              {currentScore >= 75 && criticalErrors.length === 0 ? 'COMPETENT' : 'RETRAINING REQ.'}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => {
              setCurrentStepIdx(0);
              setCurrentScore(100);
              setActionLogs([]);
              setCriticalErrors([]);
              setIsCompleted(false);
              setSecondsElapsed(0);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-900 font-bold text-xs flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Retry Simulation
          </button>
          <button
            onClick={() => navigateTo('/simulations/results')}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-stone-900 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-xl flex items-center justify-center gap-2 transition-all"
          >
            View Detailed Score Breakdown & Certificate
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Top Simulation HUD Bar */}
      <div className="bg-stone-900 text-white rounded-2xl p-4 shadow-xl border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-600/30 border border-rose-500 text-rose-400 flex items-center justify-center">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-800 font-bold">
                SCENARIO: HIGH-PRESSURE METHANE
              </span>
              <span className="text-xs text-stone-400">Step {currentStepIdx + 1} of {mockFireStepDetails.length}</span>
            </div>
            <h3 className="text-base font-extrabold text-white mt-0.5">{currentStep.title}</h3>
          </div>
        </div>

        {/* HUD Live Metrics */}
        <div className="flex items-center gap-6 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-stone-300 bg-stone-800/80 px-3 py-1.5 rounded-lg border border-stone-700">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>ELAPSED: <strong className="text-white">{formatTime(secondsElapsed)}</strong></span>
          </div>

          <div className="flex items-center gap-1.5 text-stone-300 bg-stone-800/80 px-3 py-1.5 rounded-lg border border-stone-700">
            <span>LIVE COMPETENCY:</span>
            <strong className={`text-sm ${currentScore >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {currentScore}%
            </strong>
          </div>
        </div>
      </div>

      {/* Main 2-Column Simulation Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Visual AR Camera Scene Viewport (7 Cols) */}
        <div className="lg:col-span-7 bg-stone-950 rounded-3xl border-2 border-stone-800 overflow-hidden shadow-2xl relative flex flex-col">
          
          {/* AR Scene Canvas Simulation Display */}
          <div className="relative h-[380px] sm:h-[440px] w-full bg-stone-900 overflow-hidden">
            
            {/* Background Industrial Scene Graphic */}
            <div 
              className="absolute inset-0 bg-cover bg-center filter saturate-125 contrast-125"
              style={{
                backgroundImage: currentStepIdx === 0 || currentStepIdx === 1
                  ? `url('https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80')`
                  : `url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80')`
              }}
            />

            {/* Dark Industrial Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

            {/* AR Grid Mesh */}
            <div className="absolute inset-0 ar-grid-overlay opacity-20 pointer-events-none" />

            {/* Simulated Flame & Smoke Particle Graphic Effect */}
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-64 h-32 bg-amber-500/30 filter blur-xl animate-pulse pointer-events-none" />

            {/* Interactive Hotspots Overlay on Visual Scene */}
            {currentStep.viewportHotspots?.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setActiveHotspot(spot.id)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-20"
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              >
                <div className="relative">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/30 animate-ping absolute inset-0" />
                  <div className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center font-bold text-xs shadow-lg transition-all ${
                    spot.type === 'hazard' ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                  }`}>
                    {spot.type === 'hazard' ? '!' : '✓'}
                  </div>
                  
                  {/* Tooltip Tag */}
                  <div className="absolute left-10 -top-2 w-44 bg-stone-900/95 backdrop-blur text-white text-[11px] p-2 rounded-lg border border-stone-700 shadow-xl opacity-95 pointer-events-none">
                    <p className="font-bold text-emerald-400">{spot.label}</p>
                    <p className="text-[10px] text-stone-300 leading-tight">{spot.description}</p>
                  </div>
                </div>
              </button>
            ))}

            {/* Bottom HUD Banner */}
            <div className="absolute bottom-4 left-4 right-4 bg-stone-900/90 backdrop-blur-md p-3 rounded-xl border border-stone-800 text-white text-xs flex items-center justify-between">
              <span className="font-mono text-stone-300 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-emerald-400" />
                Click scene hotspots to inspect hazards & safety equipment
              </span>
              <span className="text-[10px] bg-stone-800 px-2 py-1 rounded text-emerald-400 font-mono">AR CAMERA ACTIVE</span>
            </div>

          </div>

          {/* Hotspot Inspection Box */}
          {activeHotspot && (
            <div className="p-4 bg-stone-900 border-t border-stone-800 text-xs text-stone-200 animate-in fade-in">
              {(() => {
                const item = currentStep.viewportHotspots?.find(h => h.id === activeHotspot);
                if (!item) return null;
                return (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center shrink-0">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{item.label}</h4>
                      <p className="text-stone-300 mt-0.5">{item.description}</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

        </div>

        {/* Right Column: Decision Engine & Question Form (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-200 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-xs font-bold tracking-widest text-stone-500 uppercase">
                {currentStep.subtitle}
              </span>
            </div>

            <h3 className="text-lg font-extrabold text-stone-900 leading-snug">
              {currentStep.question}
            </h3>

            <p className="text-xs text-stone-500 mt-2 mb-4 leading-relaxed">
              {currentStep.instruction}
            </p>

            {/* Options List */}
            <div className="space-y-3">
              {currentStep.options.map((opt) => {
                const isSelected = selectedOption?.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleOptionSelect(opt)}
                    className={`w-full text-left p-3.5 rounded-2xl border text-xs font-medium transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900 shadow-md font-semibold'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'border-emerald-400 bg-emerald-400 text-stone-950' : 'border-stone-400'
                    }`}>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-stone-950" />}
                    </div>
                    <span className="flex-1 leading-snug">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-6 border-t border-stone-100 mt-6 flex items-center justify-between">
            <span className="text-xs text-stone-400">
              Select one response to proceed
            </span>
            <button
              onClick={handleConfirmChoice}
              disabled={!selectedOption}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-extrabold text-xs shadow-lg transition-all flex items-center gap-2"
            >
              Confirm Choice
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

        </div>

      </div>

      {/* Immediate Decision Feedback Modal */}
      {showFeedbackModal && selectedOption && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4 animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                selectedOption.isCorrect 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : selectedOption.isCriticalError 
                    ? 'bg-rose-100 text-rose-700' 
                    : 'bg-amber-100 text-amber-700'
              }`}>
                {selectedOption.isCorrect ? (
                  <CheckCircle2 className="w-7 h-7" />
                ) : (
                  <AlertOctagon className="w-7 h-7" />
                )}
              </div>
              <div>
                <h4 className={`font-extrabold text-base ${
                  selectedOption.isCorrect ? 'text-emerald-900' : selectedOption.isCriticalError ? 'text-rose-900' : 'text-amber-900'
                }`}>
                  {selectedOption.isCorrect ? 'Correct Decision' : selectedOption.isCriticalError ? 'CRITICAL SAFETY ERROR' : 'Unsafe Decision'}
                </h4>
                <p className="text-xs text-stone-500 font-mono">
                  Competency Impact: {selectedOption.scoreDelta >= 0 ? `+${selectedOption.scoreDelta}` : selectedOption.scoreDelta} PTS
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-800 bg-stone-50 p-3.5 rounded-xl border border-stone-200 leading-relaxed font-medium">
              {selectedOption.feedback}
            </p>

            {selectedOption.remediation && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <ShieldAlert className="w-4 h-4 text-amber-600" /> HSE Protocol Remediation:
                </p>
                <p className="text-[11px] leading-tight">{selectedOption.remediation}</p>
              </div>
            )}

            <button
              onClick={handleNextStep}
              className="w-full py-3 rounded-xl bg-stone-900 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
            >
              Continue to Step {currentStepIdx + 2}
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
