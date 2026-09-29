import React from 'react';
import { CertificateItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, CheckCircle2, QrCode, Download, ExternalLink, Share2, Award } from 'lucide-react';

export const CertificateCard: React.FC<{ cert: CertificateItem }> = ({ cert }) => {
  const { navigateTo } = useApp();

  return (
    <div className="bg-white rounded-3xl border-2 border-stone-200 shadow-2xl p-6 sm:p-8 space-y-6 max-w-2xl mx-auto relative overflow-hidden">
      
      {/* Background Subtle Watermark */}
      <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none">
        <ShieldAlert className="w-64 h-64 text-stone-900" />
      </div>

      {/* Top Header Badge */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-stone-900 text-emerald-400 flex items-center justify-center font-bold text-2xl shadow-md">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-stone-900 tracking-tight">SAFEX INDUSTRIAL COMPETENCY AUTHORITY</h3>
            <p className="text-[11px] text-stone-500 font-mono">Verifiable Practical Safety Standard</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-mono text-xs font-bold flex items-center gap-1 border border-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" /> VERIFIED
        </span>
      </div>

      {/* Certificate Body */}
      <div className="text-center space-y-3 py-2">
        <p className="text-xs text-stone-400 font-mono uppercase tracking-widest">This certifies that</p>
        <h2 className="text-3xl font-black text-stone-900 tracking-tight">{cert.workerName}</h2>
        <p className="text-xs text-stone-500 font-semibold">{cert.workerRole} — {cert.department}</p>
        
        <div className="pt-2">
          <p className="text-xs text-stone-400 font-mono uppercase tracking-widest">has achieved practical competency in</p>
          <p className="text-xl font-extrabold text-emerald-800 mt-1">{cert.moduleTitle}</p>
        </div>
      </div>

      {/* Competencies Mastered Pills */}
      <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
        <p className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">Mastered Competencies:</p>
        <div className="flex flex-wrap gap-1.5">
          {cert.competenciesMastered.map((c, i) => (
            <span key={i} className="text-[11px] bg-white text-stone-800 font-medium px-2.5 py-1 rounded-lg border border-stone-200 shadow-2xs">
              ✓ {c}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Credentials & Simulated QR Code */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-200 text-xs">
        <div>
          <span className="text-stone-400 font-mono block text-[10px]">SCORE ATTENTIVENESS</span>
          <span className="text-lg font-black text-stone-900 font-mono">{cert.score}%</span>
        </div>

        <div>
          <span className="text-stone-400 font-mono block text-[10px]">ISSUED DATE</span>
          <span className="font-bold text-stone-800">{cert.issueDate}</span>
          <span className="text-[10px] text-stone-400 block">Valid until {cert.validUntil}</span>
        </div>

        {/* QR Code Container */}
        <div className="flex items-center gap-3 bg-stone-900 text-white p-2.5 rounded-2xl">
          <div className="w-12 h-12 bg-white p-1 rounded-lg shrink-0 flex items-center justify-center text-stone-950">
            <QrCode className="w-10 h-10" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] text-emerald-400 font-mono block truncate">{cert.id}</span>
            <button
              onClick={() => navigateTo(`/verify/${cert.id}`)}
              className="mt-1 text-[10px] font-bold text-white hover:text-emerald-300 underline flex items-center gap-1"
            >
              Verify Online <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={() => alert(`Certificate ${cert.id} saved as PDF!`)}
          className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all flex items-center gap-1.5"
        >
          <Download className="w-4 h-4" /> Download PDF
        </button>

        <button
          onClick={() => navigateTo(`/verify/${cert.id}`)}
          className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
        >
          Verify Certificate Page
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
