import { NextRequest, NextResponse } from 'next/server';
import { getCorsHeaders, handleOptionsRequest } from '@/server/cors';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const origin = request.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);
  
  // Check for Authorization header
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'Unauthorized - Bearer token required' },
      { 
        status: 401,
        headers: corsHeaders
      }
    );
  }
  
  const token = authHeader.substring(7);
  
  // Mock token validation
  // In real implementation, this would verify the JWT token
  if (!token.startsWith('tg_')) {
    return NextResponse.json(
      { error: 'Invalid token format' },
      { 
        status: 401,
        headers: corsHeaders
      }
    );
  }
  
  // Mock user dashboard data
  // In real implementation, this would query the database using the token
  const userData = {
    kycStatus: 'approved',
    balance: 1500.00,
    currency: 'THB',
    lastLogin: new Date().toISOString(),
    accountType: 'lite'
  };
  
  return NextResponse.json(
    userData,
    { 
      status: 200,
      headers: corsHeaders
    }
  );
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return handleOptionsRequest(origin);
}
