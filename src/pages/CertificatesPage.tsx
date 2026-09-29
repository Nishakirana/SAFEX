import React from 'react';
import { mockCertificates } from '../data/mockData';
import { CertificateCard } from '../components/certificate/CertificateCard';

export const CertificatesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      <div>
        <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest">
          VERIFIABLE CREDENTIALS
        </span>
        <h1 className="text-3xl font-black text-stone-900">My Earned Certificates</h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Official industrial practical competency certificates backed by SafeX cryptographic audit logs.
        </p>
      </div>

      <div className="space-y-8">
        {mockCertificates.map((cert) => (
          <CertificateCard key={cert.id} cert={cert} />
        ))}
      </div>
    </div>
  );
};
