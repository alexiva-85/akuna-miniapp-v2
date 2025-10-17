'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Camera, Image } from 'lucide-react';
import { useState } from 'react';

interface ScanInputProps {
  onScanResult?: (result: string) => void;
  onAmountEntered?: (amount: string) => void;
}

export default function ScanInput({ onScanResult, onAmountEntered }: ScanInputProps) {
  const t = useTranslations('pay');
  const tCommon = useTranslations('common');
  const [amount, setAmount] = useState('');

  const handleScan = () => {
    // Mock QR scan result
    const mockResult = 'promptpay://1234567890?amount=100';
    onScanResult?.(mockResult);
  };

  const handleGallery = () => {
    // Mock gallery selection
    const mockResult = 'promptpay://1234567890?amount=100';
    onScanResult?.(mockResult);
  };

  const handleAmountSubmit = () => {
    if (amount && parseFloat(amount) >= 1) {
      onAmountEntered?.(amount);
    }
  };

  return (
    <div className="space-y-6">
      {/* QR Scanner Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <QrCode className="h-5 w-5" />
            <span>{t('scanQR.title')}</span>
          </CardTitle>
          <CardDescription>{t('scanQR.scanArea')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Mock QR Scanner Area */}
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
            <div className="text-center space-y-2">
              <QrCode className="h-12 w-12 mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {t('scanQR.scanArea')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={handleScan}>
              <Camera className="h-4 w-4 mr-2" />
              {t('scanQR.flashlight')}
            </Button>
            <Button variant="outline" onClick={handleGallery}>
              <Image className="h-4 w-4 mr-2" />
              {t('scanQR.gallery')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Manual Amount Entry */}
      <Card>
        <CardHeader>
          <CardTitle>{t('amount.title')}</CardTitle>
          <CardDescription>{t('amount.hint.recipient')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <input
              type="number"
              placeholder={t('amount.placeholder')}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full h-12 px-4 text-2xl text-center rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <p className="text-xs text-muted-foreground text-center">
              {t('amount.min')}
            </p>
          </div>

          <Button 
            className="w-full" 
            disabled={!amount || parseFloat(amount) < 1}
            onClick={handleAmountSubmit}
          >
            {t('actions.continue')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

