import React from 'react';
import { VerificationView } from '../components/certificate/VerificationView';

export const VerifyPage: React.FC<{ certId?: string }> = ({ certId }) => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-16">
      <VerificationView certId={certId} />
    </div>
  );
};
