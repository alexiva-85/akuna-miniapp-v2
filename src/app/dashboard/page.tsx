'use client';

import dynamic from 'next/dynamic';

const ExternalDashboard = dynamic(() => import('./_external-dashboard'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default ExternalDashboard;
