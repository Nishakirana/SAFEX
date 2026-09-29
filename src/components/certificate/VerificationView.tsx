import React from 'react';
import { useApp } from '../../context/AppContext';
import { mockCertificates } from '../../data/mockData';
import { CheckCircle2, ShieldCheck, QrCode, ArrowLeft, Lock, Award, Calendar, Hash } from 'lucide-react';

export const VerificationView: React.FC<{ certId?: string }> = ({ certId = 'SFX-2026-98421' }) => {
  const { navigateTo } = useApp();

  const cert = mockCertificates.find(c => c.id === certId) || mockCertificates[0];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      <button
        onClick={() => navigateTo('/certificates')}
        className="text-xs font-bold text-stone-600 hover:text-stone-900 flex items-center gap-1.5"
      >
        <ArrowLeft className="w-4 h-4" /> Back to My Certificates
      </button>

      {/* Public SafeX Verification Header */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 border-2 border-emerald-500 shadow-2xl space-y-6 relative overflow-hidden">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-stone-950 flex items-center justify-center font-bold text-2xl shadow-lg">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">SafeX Public Verification</h2>
              <p className="text-xs text-stone-400 font-mono">Blockchain Audit Timestamped</p>
            </div>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-emerald-950 text-emerald-300 border border-emerald-700 flex items-center gap-2 text-xs font-black tracking-wide">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ✓ VERIFIED CERTIFICATE
          </div>
        </div>

        {/* Certificate Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="space-y-4">
            <div>
              <span className="text-stone-400 font-mono block text-[10px]">CERTIFICATE ID</span>
              <span className="text-lg font-black text-emerald-400 font-mono">{cert.id}</span>
            </div>

            <div>
              <span className="text-stone-400 font-mono block text-[10px]">CERTIFIED WORKER</span>
              <span className="text-base font-bold text-white">{cert.workerName}</span>
              <span className="text-stone-400 block">{cert.workerRole}</span>
              <span className="text-stone-400 block">{cert.department}</span>
            </div>

            <div>
              <span className="text-stone-400 font-mono block text-[10px]">PRACTICAL MODULE</span>
              <span className="text-sm font-bold text-emerald-300">{cert.moduleTitle}</span>
            </div>
          </div>

          <div className="space-y-4 sm:border-l sm:border-stone-800 sm:pl-6">
            <div>
              <span className="text-stone-400 font-mono block text-[10px]">COMPETENCY EVALUATION SCORE</span>
              <span className="text-3xl font-black text-emerald-400 font-mono">{cert.score}%</span>
            </div>

            <div>
              <span className="text-stone-400 font-mono block text-[10px]">ISSUE & EXPIRATION DATES</span>
              <span className="text-white font-bold block">Issued: {cert.issueDate}</span>
              <span className="text-stone-400 block">Valid Until: {cert.validUntil}</span>
            </div>

            <div>
              <span className="text-stone-400 font-mono block text-[10px]">CRYPTOGRAPHIC VERIFICATION HASH</span>
              <span className="text-[10px] text-stone-300 font-mono bg-stone-950 p-2 rounded-lg block border border-stone-800 truncate">
                {cert.verificationHash}
              </span>
            </div>
          </div>
        </div>

        {/* Verified Competencies */}
        <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-2">
          <p className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
            Verified Competencies Attained:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
            {cert.competenciesMastered.map((c, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Issuer Footer */}
        <div className="text-center text-[11px] text-stone-400 border-t border-stone-800 pt-4 font-mono">
          Issued by: <strong className="text-white">{cert.issuer}</strong>
        </div>

      </div>

    </div>
  );
};
