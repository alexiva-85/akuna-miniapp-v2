'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowDownLeft,
  ArrowUpRight,
  History, 
  QrCode,
  Users
} from 'lucide-react';

interface ActionCardsProps {
  balance?: number;
  currency?: string;
  kycStatus?: 'pending' | 'approved' | 'rejected' | 'not_started';
  onActionClick?: (action: string) => void;
}

export default function ActionCards({ 
  balance = 1500.00, 
  currency = 'THB',
  kycStatus = 'approved',
  onActionClick
}: ActionCardsProps) {
  const t = useTranslations('dashboard');
  const tActions = useTranslations('actions');

  const formatBalance = (amount: number, curr: string) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: curr,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      {/* Balance Card */}
      <Card className="bg-gradient-to-r from-primary/10 to-background border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">{t('balance')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-foreground">{formatBalance(balance, currency)}</p>
        </CardContent>
      </Card>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card 
          className="hover:bg-muted/50 transition-colors cursor-pointer"
          onClick={() => onActionClick?.('deposit')}
        >
          <CardContent className="p-4">
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 rounded-full bg-green-500/10">
                <ArrowDownLeft className="h-6 w-6 text-green-500" />
              </div>
              <span className="text-sm font-medium">{t('deposit')}</span>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="hover:bg-muted/50 transition-colors cursor-pointer"
          onClick={() => onActionClick?.('withdraw')}
        >
          <CardContent className="p-4">
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 rounded-full bg-blue-500/10">
                <ArrowUpRight className="h-6 w-6 text-blue-500" />
              </div>
              <span className="text-sm font-medium">{t('withdraw')}</span>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="hover:bg-muted/50 transition-colors cursor-pointer"
          onClick={() => onActionClick?.('pay')}
        >
          <CardContent className="p-4">
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 rounded-full bg-purple-500/10">
                <QrCode className="h-6 w-6 text-purple-500" />
              </div>
              <span className="text-sm font-medium">{t('pay')}</span>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="hover:bg-muted/50 transition-colors cursor-pointer"
          onClick={() => onActionClick?.('history')}
        >
          <CardContent className="p-4">
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 rounded-full bg-orange-500/10">
                <History className="h-6 w-6 text-orange-500" />
              </div>
              <span className="text-sm font-medium">{t('transactionHistory')}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referrals Card */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-purple-500/20">
              <Users className="h-5 w-5 text-purple-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{t('referrals')}</h3>
              <p className="text-sm text-muted-foreground">{t('inviteFriends')}</p>
            </div>
            <Button variant="outline" size="sm">
              {t('invite')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}