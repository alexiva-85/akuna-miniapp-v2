import React from 'react';

interface MobileLayoutProps {
  children: React.ReactNode;
  showClose?: boolean;
}

export function MobileLayout({ children, showClose = false }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Akuna Pay</h1>
            <p className="text-sm text-muted-foreground">Mini-App Dashboard</p>
          </div>
          {showClose && (
            <button className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <span className="text-sm">✕</span>
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
