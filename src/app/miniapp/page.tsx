'use client';

import { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic';
// Force cache clear - Tue Oct 14 20:04:00 +07 2025

export default function MiniAppPage() {
  const [isTelegram, setIsTelegram] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeTelegram = () => {
      if (typeof window === 'undefined') {
        setIsTelegram(true); // Показываем дизайн даже на сервере
        setIsLoading(false);
        return;
      }

      // Всегда показываем дизайн для тестирования
      try {
        if (window.Telegram?.WebApp) {
          const tg = window.Telegram.WebApp;
          tg.ready();
          tg.expand();
          console.log('Telegram WebApp detected:', tg);
        }
        setIsTelegram(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing Telegram WebApp:', error);
        setIsTelegram(true); // Показываем дизайн даже при ошибке
        setIsLoading(false);
      }
    };

    const timer = setTimeout(initializeTelegram, 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Mini-App...</p>
        </div>
      </div>
    );
  }

  // Временно убираем fallback для тестирования дизайна
  // if (!isTelegram) {
  //   return (
  //     <div className="min-h-screen bg-white flex items-center justify-center p-4">
  //       <div className="max-w-md w-full text-center">
  //         <div className="mb-6">
  //           <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
  //             <span className="text-2xl">🚀</span>
  //           </div>
  //           <h1 className="text-2xl font-bold text-gray-900 mb-2">Akuna Pay Mini-App</h1>
  //           <p className="text-gray-600">
  //             This Mini-App is designed to work within Telegram. 
  //             Please open it through the @AkunaPay_Bot bot.
  //           </p>
  //         </div>
  //         <div className="bg-gray-50 border rounded-lg p-4">
  //           <p className="text-sm text-gray-600">
  //             To use this Mini-App, open Telegram and search for @AkunaPay_Bot, 
  //             then tap "Open App" to launch the Mini-App.
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Akuna Pay</h1>
            <p className="text-sm text-gray-600">Mini-App Dashboard</p>
          </div>
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-sm">👤</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🇹🇭</span>
            <span className="font-medium text-gray-900">THB Account</span>
          </div>
          
          <div className="mb-6">
            <div className="text-3xl font-bold text-gray-900 mb-1">฿52,814.17</div>
            <div className="text-sm text-gray-600">~$1,660.03</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="bg-blue-500 text-white h-12 rounded-xl font-medium hover:bg-blue-600 transition-colors">
              Deposit
            </button>
            <button className="bg-gray-100 text-gray-700 h-12 rounded-xl font-medium hover:bg-gray-200 transition-colors">
              Withdraw
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="bg-white border rounded-xl p-4 text-center hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">💳</span>
            </div>
            <div className="font-medium text-gray-900">Pay</div>
          </button>
          
          <button className="bg-white border rounded-xl p-4 text-center hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">📱</span>
            </div>
            <div className="font-medium text-gray-900">QR Pay</div>
          </button>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600">↓</span>
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">+2,000฿</div>
                <div className="text-sm text-gray-600">Yesterday, 14:02</div>
              </div>
              <div className="text-sm text-gray-600">~$61</div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600">↑</span>
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">-1,800฿</div>
                <div className="text-sm text-gray-600">12.09.2025, 14:23</div>
              </div>
              <div className="text-sm text-gray-600">~$56</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
