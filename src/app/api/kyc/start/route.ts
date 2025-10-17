import { NextRequest, NextResponse } from 'next/server';
import { getCorsHeaders, handleOptionsRequest } from '@/server/cors';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
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
  
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.fullName || !body.email || !body.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { 
          status: 400,
          headers: corsHeaders
        }
      );
    }
    
    // Mock KYC start processing
    // In real implementation, this would save to database with user context from token
    console.log('KYC started for:', body.email, 'by user with token:', token);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'KYC application submitted successfully',
        kycId: `kyc_${Date.now()}`
      },
      { 
        status: 200,
        headers: corsHeaders
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { 
        status: 400,
        headers: corsHeaders
      }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return handleOptionsRequest(origin);
}
