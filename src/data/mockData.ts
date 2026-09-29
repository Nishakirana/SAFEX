import { SimulationScenario, WorkerProfile, CertificateItem, NotificationItem, DetectedHazard, SimulationStep } from '../types';

export const mockScenarios: SimulationScenario[] = [
  {
    id: 'fire',
    title: 'Fire & Explosion Response',
    category: 'Emergency & Thermal',
    difficulty: 'Advanced',
    duration: '04:32',
    competencyCount: 6,
    description: 'High-stakes simulation involving methane pressurized flash fire. Master alarm sequencing, extinguisher classification, and windward evacuation.',
    thumbnail: '🔥',
    status: 'Available',
    userScore: 91,
    lastAttempt: '2 days ago',
    stepsCount: 6,
  },
  {
    id: 'gas',
    title: 'Gas Leak & Confined Space',
    category: 'Toxic & Oxygen Deficient',
    difficulty: 'Advanced',
    duration: '05:10',
    competencyCount: 7,
    description: 'Evaluate atmospheric sampling (H2S / CO / O2), SCBA harness inspection, entry permit verification, and buddy extraction protocol.',
    thumbnail: '☣️',
    status: 'Available',
    userScore: 68,
    lastAttempt: '5 days ago',
    stepsCount: 6,
  },
  {
    id: 'machinery',
    title: 'Machinery & Equipment Safety',
    category: 'Mechanical Hazards',
    difficulty: 'Intermediate',
    duration: '04:45',
    competencyCount: 5,
    description: 'Perform Lockout/Tagout (LOTO) procedures on heavy industrial press lines, identify missing nip-point guards, and execute e-stop isolation.',
    thumbnail: '⚙️',
    status: 'Available',
    userScore: 88,
    lastAttempt: '1 week ago',
    stepsCount: 5,
  },
  {
    id: 'hazard-hunt',
    title: 'Workplace Hazard Hunt',
    category: 'Site Inspection',
    difficulty: 'Intermediate',
    duration: '03:50',
    competencyCount: 12,
    description: 'Explore a live high-voltage plant bay. Locate 5 hidden site hazards including exposed cables, oil slicks, and blocked fire exits under time constraint.',
    thumbnail: '🔍',
    status: 'Available',
    userScore: 94,
    lastAttempt: 'Yesterday',
    stepsCount: 1,
  },
  {
    id: 'ppe',
    title: 'PPE & Site Induction',
    category: 'Personal Protection',
    difficulty: 'Beginner',
    duration: '03:20',
    competencyCount: 8,
    description: 'Select precise PPE matrix for corrosive chemical transfer bay. Test helmet tension, respirator seal, and chemical apron specs.',
    thumbnail: '🥽',
    status: 'Available',
    userScore: 100,
    lastAttempt: '3 days ago',
    stepsCount: 1,
  },
  {
    id: 'emergency',
    title: 'Emergency Response & Evacuation',
    category: 'Crisis Management',
    difficulty: 'Advanced',
    duration: '05:40',
    competencyCount: 9,
    description: 'Multi-hazard facility collapse & chemical containment. Coordinate headcounts, assembly area triage, and emergency services handoff.',
    thumbnail: '🚨',
    status: 'Available',
    userScore: 72,
    lastAttempt: '1 month ago',
    stepsCount: 6,
  }
];

