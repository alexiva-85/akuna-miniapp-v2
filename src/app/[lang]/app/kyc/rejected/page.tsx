'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, XCircle, RefreshCw, MessageCircle, FileText, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function KYCRejectedPage() {
  const t = useTranslations('kyc');
  const tCommon = useTranslations('common');
  const router = useRouter();

  const handleRetryKYC = () => {
    router.push('/ru/app/kyc/start');
  };

  const handleContactSupport = () => {
    // Open support chat or email
    window.open('https://t.me/akuna_support', '_blank');
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-red-500/10">
              <XCircle className="h-12 w-12 text-red-500" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-red-500">{t('rejectedTitle')}</h1>
          <p className="text-muted-foreground">{t('rejectedDescription')}</p>
        </div>

        {/* Status Card */}
        <Card className="border-red-500/20 bg-red-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-500">
              <AlertCircle className="h-5 w-5" />
              {t('verificationFailed')}
            </CardTitle>
            <CardDescription>{t('rejectedReason')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t('status')}</span>
              <Badge variant="destructive" className="bg-red-500">
                {t('statusRejected')}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Rejection Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              {t('rejectionDetails')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm space-y-2">
                  <p className="font-medium">{t('commonReasons')}</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>{t('reason1')}</li>
                    <li>{t('reason2')}</li>
                    <li>{t('reason3')}</li>
                    <li>{t('reason4')}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm space-y-1">
                  <p className="font-medium text-blue-500">{t('nextSteps')}</p>
                  <p>{t('nextStepsDescription')}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full h-12 text-lg font-semibold"
            onClick={handleRetryKYC}
          >
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              {t('retryVerification')}
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleContactSupport}
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              {t('contactSupport')}
            </div>
          </Button>

          <Button 
            variant="ghost" 
            className="w-full"
            onClick={() => router.push('/ru/app/dashboard')}
          >
            {tCommon('back')} {t('toDashboard')}
          </Button>
        </div>

        {/* Support Links */}
        <Card className="bg-muted/30">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">{t('needHelp')}</p>
              <div className="flex justify-center gap-4">
                <Link 
                  href="/en/terms" 
                  className="text-xs text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('terms')}
                </Link>
                <Link 
                  href="/en/privacy" 
                  className="text-xs text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('privacy')}
                </Link>
                <Link 
                  href="/en/security#kyc-policy" 
                  className="text-xs text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('kycPolicy')}
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
