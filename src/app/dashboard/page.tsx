'use client';

import { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Инициализация Telegram WebApp
    if (typeof window !== 'undefined') {
      try {
        if (window.Telegram?.WebApp) {
          const tg = window.Telegram.WebApp;
          tg.ready();
          tg.expand();
          console.log('Telegram WebApp detected:', tg);
        }
      } catch (error) {
        console.error('Error initializing Telegram WebApp:', error);
      }
    }
    
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '32px',
            height: '32px',
            border: '2px solid #3b82f6',
            borderTop: '2px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#6b7280' }}>Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 24px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h1 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#111827',
              margin: 0
            }}>Akuna Pay</h1>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: 0
            }}>Mini-App Dashboard</p>
          </div>
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: '#dbeafe',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: '14px' }}>👤</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '24px' }}>
        {/* Balance Card */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <span style={{ fontSize: '24px' }}>🇹🇭</span>
            <span style={{
              fontWeight: '500',
              color: '#111827'
            }}>THB Account</span>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              fontSize: '30px',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '4px'
            }}>฿52,814.17</div>
            <div style={{
              fontSize: '14px',
              color: '#6b7280'
            }}>~$1,660.03</div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px'
          }}>
            <button style={{
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              height: '48px',
              borderRadius: '12px',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer'
            }}>
              Deposit
            </button>
            <button style={{
              backgroundColor: '#f3f4f6',
              color: '#374151',
              height: '48px',
              borderRadius: '12px',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer'
            }}>
              Withdraw
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <button style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center',
            cursor: 'pointer'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#dbeafe',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <span style={{ fontSize: '20px' }}>💳</span>
            </div>
            <div style={{
              fontWeight: '500',
              color: '#111827'
            }}>Pay</div>
          </button>
          
          <button style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center',
            cursor: 'pointer'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#dbeafe',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <span style={{ fontSize: '20px' }}>📱</span>
            </div>
            <div style={{
              fontWeight: '500',
              color: '#111827'
            }}>QR Pay</div>
          </button>
        </div>

        {/* Recent Transactions */}
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
        }}>
          <h3 style={{
            fontWeight: '600',
            color: '#111827',
            marginBottom: '16px',
            margin: 0
          }}>Recent Transactions</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#dcfce7',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: '#16a34a' }}>↓</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontWeight: '500',
                  color: '#111827'
                }}>+2,000฿</div>
                <div style={{
                  fontSize: '14px',
                  color: '#6b7280'
                }}>Yesterday, 14:02</div>
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6b7280'
              }}>~$61</div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#fee2e2',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: '#dc2626' }}>↑</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontWeight: '500',
                  color: '#111827'
                }}>-1,800฿</div>
                <div style={{
                  fontSize: '14px',
                  color: '#6b7280'
                }}>12.09.2025, 14:23</div>
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6b7280'
              }}>~$56</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
