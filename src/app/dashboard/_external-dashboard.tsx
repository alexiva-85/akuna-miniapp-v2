'use client';

import React, { useEffect } from 'react';
import PilotApp from '@design/App';

export default function DashboardWrapper() {
  useEffect(() => {
    // Initialize Telegram WebApp
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
    }
  }, []);

  return <PilotApp />;
}
