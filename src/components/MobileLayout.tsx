import { ReactNode } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft } from 'lucide-react';

interface MobileLayoutProps {
  children: ReactNode;
  showClose?: boolean;
  onClose?: () => void;
  showLanguageSwitcher?: boolean;
}

export const MobileLayout = ({ 
  children, 
  showClose = true, 
  onClose,
  showLanguageSwitcher = true 
}: MobileLayoutProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[414px] mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4">
        {showClose ? (
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">{t('common.back')}</span>
          </button>
        ) : (
          <div />
        )}
        
        {showLanguageSwitcher && <LanguageSwitcher />}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
};
