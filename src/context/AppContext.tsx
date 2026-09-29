import React, { createContext, useContext, useState } from 'react';
import { UserRole, Language, WorkerProfile, NotificationItem, SimulationResult } from '../types';
import { mockTrainees, mockNotifications } from '../data/mockData';
import { translations } from '../data/translations';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isOffline: boolean;
  setIsOffline: (offline: boolean | ((prev: boolean) => boolean)) => void;
  presentationMode: boolean;
  setPresentationMode: (active: boolean) => void;
  presentationStep: number;
  setPresentationStep: (step: number) => void;
  nextPresentationStep: () => void;
  prevPresentationStep: () => void;
  activeWorker: WorkerProfile;
  setActiveWorker: (worker: WorkerProfile) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  simulationResult: SimulationResult | null;
  setSimulationResult: (res: SimulationResult | null) => void;
  aiGuideOpen: boolean;
  setAiGuideOpen: (open: boolean) => void;
  t: (key: string) => string;
  activeRoute: string;
  navigateTo: (route: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('worker');
  const [language, setLanguage] = useState<Language>('en');
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [presentationMode, setPresentationMode] = useState<boolean>(false);
  const [presentationStep, setPresentationStep] = useState<number>(1);
  const [activeWorker, setActiveWorker] = useState<WorkerProfile>(mockTrainees[0]);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [aiGuideOpen, setAiGuideOpen] = useState<boolean>(false);
  const [activeRoute, setActiveRoute] = useState<string>('/');

  const navigateTo = (route: string) => {
    setActiveRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  const nextPresentationStep = () => {
    if (presentationStep < 12) {
      const nextStep = presentationStep + 1;
      setPresentationStep(nextStep);
      // Route mapping for demo tour steps:
      switch(nextStep) {
        case 1: navigateTo('/'); break;
        case 2: navigateTo('/scan'); break;
        case 3: navigateTo('/simulations'); break;
        case 4: navigateTo('/simulations/fire'); break;
        case 5: navigateTo('/simulations/fire'); break;
        case 6: navigateTo('/simulations/fire'); break;
        case 7: navigateTo('/simulations/results'); break;
        case 8: navigateTo('/retraining'); break;
        case 9: navigateTo('/certificates'); break;
        case 10: navigateTo('/verify/SFX-2026-98421'); break;
        case 11: navigateTo('/admin'); setRole('admin'); break;
        case 12: navigateTo('/admin/analytics'); setRole('admin'); break;
      }
    }
  };

  const prevPresentationStep = () => {
    if (presentationStep > 1) {
      const prevStep = presentationStep - 1;
      setPresentationStep(prevStep);
      switch(prevStep) {
        case 1: navigateTo('/'); break;
        case 2: navigateTo('/scan'); break;
        case 3: navigateTo('/simulations'); break;
        case 4: navigateTo('/simulations/fire'); break;
        case 5: navigateTo('/simulations/fire'); break;
        case 6: navigateTo('/simulations/fire'); break;
        case 7: navigateTo('/simulations/results'); break;
        case 8: navigateTo('/retraining'); break;
        case 9: navigateTo('/certificates'); break;
        case 10: navigateTo('/verify/SFX-2026-98421'); break;
        case 11: navigateTo('/admin'); setRole('admin'); break;
        case 12: navigateTo('/admin/analytics'); setRole('admin'); break;
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        isOffline,
        setIsOffline,
        presentationMode,
        setPresentationMode,
        presentationStep,
        setPresentationStep,
        nextPresentationStep,
        prevPresentationStep,
        activeWorker,
        setActiveWorker,
        notifications,
        markNotificationRead,
        simulationResult,
        setSimulationResult,
        aiGuideOpen,
        setAiGuideOpen,
        t,
        activeRoute,
        navigateTo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
