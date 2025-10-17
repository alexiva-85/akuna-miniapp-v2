'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, XCircle, ArrowRight, RefreshCw } from 'lucide-react';

interface KycBannerProps {
  status: 'pending' | 'approved' | 'rejected' | 'not_started';
  onStartKyc?: () => void;
  onRetryKyc?: () => void;
}

export default function KycBanner({ status, onStartKyc, onRetryKyc }: KycBannerProps) {
  const t = useTranslations('kyc');
  const tCommon = useTranslations('common');

  const getStatusConfig = () => {
    switch (status) {
      case 'approved':
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          badge: <Badge className="bg-green-500">{t('verified')}</Badge>,
          title: t('kycVerified'),
          description: t('identityVerified'),
          showAction: false
        };
      case 'pending':
        return {
          icon: <Clock className="h-5 w-5 text-yellow-500" />,
          badge: <Badge className="bg-yellow-500">{t('pending')}</Badge>,
          title: t('pendingTitle'),
          description: t('pendingDescription'),
          showAction: false
        };
      case 'rejected':
        return {
          icon: <XCircle className="h-5 w-5 text-red-500" />,
          badge: <Badge variant="destructive">{t('statusRejected')}</Badge>,
          title: t('rejectedTitle'),
          description: t('rejectedDescription'),
          showAction: true,
          actionButton: (
            <Button size="sm" onClick={onRetryKyc} className="mt-2">
              <RefreshCw className="h-4 w-4 mr-2" />
              {tCommon('tryAgain')}
            </Button>
          )
        };
      case 'not_started':
      default:
        return {
          icon: <Clock className="h-5 w-5 text-muted-foreground" />,
          badge: <Badge variant="outline">{t('statusNotStarted')}</Badge>,
          title: t('startTitle'),
          description: t('startDescription'),
          showAction: true,
          actionButton: (
            <Button size="sm" onClick={onStartKyc} className="mt-2">
              {t('startButton')}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Card className="border-l-4 border-primary">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {config.icon}
            {config.title}
          </CardTitle>
          {config.badge}
        </div>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>
      {config.showAction && (
        <CardContent>
          {config.actionButton}
        </CardContent>
      )}
    </Card>
  );
}