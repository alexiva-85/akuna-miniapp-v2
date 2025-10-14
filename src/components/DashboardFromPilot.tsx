'use client';

import { useEffect } from 'react';

export default function DashboardFromPilot() {
  useEffect(() => {
    // Инициализация Telegram WebApp
    if (typeof window !== 'undefined') {
      try {
        if (window.Telegram?.WebApp) {
          const tg = window.Telegram.WebApp;
          tg.ready();
          tg.expand();
          console.log('Telegram WebApp detected:', tg);
        }
      } catch (error) {
        console.error('Error initializing Telegram WebApp:', error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        {/* User Info */}
        <div className="bg-card rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">👤</span>
            </div>
            <div>
              <div className="text-base font-semibold">Alivia de Franz</div>
              <div className="text-sm text-muted-foreground">Lite Account</div>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-card rounded-2xl p-6 mb-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🇹🇭</span>
            <span className="text-base font-medium">THB Account</span>
          </div>
          
          <div className="mb-6">
            <div className="text-4xl font-bold mb-1">฿52 814,17</div>
            <div className="text-sm text-muted-foreground">~$1 660,03</div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 h-12 bg-primary text-primary-foreground rounded-xl">
              ↓ Deposit
            </button>
            <button className="flex-1 h-12 border border-border rounded-xl">
              ↑ Withdraw
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="h-20 border border-border rounded-xl flex flex-col items-center justify-center gap-2">
            <span className="text-2xl">💳</span>
            <span className="text-sm font-medium">Pay</span>
          </button>
          <button className="h-20 border border-border rounded-xl flex flex-col items-center justify-center gap-2">
            <span className="text-2xl">📱</span>
            <span className="text-sm font-medium">QR Pay</span>
          </button>
        </div>
      </div>
    </div>
  );
}

