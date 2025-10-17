'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, User, FileText, CheckCircle, ArrowRight, Info } from 'lucide-react';
import { toast } from 'sonner';
import { apiJson, withAuth } from '@/lib/apiClient';
import { useAuth } from '@/contexts/AuthContext';

export default function KYCStartPage() {
  const t = useTranslations('kyc');
  const tCommon = useTranslations('common');
  const { sessionToken, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStartKYC = async () => {
    if (!isAuthenticated || !sessionToken) {
      toast.error('Please authenticate first');
      return;
    }

    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error(t('fillAllFields'));
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Submit KYC application via API with bearer token
      const init = withAuth({
        method: 'POST',
        body: JSON.stringify(formData),
      }, sessionToken);
      
      await apiJson('/api/kyc/start', init);
      
      toast.success(t('kycStarted'));
      
      // Navigate to pending status
      setTimeout(() => {
        router.push('/ru/app/kyc/pending');
      }, 1000);
    } catch (error) {
      toast.error(t('kycError'));
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-primary/10">
              <User className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">{t('startTitle')}</h1>
          <p className="text-muted-foreground">{t('startDescription')}</p>
        </div>

        {/* Status Card */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              {t('verificationStatus')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t('status')}</span>
              <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                {t('statusNotStarted')}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* KYC Form */}
        <Card>
          <CardHeader>
            <CardTitle>{t('personalInfo')}</CardTitle>
            <CardDescription>{t('personalInfoDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">{t('fullName')}</Label>
              <Input
                id="fullName"
                placeholder={t('fullNamePlaceholder')}
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="h-12"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('emailPlaceholder')}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="h-12"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">{t('phone')}</Label>
              <Input
                id="phone"
                type="tel"
                placeholder={t('phonePlaceholder')}
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="h-12"
              />
            </div>

            {/* Info Notice */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm space-y-1">
                  <p className="font-medium">{t('infoTitle')}</p>
                  <p>{t('infoDescription')}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full h-12 text-lg font-semibold"
            onClick={handleStartKYC}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                {t('processing')}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                {t('startButton')}
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </Button>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => router.back()}
          >
            {tCommon('back')}
          </Button>
        </div>
      </div>
    </div>
  );
}
