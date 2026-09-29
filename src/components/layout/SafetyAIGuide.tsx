import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, X, Send, Bot, ShieldCheck, Flame, Radio, Wrench, AlertTriangle } from 'lucide-react';

export const SafetyAIGuide: React.FC = () => {
  const { aiGuideOpen, setAiGuideOpen, navigateTo } = useApp();
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; action?: { label: string; route: string } }>>([
    {
      sender: 'ai',
      text: "Hello Aarav! I'm SafeX Guide. What safety protocol or simulation standard would you like to review today?",
    }
  ]);
  const [input, setInput] = useState('');

  if (!aiGuideOpen) return null;

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;
    
    const newMsgs = [...messages, { sender: 'user' as const, text: userText }];
    setMessages(newMsgs);
    setInput('');

    // Generate contextual response based on prompt
    setTimeout(() => {
      let reply = "Always prioritize alarm activation and fuel isolation before approaching any industrial hazard.";
      let actionObj: { label: string; route: string } | undefined = undefined;

      const lower = userText.toLowerCase();
      if (lower.includes('fire') || lower.includes('explosion')) {
        reply = "For methane gas fires: 1) Sound manual station alarm. 2) Trigger remote isolation valve outside blast zone. 3) Select CO2 (Class B/C) extinguisher for electrical panels. Never spray water on high-pressure methane!";
        actionObj = { label: 'Start Fire & Explosion Sim', route: '/simulations/fire' };
      } else if (lower.includes('gas') || lower.includes('confined')) {
        reply = "Before confined space entry: Verify atmosphere oxygen (19.5%–23.5%), test H2S levels (< 10 ppm), establish SCBA positive seal, and sign entry permit with buddy system.";
        actionObj = { label: 'Start Gas & Confined Space Sim', route: '/simulations/gas' };
      } else if (lower.includes('ppe') || lower.includes('gear')) {
        reply = "Corrosive chemical areas require: Viton rubber gloves, full-face visor, neoprene boots, and splash apron. Helmet chin strap must be secured to 20kg tension spec.";
        actionObj = { label: 'Open PPE Selector Sim', route: '/simulations/ppe' };
      } else if (lower.includes('machinery') || lower.includes('loto')) {
        reply = "LOTO Rule: Zero Energy State verification. Apply physical lockout pad, attach personal identification tag, bleed residual hydraulic pressure, and test start button before maintenance.";
        actionObj = { label: 'Open Machinery Safety Sim', route: '/simulations/machinery' };
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply, action: actionObj }]);
    }, 600);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-2xl border-l border-stone-200 flex flex-col animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">SafeX Guide AI</h3>
            <p className="text-[11px] text-emerald-400 font-mono">Contextual Safety Assistant</p>
          </div>
        </div>
        <button 
          onClick={() => setAiGuideOpen(false)}
          className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Suggested Topics Pills */}
      <div className="p-3 bg-stone-50 border-b border-stone-200 flex gap-2 overflow-x-auto text-xs font-medium">
        <button 
          onClick={() => handleSend("Tell me about Fire Safety")}
          className="px-2.5 py-1 rounded-full bg-white border border-stone-200 text-stone-700 hover:border-emerald-500 hover:text-emerald-700 shrink-0 flex items-center gap-1"
        >
          <Flame className="w-3.5 h-3.5 text-amber-600" /> Fire Rules
        </button>
        <button 
          onClick={() => handleSend("Confined space gas procedures")}
          className="px-2.5 py-1 rounded-full bg-white border border-stone-200 text-stone-700 hover:border-emerald-500 hover:text-emerald-700 shrink-0 flex items-center gap-1"
        >
          <Radio className="w-3.5 h-3.5 text-blue-600" /> Gas Leak
        </button>
        <button 
          onClick={() => handleSend("How to select PPE?")}
          className="px-2.5 py-1 rounded-full bg-white border border-stone-200 text-stone-700 hover:border-emerald-500 hover:text-emerald-700 shrink-0 flex items-center gap-1"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> PPE Spec
        </button>
        <button 
          onClick={() => handleSend("LOTO procedure steps")}
          className="px-2.5 py-1 rounded-full bg-white border border-stone-200 text-stone-700 hover:border-emerald-500 hover:text-emerald-700 shrink-0 flex items-center gap-1"
        >
          <Wrench className="w-3.5 h-3.5 text-stone-600" /> LOTO
        </button>
      </div>

      {/* Message History */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF9F5]">
        {messages.map((m, idx) => (
          <div 
            key={idx} 
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div 
              className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                m.sender === 'user' 
                  ? 'bg-stone-900 text-white rounded-br-none shadow-sm' 
                  : 'bg-white border border-stone-200 text-stone-800 rounded-bl-none shadow-sm'
              }`}
            >
              {m.text}
            </div>

            {m.action && (
              <button
                onClick={() => {
                  navigateTo(m.action!.route);
                  setAiGuideOpen(false);
                }}
                className="mt-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                {m.action.label}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
          placeholder="Ask SafeX Guide about hazards or rules..."
          className="flex-1 text-xs bg-stone-100 border border-stone-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button 
          onClick={() => handleSend(input)}
          className="p-2.5 rounded-xl bg-stone-900 hover:bg-emerald-600 text-white transition-all shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
