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
    if (!body.amount || !body.total) {
      return NextResponse.json(
        { error: 'Missing required payment fields' },
        { 
          status: 400,
          headers: corsHeaders
        }
      );
    }
    
    // Mock payment processing
    // In real implementation, this would integrate with payment gateway using user context from token
    console.log('Processing payment:', body, 'for user with token:', token);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Payment processed successfully',
        transactionId: `txn_${Date.now()}`,
        amount: body.amount,
        total: body.total
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
