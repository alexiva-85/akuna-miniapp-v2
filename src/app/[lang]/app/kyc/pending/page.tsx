'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { apiJson, withAuth } from '@/lib/apiClient';
import { useAuth } from '@/contexts/AuthContext';

export default function KYCPendingPage() {
  const t = useTranslations('kyc');
  const tCommon = useTranslations('common');
  const { sessionToken, isAuthenticated } = useAuth();
  const router = useRouter();
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCheckStatus = async () => {
    if (!isAuthenticated || !sessionToken) {
      toast.error('Please authenticate first');
      return;
    }

    try {
      // Check KYC status via API with bearer token
      const init = withAuth({ method: 'GET' }, sessionToken);
      const response = await apiJson<{ status: string }>('/api/kyc/status', init);
      
      switch (response.status) {
        case 'approved':
          toast.success(t('verificationApproved'));
          setTimeout(() => {
            router.push('/ru/app/dashboard');
          }, 2000);
          break;
        case 'rejected':
          toast.error(t('verificationRejected'));
          setTimeout(() => {
            router.push('/ru/app/kyc/rejected');
          }, 2000);
          break;
        default:
          toast.info(t('stillPending'));
      }
    } catch (error) {
      toast.error(t('statusCheckError'));
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-yellow-500/10">
              <Clock className="h-12 w-12 text-yellow-500 animate-pulse" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-yellow-500">{t('pendingTitle')}</h1>
          <p className="text-muted-foreground">{t('pendingDescription')}</p>
        </div>

        {/* Status Card */}
        <Card className="border-yellow-500/20 bg-yellow-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-500">
              <Clock className="h-5 w-5" />
              {t('verificationInProgress')}
            </CardTitle>
            <CardDescription>{t('verificationInProgressDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t('status')}</span>
              <Badge className="bg-yellow-500 text-yellow-900">
                {t('statusPending')}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Progress Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              {t('whatHappensNext')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-green-500/10">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-sm">
                  <p className="font-medium">{t('step1')}</p>
                  <p className="text-muted-foreground">{t('step1Description')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-yellow-500/10">
                  <Clock className="h-4 w-4 text-yellow-500" />
                </div>
                <div className="text-sm">
                  <p className="font-medium">{t('step2')}</p>
                  <p className="text-muted-foreground">{t('step2Description')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-muted">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-sm">
                  <p className="font-medium">{t('step3')}</p>
                  <p className="text-muted-foreground">{t('step3Description')}</p>
                </div>
              </div>
            </div>

            {/* Timer */}
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">{t('timeElapsed')}</p>
              <p className="text-2xl font-bold text-primary">{formatTime(timeElapsed)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full h-12 text-lg font-semibold"
            onClick={handleCheckStatus}
          >
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              {t('checkStatus')}
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => router.push('/ru/app/dashboard')}
          >
            {tCommon('back')} {t('toDashboard')}
          </Button>
        </div>

        {/* Support Info */}
        <Card className="bg-muted/30">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">{t('supportInfo')}</p>
              <p className="text-xs text-muted-foreground">{t('supportDescription')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

