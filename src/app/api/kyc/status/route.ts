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
  if (!token.startsWith('tg_')) {
    return NextResponse.json(
      { error: 'Invalid token format' },
      { 
        status: 401,
        headers: corsHeaders
      }
    );
  }
  
  // Mock KYC status check
  // In real implementation, this would query the database using the token
  const statuses = ['pending', 'approved', 'rejected'];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  
  return NextResponse.json(
    { 
      status: randomStatus,
      message: `KYC status: ${randomStatus}`,
      lastUpdated: new Date().toISOString()
    },
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
