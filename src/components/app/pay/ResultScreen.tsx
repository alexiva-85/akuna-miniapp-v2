'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, ArrowLeft } from 'lucide-react';

interface ResultScreenProps {
  status: 'success' | 'pending' | 'failed';
  amount?: string;
  recipient?: string;
  transactionId?: string;
  onGoHome?: () => void;
  onRetry?: () => void;
}

export default function ResultScreen({
  status,
  amount = '100.00',
  recipient = 'John Doe',
  transactionId = 'TXN123456789',
  onGoHome,
  onRetry
}: ResultScreenProps) {
  const t = useTranslations('payment');
  const tCommon = useTranslations('common');

  const getStatusConfig = () => {
    switch (status) {
      case 'success':
        return {
          icon: <CheckCircle className="h-16 w-16 text-green-500" />,
          badge: <Badge className="bg-green-500">Success</Badge>,
          title: t('submit.success'),
          description: t('successDescription'),
          color: 'text-green-500'
        };
      case 'pending':
        return {
          icon: <Clock className="h-16 w-16 text-yellow-500" />,
          badge: <Badge className="bg-yellow-500">Pending</Badge>,
          title: t('submit.pending'),
          description: t('pendingDescription'),
          color: 'text-yellow-500'
        };
      case 'failed':
        return {
          icon: <XCircle className="h-16 w-16 text-red-500" />,
          badge: <Badge variant="destructive">Failed</Badge>,
          title: t('submit.failed'),
          description: t('failedDescription'),
          color: 'text-red-500'
        };
      default:
        return {
          icon: <CheckCircle className="h-16 w-16 text-green-500" />,
          badge: <Badge className="bg-green-500">Success</Badge>,
          title: t('submit.success'),
          description: t('successDescription'),
          color: 'text-green-500'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {config.icon}
            </div>
            <CardTitle className={config.color}>
              {config.title}
            </CardTitle>
            <CardDescription>
              {config.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                {config.badge}
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="text-sm font-medium">{amount} THB</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Recipient</span>
                <span className="text-sm font-medium">{recipient}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Transaction ID</span>
                <span className="text-sm font-mono text-muted-foreground">{transactionId}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Button 
                className="w-full"
                onClick={onGoHome}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {tCommon('home')}
              </Button>
              
              {status === 'failed' && onRetry && (
                <Button variant="outline" className="w-full" onClick={onRetry}>
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
