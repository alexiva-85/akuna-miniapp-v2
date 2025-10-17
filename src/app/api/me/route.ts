import { NextRequest, NextResponse } from 'next/server';
import { getCorsHeaders, handleOptionsRequest } from '@/server/cors';
import { validateAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const origin = request.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);
  
  // Validate authentication
  const authResult = await validateAuth(request);
  if (!authResult.isValid) {
    return NextResponse.json(
      { ok: false, error: authResult.error },
      { 
        status: 401,
        headers: corsHeaders
      }
    );
  }
  
  const payload = authResult.payload!;
  
  // Return user data based on token payload
  const userData = {
    ok: true,
    user: {
      id: payload.user_id,
      tg_id: payload.tg_id,
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      isVerified: true,
      createdAt: '2024-01-15T10:30:00Z'
    }
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