export const mockFireStepDetails: SimulationStep[] = [
  {
    id: 1,
    title: 'Environment Observation',
    subtitle: 'Step 1 of 6 — Visual Survey & Hazard Recognition',
    instruction: 'Inspect the pump station area. Observe atmospheric indicators, pressure valves, and smoke accumulation.',
    viewportHotspots: [
      { id: 'h1', label: 'Thick Black Smoke', type: 'hazard', x: 42, y: 28, description: 'Dense smoke venting from high-pressure methane pump.' },
      { id: 'h2', label: 'Gas Valve Pressure Redline', type: 'hazard', x: 68, y: 45, description: 'Pressure gauge reading 18.5 Bar (Normal: < 5 Bar).' },
      { id: 'h3', label: 'Emergency Alarm Switch', type: 'equipment', x: 18, y: 55, description: 'Manual pull station connected to central station.' },
      { id: 'h4', label: 'CO2 Fire Extinguisher', type: 'equipment', x: 82, y: 62, description: 'Class B/C CO2 Extinguisher rated for gas & electrical.' }
    ],
    question: 'You notice dense smoke and a high-pressure methane gas leak redlining. What is your immediate FIRST priority action?',
    options: [
      {
        id: 'opt_1',
        text: 'Pull the Manual Station Alarm & call facility emergency dispatch immediately',
        isCorrect: true,
        scoreDelta: 20,
        feedback: 'Correct! Establishing facility alarm and alerting evacuation routes must occur BEFORE fighting any pressurized fire.',
      },
      {
        id: 'opt_2',
        text: 'Grab the nearest water hose reel and spray directly at the gas pump line',
        isCorrect: false,
        scoreDelta: -20,
        isCriticalError: true,
        feedback: 'CRITICAL SAFETY ERROR! Spraying water on a pressurized flammable gas fire can spread fuel or cause sudden vapor explosion!',
        remediation: 'Never use water streams directly on pressurized gas leaks without shutting off fuel valves.'
      },
      {
        id: 'opt_3',
        text: 'Enter the smoke envelope to manually twist off the fuel isolation valve without SCBA',
        isCorrect: false,
        scoreDelta: -25,
        isCriticalError: true,
        feedback: 'CRITICAL SAFETY ERROR! Entering toxic methane smoke without respiratory protection causes immediate asphyxiation.',
        remediation: 'Never enter dense hydrocarbon smoke without proper SCBA atmosphere isolation.'
      },
      {
        id: 'opt_4',
        text: 'Wait 3 minutes to see if automatic deluge sprinklers kick in before taking action',
        isCorrect: false,
        scoreDelta: -10,
        feedback: 'Incorrect. Delaying alarm activation allows gas vapor cloud to reach ignition threshold.'
      }
    ]
  },
  {
    id: 2,
    title: 'Fuel Source Isolation',
    subtitle: 'Step 2 of 6 — Isolation & Valve Control',
    instruction: 'The alarm is sounding across Sector 4. The methane pump is continuing to supply fuel to the flame.',
    viewportHotspots: [
      { id: 'h5', label: 'Remote Fuel Shutoff Switch', type: 'equipment', x: 25, y: 40, description: 'Solenoid remote trip switch outside ignition radius.' }
    ],
    question: 'How should you isolate the fuel source before attempting suppression?',
    options: [
      {
        id: 'opt_2_1',
        text: 'Activate the Remote Fuel Emergency Shutoff Switch located outside the blast boundary',
        isCorrect: true,
        scoreDelta: 20,
        feedback: 'Correct decision! Remote shutoff cuts fuel pressure safely without placing responder in direct line of fire.'
      },
      {
        id: 'opt_2_2',
        text: 'Try to extinguish the open gas flame first while gas is still actively pumping under 18 Bar pressure',
        isCorrect: false,
        scoreDelta: -15,
        feedback: 'Unsafe decision! Extinguishing a gas fire without stopping gas flow creates an unignited explosive gas cloud!'
      },
      {
        id: 'opt_2_3',
        text: 'Open secondary release valves to vent gas into the room corridor',
        isCorrect: false,
        scoreDelta: -20,
        isCriticalError: true,
        feedback: 'CRITICAL SAFETY ERROR! Venting gas into indoor corridors creates catastrophic confined explosion risk.'
      }
    ]
  },
  {
    id: 3,
    title: 'Extinguisher Selection',
    subtitle: 'Step 3 of 6 — Chemical & Equipment Matching',
    instruction: 'The remote valve has reduced pressure, but an electrical control panel next to the pump has caught fire.',
    viewportHotspots: [
      { id: 'e1', label: 'Water Pressure Hose (Class A)', type: 'equipment', x: 30, y: 70, description: 'Suitable for solid combustibles only.' },
      { id: 'e2', label: 'CO2 Extinguisher (Class B/C)', type: 'equipment', x: 50, y: 70, description: 'Non-conductive carbon dioxide agent.' },
      { id: 'e3', label: 'Wet Chemical Extinguisher (Class K)', type: 'equipment', x: 70, y: 70, description: 'For commercial kitchen oils.' }
    ],
    question: 'Which fire suppression agent must be selected for energized 415V electrical switchgear?',
    options: [
      {
        id: 'opt_3_1',
        text: 'Class B/C Carbon Dioxide (CO2) or Dry Chemical (Purple-K) Extinguisher',
        isCorrect: true,
        scoreDelta: 20,
        feedback: 'Correct! CO2 is non-conductive and leaves no conductive residue on energized electrical gear.'
      },
      {
        id: 'opt_3_2',
        text: 'Standard Water Jet Hose Reel',
        isCorrect: false,
        scoreDelta: -25,
        isCriticalError: true,
        feedback: 'CRITICAL SAFETY ERROR! Water is electrically conductive! Using water on 415V equipment causes fatal electrocution.'
      },
      {
        id: 'opt_3_3',
        text: 'Foam (AFFF) Extinguisher',
        isCorrect: false,
        scoreDelta: -15,
        feedback: 'Incorrect. Water-based foam carries electrical current and damages electronics.'
      }
    ]
  },
  {
    id: 4,
    title: 'PASS Procedure Execution',
    subtitle: 'Step 4 of 6 — Tactical Execution',
    instruction: 'You are holding the CO2 extinguisher 2.5 meters windward from the target electrical fire panel.',
    question: 'What is the correct sequence of the standard P.A.S.S. fire fighting method?',
    options: [
      {
        id: 'opt_4_1',
        text: 'PULL pin → AIM nozzle at base → SQUEEZE lever → SWEEP side to side',
        isCorrect: true,
        scoreDelta: 20,
        feedback: 'Perfect execution! Aiming at the base of the flames starves the fuel reaction.'
      },
      {
        id: 'opt_4_2',
        text: 'PRESS valve → AIM at top of flames → SQUEEZE handle → SPRAY in circles',
        isCorrect: false,
        scoreDelta: -10,
        feedback: 'Incorrect. Aiming at top of flames allows agent to dissipate without smothering the base.'
      },
      {
        id: 'opt_4_3',
        text: 'PULL pin → SQUEEZE immediately → AIM at ceiling → SWEEP vertically',
        isCorrect: false,
        scoreDelta: -10,
        feedback: 'Incorrect. Discharging agent into air wastes pressure before nozzle is aligned.'
      }
    ]
  },
  {
    id: 5,
    title: 'Evacuation Route Selection',
    subtitle: 'Step 5 of 6 — Environmental Navigation',
    instruction: 'Heavy thermal radiant heat is increasing. Emergency evacuation lights are flashing.',
    viewportHotspots: [
      { id: 'exit1', label: 'Primary Exit Door North (Upwind)', type: 'exit', x: 80, y: 35, description: 'Clear pathway with green illuminated sign, upwind direction.' },
      { id: 'exit2', label: 'Secondary Exit South (Downwind Smoke)', type: 'exit', x: 15, y: 35, description: 'Corridor filled with heavy thermal gas column.' }
    ],
    question: 'Which evacuation pathway provides maximum survival protection?',
    options: [
      {
        id: 'opt_5_1',
        text: 'Evacuate UPWIND towards the North Primary Exit Door holding low beneath smoke',
        isCorrect: true,
        scoreDelta: 10,
        feedback: 'Correct! Upwind evacuation prevents toxic inhalation and ensures clear visibility.'
      },
      {
        id: 'opt_5_2',
        text: 'Run downwind through the smoke-filled South corridor to find elevator',
        isCorrect: false,
        scoreDelta: -20,
        isCriticalError: true,
        feedback: 'CRITICAL SAFETY ERROR! Never use elevators during facility structural fires and never run downwind in smoke clouds.'
      }
    ]
  },
  {
    id: 6,
    title: 'Assembly Point & Headcount',
    subtitle: 'Step 6 of 6 — Verification & Handover',
    instruction: 'You have exited Sector 4 and arrived at Emergency Assembly Point Charlie.',
    question: 'What final safety step completes the emergency evacuation protocol?',
    options: [
      {
        id: 'opt_6_1',
        text: 'Report headcount status to Safety Officer & inform Fire Crew of isolated gas valve',
        isCorrect: true,
        scoreDelta: 10,
        feedback: 'Excellent! Informing incoming emergency crews of valve status protects responding firefighters.'
      },
      {
        id: 'opt_6_2',
        text: 'Re-enter the facility to retrieve personal belongings from locker',
        isCorrect: false,
        scoreDelta: -25,
        isCriticalError: true,
        feedback: 'CRITICAL SAFETY ERROR! Never re-enter an evacuated industrial structure until Safety Chief gives official All Clear.'
      }
    ]
  }
];

