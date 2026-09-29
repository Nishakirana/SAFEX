import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Language, UserRole } from '../../types';
import { 
  ShieldAlert, 
  Globe, 
  Wifi, 
  WifiOff, 
  Bell, 
  Sparkles, 
  User, 
  CheckCircle2, 
  Scan, 
  LayoutDashboard, 
  PlayCircle, 
  Award, 
  BarChart3, 
  Users, 
  FileText,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    role, 
    setRole, 
    language, 
    setLanguage, 
    isOffline, 
    setIsOffline, 
    presentationMode, 
    setPresentationMode,
    notifications,
    markNotificationRead,
    t,
    activeRoute,
    navigateTo,
    activeWorker,
    setAiGuideOpen
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  interface NavItem {
    label: string;
    route: string;
    icon?: React.ElementType;
  }

  const workerNav: NavItem[] = [
    { label: t('navHome'), route: '/' },
    { label: t('navSimulations'), route: '/simulations' },
    { label: t('navScan'), route: '/scan', icon: Scan },
    { label: t('navProgress'), route: '/progress' },
    { label: t('navCertificates'), route: '/certificates' },
  ];

  const adminNav: NavItem[] = [
    { label: t('adminOverview'), route: '/admin' },
    { label: t('adminWorkforce'), route: '/admin/workforce' },
    { label: t('adminSimulations'), route: '/simulations' },
    { label: t('adminAnalytics'), route: '/admin/analytics' },
    { label: t('adminCertifications'), route: '/admin/certifications' },
    { label: t('adminReports'), route: '/admin/reports' },
  ];

  const navItems = role === 'admin' ? adminNav : workerNav;

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Logo & Mode Badge */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigateTo('/')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-emerald-400 flex items-center justify-center font-bold text-xl shadow-md group-hover:bg-emerald-700 group-hover:text-white transition-all">
              <ShieldAlert className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-stone-900 font-sans">SafeX</span>
                <span className="text-[10px] font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
                  IMMERSIVE
                </span>
              </div>
              <p className="text-[10px] font-medium text-stone-500 tracking-wide hidden sm:block">Industrial Safety Competency</p>
            </div>
          </button>

          {/* Role Pill Switcher */}
          <div className="hidden lg:flex items-center bg-stone-200/60 p-1 rounded-lg text-xs font-semibold text-stone-600">
            <button
              onClick={() => setRole('worker')}
              className={`px-3 py-1 rounded-md transition-all ${
                role === 'worker' ? 'bg-white text-stone-900 shadow-sm font-bold' : 'hover:text-stone-900'
              }`}
            >
              Trainee
            </button>
            <button
              onClick={() => setRole('trainer')}
              className={`px-3 py-1 rounded-md transition-all ${
                role === 'trainer' ? 'bg-white text-stone-900 shadow-sm font-bold' : 'hover:text-stone-900'
              }`}
            >
              Trainer
            </button>
            <button
              onClick={() => { setRole('admin'); navigateTo('/admin'); }}
              className={`px-3 py-1 rounded-md transition-all ${
                role === 'admin' ? 'bg-white text-stone-900 shadow-sm font-bold' : 'hover:text-stone-900'
              }`}
            >
              Admin / Org
            </button>
          </div>
        </div>

        {/* Middle Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeRoute === item.route;
            const Icon = item.icon;
            return (
              <button
                key={item.route}
                onClick={() => navigateTo(item.route)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                  isActive 
                    ? 'bg-stone-900 text-white font-semibold shadow-sm' 
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                }`}
              >
                {Icon && <Icon className="w-4 h-4 text-emerald-400" />}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Tools & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Presentation Mode Toggle */}
          <button
            onClick={() => setPresentationMode(!presentationMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              presentationMode 
                ? 'bg-amber-500 text-stone-950 shadow-md ring-2 ring-amber-300 animate-pulse-subtle' 
                : 'bg-stone-200/80 hover:bg-stone-300 text-stone-800'
            }`}
            title="Launch Interactive Guided Demo for Presentation"
          >
            <PlayCircle className="w-4 h-4 fill-amber-950 stroke-amber-500" />
            <span className="hidden sm:inline">{t('presentationMode')}</span>
          </button>

          {/* Language Selector */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="appearance-none bg-stone-100 border border-stone-300 text-stone-800 text-xs font-semibold rounded-lg pl-8 pr-6 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="en">EN (English)</option>
              <option value="hi">HI (हिन्दी)</option>
              <option value="sat">SAT (ᱥᱟᱱᱛᱟᱲᱤ)</option>
            </select>
            <Globe className="w-4 h-4 text-stone-500 absolute left-2 top-2 pointer-events-none" />
          </div>

          {/* Offline Toggle */}
          <button
            onClick={() => setIsOffline(prev => !prev)}
            className={`p-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border ${
              isOffline 
                ? 'bg-amber-100 text-amber-900 border-amber-300' 
                : 'bg-emerald-50/80 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            }`}
            title="Simulate offline industrial sync state"
          >
            {isOffline ? <WifiOff className="w-4 h-4 text-amber-700" /> : <Wifi className="w-4 h-4 text-emerald-600" />}
            <span className="hidden xl:inline text-[11px] font-bold">{isOffline ? t('offlineMode') : t('onlineMode')}</span>
          </button>

          {/* Safety AI Assistant Guide Trigger */}
          <button
            onClick={() => setAiGuideOpen(true)}
            className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-sm flex items-center gap-1"
            title="Open SafeX AI Guide"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg bg-stone-200/60 hover:bg-stone-300/80 text-stone-700 transition-all relative focus:outline-none"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-stone-200 z-50 p-4 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <h4 className="font-bold text-sm text-stone-900">Safety Notifications</h4>
                  <span className="text-xs text-emerald-700 font-semibold">{unreadCount} unread</span>
                </div>
                <div className="mt-2 space-y-2 max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <div 
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.linkUrl) navigateTo(n.linkUrl);
                        setShowNotifications(false);
                      }}
                      className={`p-3 rounded-lg text-xs cursor-pointer transition-all border ${
                        n.read ? 'bg-stone-50 border-stone-100 text-stone-600' : 'bg-amber-50/60 border-amber-200/80 text-stone-900 font-medium'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-bold text-stone-900">{n.title}</span>
                        <span className="text-[10px] text-stone-400">{n.timestamp}</span>
                      </div>
                      <p className="mt-1 text-stone-600 leading-snug">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Quick Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-stone-200/60 transition-all focus:outline-none"
            >
              <img 
                src={activeWorker.avatar} 
                alt={activeWorker.name} 
                className="w-8 h-8 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
              />
              <ChevronDown className="w-3.5 h-3.5 text-stone-500 hidden sm:block" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-stone-200 z-50 p-2 text-xs">
                <div className="p-2 border-b border-stone-100">
                  <p className="font-bold text-stone-900">{activeWorker.name}</p>
                  <p className="text-[11px] text-stone-500">{activeWorker.role}</p>
                  <span className="mt-1 inline-block px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-semibold text-[10px]">
                    Role: {role.toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={() => { navigateTo('/dashboard'); setShowProfileMenu(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-100 text-stone-700 font-medium transition-all"
                >
                  Worker Dashboard
                </button>
                <button
                  onClick={() => { navigateTo('/onboarding'); setShowProfileMenu(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-stone-100 text-stone-700 font-medium transition-all"
                >
                  Onboarding Tour
                </button>
                <button
                  onClick={() => { navigateTo('/login'); setShowProfileMenu(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50 text-rose-700 font-medium transition-all border-t border-stone-100"
                >
                  Switch Role / Login
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
