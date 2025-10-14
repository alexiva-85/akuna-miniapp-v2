'use client';

import { useEffect, useState } from 'react';
import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';

export default function DashboardFromPilot() {
  const [isLoading, setIsLoading] = useState(true);

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
    
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const transactions = [
    { type: 'deposit', amount: '+2 000฿', date: 'Yesterday, 14:02', usd: '~61$', icon: '↓' },
    { type: 'withdraw', amount: '-1 800฿', date: '12.09.2025, 14:23', usd: '~56$', icon: '↑' },
    { type: 'payment', amount: '-1 000฿', date: '10.09.2025, 13:12', usd: '~44$', icon: '📱' },
  ];

  return (
    <MobileLayout showClose={false}>
      <div className="flex-1 flex flex-col px-6 py-4">
        {/* User Info */}
        <div className="flex items-center gap-3 p-4 bg-card rounded-2xl mb-4 cursor-pointer hover:bg-card/80 transition-colors">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">👤</span>
          </div>
          <div className="flex-1">
            <div className="text-base font-semibold text-foreground">Alivia de Franz</div>
            <div className="text-sm text-muted-foreground">Lite Account</div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="p-6 bg-card rounded-2xl mb-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🇹🇭</span>
            <span className="text-base font-medium text-foreground">THB Account</span>
          </div>
          
          <div className="mb-6">
            <div className="text-4xl font-bold text-foreground mb-1">฿52 814,17</div>
            <div className="text-sm text-muted-foreground">~$1 660,03</div>
          </div>

          <div className="flex gap-3">
            <Button 
              className="flex-1 h-12 rounded-xl gap-2"
              onClick={() => console.log('Navigate to deposit')}
            >
              <span>↓</span>
              Deposit
            </Button>
            <Button 
              variant="outline"
              className="flex-1 h-12 rounded-xl gap-2"
              onClick={() => console.log('Navigate to withdraw')}
            >
              <span>↑</span>
              Withdraw
            </Button>
          </div>
        </div>

        {/* Transaction History */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs uppercase text-muted-foreground font-semibold">
            Transaction History
          </h2>
          <button 
            onClick={() => console.log('Navigate to history')}
            className="text-xs text-primary font-semibold hover:underline"
          >
            See All
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {transactions.map((tx, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-4 p-4 bg-card rounded-2xl cursor-pointer hover:bg-card/80 transition-colors"
              onClick={() => console.log('Navigate to transaction detail')}
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <span className="text-sm">{tx.icon}</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground capitalize">
                  {tx.type}
                </div>
                <div className="text-xs text-muted-foreground">{tx.date}</div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-semibold ${tx.amount.startsWith('+') ? 'text-green-500' : 'text-foreground'}`}>
                  {tx.amount}
                </div>
                <div className="text-xs text-muted-foreground">{tx.usd}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline"
            className="h-20 flex flex-col gap-2 rounded-xl"
            onClick={() => console.log('Navigate to pay')}
          >
            <span className="text-2xl">💳</span>
            <span className="text-sm font-medium">Pay</span>
          </Button>
          <Button 
            variant="outline"
            className="h-20 flex flex-col gap-2 rounded-xl"
            onClick={() => console.log('Navigate to QR pay')}
          >
            <span className="text-2xl">📱</span>
            <span className="text-sm font-medium">QR Pay</span>
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
