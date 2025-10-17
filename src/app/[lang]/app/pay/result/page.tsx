'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function PayResultPage() {
  const t = useTranslations('payment');
  const tCommon = useTranslations('common');
  const searchParams = useSearchParams();
  const status = searchParams.get('status') || 'success';

  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-12 w-12 text-green-500" />;
      case 'pending':
        return <Clock className="h-12 w-12 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-12 w-12 text-red-500" />;
      default:
        return <CheckCircle className="h-12 w-12 text-green-500" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'success':
        return t('submit.success');
      case 'pending':
        return t('submit.pending');
      case 'failed':
        return t('submit.failed');
      default:
        return t('submit.success');
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-500">Success</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge className="bg-green-500">Success</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {getStatusIcon()}
            </div>
            <CardTitle>{getStatusText()}</CardTitle>
            <CardDescription>
              {status === 'success' && t('successDescription')}
              {status === 'pending' && t('pendingDescription')}
              {status === 'failed' && t('failedDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                {getStatusBadge()}
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="text-sm font-medium">100.00 THB</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Recipient</span>
                <span className="text-sm font-medium">John Doe</span>
              </div>
            </div>

            <div className="space-y-2">
              <Button 
                className="w-full"
                onClick={() => {
                  // Navigate back to dashboard
                  window.location.href = '/ru/app/dashboard';
                }}
              >
                {tCommon('home')}
              </Button>
              
              {status === 'failed' && (
                <Button variant="outline" className="w-full">
                  {tCommon('tryAgain')}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
