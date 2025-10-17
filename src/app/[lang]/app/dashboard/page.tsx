'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import ActionCards from '../../../../components/app/dashboard/ActionCards';
import KycBanner from '../../../../components/app/dashboard/KycBanner';
import { apiJson, withAuth } from '@/lib/apiClient';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const { sessionToken, isAuthenticated } = useAuth();
  const [kycStatus, setKycStatus] = useState<'pending' | 'approved' | 'rejected' | 'not_started'>('approved');
  const [balance, setBalance] = useState(1500.00);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!isAuthenticated || !sessionToken) {
        toast.error('Please authenticate first');
        setIsLoading(false);
        return;
      }

      try {
        // Fetch user data from API with bearer token
        const init = withAuth({ method: 'GET' }, sessionToken);
        const userData = await apiJson<{ kycStatus: string; balance: number }>('/api/user/dashboard', init);
        setKycStatus(userData.kycStatus as any);
        setBalance(userData.balance);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        toast.error('Failed to load dashboard data');
        // Keep default values on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAuthenticated, sessionToken]);

  const handleStartKyc = () => {
    // Navigate to KYC start page
    window.location.href = '/ru/app/kyc/start';
  };

  const handleRetryKyc = () => {
    // Navigate to KYC start page for retry
    window.location.href = '/ru/app/kyc/start';
  };

  const handleActionClick = (action: string) => {
    switch (action) {
      case 'deposit':
        // Navigate to deposit page (if exists) or show coming soon
        console.log('Navigate to deposit');
        break;
      case 'withdraw':
        // Navigate to withdraw page (if exists) or show coming soon
        console.log('Navigate to withdraw');
        break;
      case 'pay':
        // Navigate to pay page
        window.location.href = '/ru/app/pay';
        break;
      case 'history':
        // Navigate to transaction history (if exists) or show coming soon
        console.log('Navigate to history');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* KYC Banner */}
        <KycBanner 
          status={kycStatus}
          onStartKyc={handleStartKyc}
          onRetryKyc={handleRetryKyc}
        />

        {/* Action Cards */}
        <ActionCards 
          balance={balance}
          currency="THB"
          kycStatus={kycStatus}
          onActionClick={handleActionClick}
        />

        {/* Additional Dashboard Content */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">{t('transactionHistory')}</h2>
          <div className="text-center py-8 text-muted-foreground">
            <p>{t('noTransactions')}</p>
            <p className="text-sm">{t('transactionHistoryPlaceholder')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
