import React from 'react';
import { CertTracker } from '../components/CertTracker';

export function CertsPage() {
  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 dark:text-gray-100">Certifications</h1>
        <p className="text-sm text-gray-400 mt-1">Track your certification journey — Security+ through CISSP and beyond</p>
      </div>
      <CertTracker />
    </div>
  );
}