export const mockTrainees: WorkerProfile[] = [
  {
    id: 'w1',
    name: 'Aarav Kumar',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    role: 'Senior Plant Technician',
    department: 'Methane Processing',
    siteLocation: 'Jamshedpur Refinery',
    overallCompetency: 91,
    modulesCompleted: 9,
    totalModules: 12,
    certificatesEarned: 5,
    criticalErrorsRecorded: 0,
    safetyStreakDays: 14,
    lastActive: '10 mins ago',
    scoresByCategory: {
      fireSafety: 91,
      gasLeak: 78,
      machinery: 88,
      hazardHunt: 94,
      ppeSelection: 100,
      emergencyResponse: 85
    },
    retrainingNeeds: ['Gas Leak SCBA Entry Sequence', 'Confined Space Lockout']
  },
  {
    id: 'w2',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    role: 'Safety Field Inspector',
    department: 'HSE Oversight',
    siteLocation: 'Kolkata Heavy Works',
    overallCompetency: 96,
    modulesCompleted: 12,
    totalModules: 12,
    certificatesEarned: 8,
    criticalErrorsRecorded: 0,
    safetyStreakDays: 45,
    lastActive: '1 hour ago',
    scoresByCategory: {
      fireSafety: 98,
      gasLeak: 94,
      machinery: 95,
      hazardHunt: 99,
      ppeSelection: 100,
      emergencyResponse: 92
    },
    retrainingNeeds: []
  },
  {
    id: 'w3',
    name: 'Rahul Das',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    role: 'Junior Rig Operator',
    department: 'Drilling Operations',
    siteLocation: 'Mumbai Offshore Rig 3',
    overallCompetency: 64,
    modulesCompleted: 4,
    totalModules: 12,
    certificatesEarned: 2,
    criticalErrorsRecorded: 3,
    safetyStreakDays: 2,
    lastActive: 'Yesterday',
    scoresByCategory: {
      fireSafety: 55,
      gasLeak: 60,
      machinery: 72,
      hazardHunt: 68,
      ppeSelection: 80,
      emergencyResponse: 50
    },
    retrainingNeeds: ['Pressurized Fire Suppression', 'Electrical Extinguisher Selection', 'Evacuation Navigation']
  },
  {
    id: 'w4',
    name: 'Sneha Nair',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
    role: 'Chemical Process Engineer',
    department: 'Polymers Division',
    siteLocation: 'Vadodara Complex',
    overallCompetency: 88,
    modulesCompleted: 8,
    totalModules: 12,
    certificatesEarned: 4,
    criticalErrorsRecorded: 1,
    safetyStreakDays: 9,
    lastActive: '3 hours ago',
    scoresByCategory: {
      fireSafety: 84,
      gasLeak: 89,
      machinery: 90,
      hazardHunt: 86,
      ppeSelection: 95,
      emergencyResponse: 84
    },
    retrainingNeeds: ['Thermal Radiation Response']
  },
  {
    id: 'w5',
    name: 'Imran Khan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    role: 'Electrical Maintenance Lead',
    department: 'High Voltage Grids',
    siteLocation: 'Raigarh Power Station',
    overallCompetency: 82,
    modulesCompleted: 7,
    totalModules: 12,
    certificatesEarned: 4,
    criticalErrorsRecorded: 1,
    safetyStreakDays: 6,
    lastActive: '5 hours ago',
    scoresByCategory: {
      fireSafety: 80,
      gasLeak: 70,
      machinery: 92,
      hazardHunt: 85,
      ppeSelection: 90,
      emergencyResponse: 75
    },
    retrainingNeeds: ['Gas Detector Calibration']
  },
  {
    id: 'w6',
    name: 'Karan Singh',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80',
    role: 'Warehouse Logistics Supervisor',
    department: 'Supply Chain',
    siteLocation: 'Pune Hub',
    overallCompetency: 76,
    modulesCompleted: 5,
    totalModules: 12,
    certificatesEarned: 3,
    criticalErrorsRecorded: 2,
    safetyStreakDays: 4,
    lastActive: '2 days ago',
    scoresByCategory: {
      fireSafety: 72,
      gasLeak: 65,
      machinery: 80,
      hazardHunt: 78,
      ppeSelection: 88,
      emergencyResponse: 74
    },
    retrainingNeeds: ['Forklift Hazard Zone Isolation']
  }
];

