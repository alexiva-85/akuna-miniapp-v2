// TODO: This component is deprecated. 
// The external dashboard is now used via app/dashboard/_external-dashboard.tsx
// This file is kept for reference but should not be used in pages.

import React from 'react';

export default function DashboardFromPilot() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Dashboard Component Deprecated</h1>
        <p className="text-muted-foreground">
          This component has been replaced with the external design system.
        </p>
      </div>
    </div>
  );
}