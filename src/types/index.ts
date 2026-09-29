export type UserRole = 'worker' | 'trainer' | 'admin';

export type Language = 'en' | 'hi' | 'sat';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface SimulationScenario {
  id: string;
  title: string;
  category: string;
  difficulty: DifficultyLevel;
  duration: string;
  competencyCount: number;
  description: string;
  thumbnail: string;
  status: 'Available' | 'In Progress' | 'Completed' | 'Locked';
  userScore?: number;
  lastAttempt?: string;
  prerequisite?: string;
  stepsCount: number;
}

export interface SimulationStepOption {
  id: string;
  text: string;
  isCorrect: boolean;
  scoreDelta: number;
  isCriticalError?: boolean;
  feedback: string;
  remediation?: string;
}

export interface SimulationStep {
  id: number;
  title: string;
  subtitle: string;
  instruction: string;
  viewportHotspots?: {
    id: string;
    label: string;
    type: 'hazard' | 'equipment' | 'exit' | 'zone';
    x: number; // percentage
    y: number; // percentage
    description: string;
  }[];
  question: string;
  options: SimulationStepOption[];
}

export interface ActionLogItem {
  stepId: number;
  stepTitle: string;
  selectedOptionText: string;
  isCorrect: boolean;
  isCriticalError?: boolean;
  feedback: string;
  timeSpentSeconds: number;
}

export interface ScoreBreakdown {
  overallScore: number;
  hazardRecognition: number;
  procedureAccuracy: number;
  responseTimeScore: number;
  ppeCompliance: number;
  safetyDiscipline: number;
}

export interface SimulationResult {
  scenarioId: string;
  scenarioTitle: string;
  completionTime: string;
  scores: ScoreBreakdown;
  criticalErrors: string[];
  actionLogs: ActionLogItem[];
  passed: boolean;
  retrainingRecommended: {
    title: string;
    duration: string;
    focusAreas: string[];
  };
  earnedCertificateId?: string;
}

export interface WorkerProfile {
  id: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
  siteLocation: string;
  overallCompetency: number;
  modulesCompleted: number;
  totalModules: number;
  certificatesEarned: number;
  criticalErrorsRecorded: number;
  safetyStreakDays: number;
  lastActive: string;
  scoresByCategory: {
    fireSafety: number;
    gasLeak: number;
    machinery: number;
    hazardHunt: number;
    ppeSelection: number;
    emergencyResponse: number;
  };
  retrainingNeeds: string[];
}

export interface CertificateItem {
  id: string; // e.g. SFX-2026-98421
  workerName: string;
  workerRole: string;
  department: string;
  moduleTitle: string;
  score: number;
  issueDate: string;
  validUntil: string;
  verificationHash: string;
  status: 'VERIFIED' | 'REVOKED' | 'EXPIRED';
  competenciesMastered: string[];
  issuer: string;
}

export interface NotificationItem {
  id: string;
  type: 'alert' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  linkUrl?: string;
}

export interface DetectedHazard {
  id: string;
  title: string;
  type: 'electrical' | 'slip' | 'gas' | 'ppe' | 'machinery' | 'exit';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  confidence: number;
  locationLabel: string;
  remediation: string;
  x: number;
  y: number;
}
