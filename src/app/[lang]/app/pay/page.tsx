'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function PayPage() {
  const t = useTranslations('pay');
  const tCommon = useTranslations('common');
  const [amount, setAmount] = useState('');

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('amount.title')}</CardTitle>
            <CardDescription>{t('amount.hint.recipient')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                type="number"
                placeholder={t('amount.placeholder')}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-2xl text-center"
              />
              <p className="text-xs text-muted-foreground text-center">
                {t('amount.min')}
              </p>
            </div>

            <div className="space-y-2">
              <Button 
                className="w-full"
                disabled={!amount || parseFloat(amount) < 1}
                onClick={() => {
                  // Navigate to confirm page
                  window.location.href = `/ru/app/pay/confirm?amount=${amount}`;
                }}
              >
                {t('actions.continue')}
              </Button>
              
              <Button variant="outline" className="w-full">
                {t('scanQR.title')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