export const mockCertificates: CertificateItem[] = [
  {
    id: 'SFX-2026-98421',
    workerName: 'Aarav Kumar',
    workerRole: 'Senior Plant Technician',
    department: 'Methane Processing',
    moduleTitle: 'Industrial Fire & Explosion Response',
    score: 91,
    issueDate: '2026-09-15',
    validUntil: '2027-09-15',
    verificationHash: '0x8f92a1c4e7b309f582d1c902e48a51bc9',
    status: 'VERIFIED',
    competenciesMastered: [
      'Pressurized Fuel Isolation',
      'Class B/C Electrical Extinguisher Matching',
      'PASS Method Tactical Execution',
      'Upwind Evacuation Navigation',
      'Facility Emergency Alarm Protocol'
    ],
    issuer: 'SafeX Industrial Competency Authority'
  },
  {
    id: 'SFX-2026-87302',
    workerName: 'Priya Sharma',
    workerRole: 'Safety Field Inspector',
    department: 'HSE Oversight',
    moduleTitle: 'Hazard Recognition & Site Inspection',
    score: 99,
    issueDate: '2026-08-20',
    validUntil: '2027-08-20',
    verificationHash: '0x3a71b8e90c254d1f8876e9a01d5291fb',
    status: 'VERIFIED',
    competenciesMastered: [
      'Nip-Point Mechanical Guard Inspection',
      'Electrical Insulation Defect Detection',
      'Corrosive Containment Audit',
      'Emergency Route Obstruction Clearance'
    ],
    issuer: 'SafeX Industrial Competency Authority'
  },
  {
    id: 'SFX-2026-76114',
    workerName: 'Sneha Nair',
    workerRole: 'Chemical Process Engineer',
    department: 'Polymers Division',
    moduleTitle: 'Chemical PPE Matrix & Containment',
    score: 95,
    issueDate: '2026-09-01',
    validUntil: '2027-09-01',
    verificationHash: '0x5c41e2a90184b8d77e49f2b10a9921e4',
    status: 'VERIFIED',
    competenciesMastered: [
      'Aramid Heat Shielding Selection',
      'Viton Chemical Resistant Glove Specs',
      'Full-Face SCBA Positive Pressure Seal'
    ],
    issuer: 'SafeX Industrial Competency Authority'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'n1',
    type: 'warning',
    title: '12 Certifications Expire Soon',
    message: '12 workers in Sector 4 Methane Division require re-certification within 30 days.',
    timestamp: '15m ago',
    read: false,
    linkUrl: '/admin/certifications'
  },
  {
    id: 'n2',
    type: 'alert',
    title: 'Critical Gap Detected in Rig 3',
    message: 'Rahul Das recorded 3 critical mistakes during Pressurized Gas Evacuation simulation.',
    timestamp: '1h ago',
    read: false,
    linkUrl: '/admin/analytics'
  },
  {
    id: 'n3',
    type: 'success',
    title: 'New Certificate Issued',
    message: 'Aarav Kumar successfully achieved 91% score in Fire & Explosion Response.',
    timestamp: '2h ago',
    read: true,
    linkUrl: '/certificates'
  },
  {
    id: 'n4',
    type: 'info',
    title: 'Offline Sync Completed',
    message: '4 training simulation packages synced to local encrypted storage.',
    timestamp: '4h ago',
    read: true
  }
];

