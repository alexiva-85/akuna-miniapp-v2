'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import Link from 'next/link';
import { Shield, FileText, Lock, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function KYCConsentPage() {
  const t = useTranslations('kyc');
  const tLegal = useTranslations('legal');
  const tCommon = useTranslations('common');
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleStartKYC = () => {
    if (agreed) {
      router.push('/ru/app/kyc/start');
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">{t('consentTitle')}</h1>
          <p className="text-muted-foreground">{t('consentDescription')}</p>
        </div>

        {/* Main Card */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              {tLegal('title')}
            </CardTitle>
            <CardDescription>{tLegal('description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Legal Notice */}
            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm space-y-2">
                  <p className="font-medium">{tLegal('important')}</p>
                  <p>{tLegal('note')}</p>
                </div>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="terms" 
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                  {tLegal('checkbox')}
                </label>
              </div>
              
              {/* Legal Links */}
              <div className="text-xs text-muted-foreground space-y-2">
                <p>{tLegal('readMore')}</p>
                <div className="flex flex-wrap gap-3">
                  <Link 
                    href="/en/terms" 
                    className="text-primary hover:underline flex items-center gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="h-3 w-3" />
                    {tLegal('terms')}
                  </Link>
                  <Link 
                    href="/en/privacy" 
                    className="text-primary hover:underline flex items-center gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Lock className="h-3 w-3" />
                    {tLegal('privacy')}
                  </Link>
                  <Link 
                    href="/en/security#kyc-policy" 
                    className="text-primary hover:underline flex items-center gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Shield className="h-3 w-3" />
                    {tLegal('aml')}
                  </Link>
                </div>
              </div>
            </div>

            {/* Large CTA Button */}
            <Button 
              className="w-full h-12 text-lg font-semibold" 
              disabled={!agreed}
              onClick={handleStartKYC}
            >
              {t('startButton')}
            </Button>
          </CardContent>
        </Card>

        {/* Back Button */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => router.back()}
        >
          {tCommon('back')}
        </Button>
      </div>
    </div>
  );
}
