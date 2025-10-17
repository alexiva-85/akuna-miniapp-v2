'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: string;
  recipient: string;
  fee: string;
  total: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  amount,
  recipient,
  fee,
  total
}: ConfirmModalProps) {
  const t = useTranslations('pay');
  const tCommon = useTranslations('common');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('confirm.title')}</DialogTitle>
          <DialogDescription>
            Please review the payment details before confirming.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">{t('confirm.recipient')}</span>
              <span className="text-sm font-medium">{recipient}</span>
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

          <div className="text-xs text-muted-foreground bg-muted p-3 rounded-md">
            {t('confirm.disclaimer')}
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              {t('actions.cancel')}
            </Button>
            <Button onClick={onConfirm} className="flex-1">
              {t('actions.pay')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