export const mockDetectedHazards: DetectedHazard[] = [
  {
    id: 'dh1',
    title: 'Pressurized Gas Line Redline',
    type: 'gas',
    severity: 'CRITICAL',
    confidence: 98.4,
    locationLabel: 'Methane Line #4 B-Valve',
    remediation: 'Isolate main valve via remote trip before approaching corridor',
    x: 48,
    y: 35
  },
  {
    id: 'dh2',
    title: 'Exposed High-Voltage Cable',
    type: 'electrical',
    severity: 'HIGH',
    confidence: 94.2,
    locationLabel: 'Switchgear Busbar 415V',
    remediation: 'Apply LOTO Lock pad and test with calibrated multi-meter',
    x: 22,
    y: 58
  },
  {
    id: 'dh3',
    title: 'Blocked Emergency Exit Door',
    type: 'exit',
    severity: 'MEDIUM',
    confidence: 96.8,
    locationLabel: 'North Escape Passage Door 2',
    remediation: 'Clear pallet obstructions immediately & flag aisle safety officer',
    x: 76,
    y: 42
  }
];

export const mockAnalyticsData = {
  competencyTrend: [
    { month: 'May', score: 74, completions: 340 },
    { month: 'Jun', score: 78, completions: 480 },
    { month: 'Jul', score: 81, completions: 620 },
    { month: 'Aug', score: 84, completions: 890 },
    { month: 'Sep', score: 87, completions: 1248 },
  ],
  departmentScores: [
    { department: 'Methane Proc.', score: 89, passRate: 92 },
    { department: 'Drilling Ops', score: 72, passRate: 76 },
    { department: 'HSE Oversight', score: 96, passRate: 99 },
    { department: 'Polymers', score: 88, passRate: 91 },
    { department: 'Logistics', score: 76, passRate: 82 },
  ],
  commonErrors: [
    { errorName: 'Incorrect evacuation sequence', percentage: 34 },
    { errorName: 'Wrong extinguisher selection', percentage: 21 },
    { errorName: 'Delayed alarm pull activation', percentage: 18 },
    { errorName: 'Missing SCBA seal verification', percentage: 15 },
    { errorName: 'LOTO Lock missing physical tag', percentage: 12 },
  ]
};
