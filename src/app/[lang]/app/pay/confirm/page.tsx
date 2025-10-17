'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { apiJson, withAuth } from '@/lib/apiClient';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function PayConfirmPage() {
  const t = useTranslations('pay');
  const tCommon = useTranslations('common');
  const { sessionToken, isAuthenticated } = useAuth();
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount') || '0';
  const [isProcessing, setIsProcessing] = useState(false);

  const fee = (parseFloat(amount) * 0.01).toFixed(2); // 1% fee
  const total = (parseFloat(amount) + parseFloat(fee)).toFixed(2);

  const handlePayment = async () => {
    if (!isAuthenticated || !sessionToken) {
      toast.error('Please authenticate first');
      return;
    }

    setIsProcessing(true);
    try {
      // Process payment via API with bearer token
      const init = withAuth({
        method: 'POST',
        body: JSON.stringify({
          amount: parseFloat(amount),
          fee: parseFloat(fee),
          total: parseFloat(total),
          recipient: 'John Doe'
        }),
      }, sessionToken);
      
      await apiJson('/api/payments/process', init);
      
      toast.success(t('paymentSuccess'));
      // Navigate to result page
      window.location.href = '/ru/app/pay/result?status=success';
    } catch (error) {
      toast.error(t('paymentError'));
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('confirm.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{t('confirm.recipient')}</span>
                <span className="text-sm font-medium">John Doe</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{t('confirm.amount')}</span>
                <span className="text-sm font-medium">{amount} THB</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">{t('confirm.fee')}</span>
                <span className="text-sm font-medium">{fee} THB</span>
              </div>
              
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="font-medium">{t('confirm.total')}</span>
                  <span className="font-bold text-lg">{total} THB</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              {t('confirm.disclaimer')}
            </div>

            <div className="space-y-2">
              <Button 
                className="w-full"
                disabled={isProcessing}
                onClick={handlePayment}
              >
                {isProcessing ? t('actions.processing') : t('actions.pay')}
              </Button>
              
              <Button variant="outline" className="w-full">
                {t('actions.edit')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

