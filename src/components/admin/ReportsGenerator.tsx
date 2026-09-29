import React, { useState } from 'react';
import { FileText, Download, CheckCircle2, FileSpreadsheet, ShieldAlert, Sparkles } from 'lucide-react';

export const ReportsGenerator: React.FC = () => {
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const triggerDownload = (reportName: string, ext: string) => {
    setDownloadToast(`Generating ${reportName}.${ext}...`);
    setTimeout(() => {
      setDownloadToast(`✓ ${reportName}.${ext} downloaded successfully!`);
      setTimeout(() => setDownloadToast(null), 3000);
    }, 1000);
  };

  const reports = [
    { name: 'Regulatory HSE Compliance Audit', desc: 'Complete breakdown of plant workers, certifications, and government safety compliance status.', format: 'PDF', type: 'compliance' },
    { name: 'Competency Gap & Risk Analysis', desc: 'Identifies critical procedural mistakes in Methane Gas & Electrical High Voltage sectors.', format: 'CSV', type: 'gap' },
    { name: 'Monthly Simulation Training Summary', desc: 'Aggregated pass rates, average response times, and scenario completion numbers.', format: 'PDF', type: 'summary' },
    { name: 'Active Certifications Directory', desc: 'List of all 1,034 active certificates with QR verification hashes & expiration dates.', format: 'CSV', type: 'cert' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Toast Alert */}
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500 font-mono text-xs flex items-center gap-2 animate-in slide-in-from-bottom">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          {downloadToast}
        </div>
      )}

      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xl space-y-6">
        <div>
          <h3 className="text-lg font-extrabold text-stone-900">Safety & Compliance Report Generator</h3>
          <p className="text-xs text-stone-500">Export official audit documentation for government inspectors & internal HSE officers.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reports.map((r, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-stone-400 transition-all flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold bg-stone-200 text-stone-800 px-2 py-0.5 rounded uppercase">
                    {r.format} REPORT
                  </span>
                  <FileText className="w-5 h-5 text-emerald-600" />
                </div>
                <h4 className="font-extrabold text-stone-900 text-sm mt-2">{r.name}</h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">{r.desc}</p>
              </div>

              <button
                onClick={() => triggerDownload(r.name.replace(/\s+/g, '_'), r.format.toLowerCase())}
                className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> Download {r.format}
              </button>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
