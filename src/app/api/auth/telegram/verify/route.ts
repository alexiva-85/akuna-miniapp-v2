import { NextRequest, NextResponse } from 'next/server';
import { getCorsHeaders, handleOptionsRequest } from '@/server/cors';
import { createSessionToken } from '@/lib/jwt';

export const dynamic = 'force-dynamic';

// TODO: Implement proper Telegram initData validation
// This is a stub implementation for development
function validateTelegramInitData(initData: string): { isValid: boolean; userData?: any } {
  // In production, this should:
  // 1. Parse the initData URL parameters
  // 2. Verify the hash using the bot token
  // 3. Check timestamp (not older than 24 hours)
  // 4. Return user data if valid
  
  if (process.env.NODE_ENV === 'production') {
    // TODO: Implement real Telegram validation
    console.warn('TODO: Implement Telegram initData validation for production');
    return { isValid: false };
  }
  
  // Development stub - accept any non-empty initData
  if (!initData || initData.trim() === '') {
    return { isValid: false };
  }
  
  // Mock user data for development
  return {
    isValid: true,
    userData: {
      id: 12345,
      first_name: 'John',
      last_name: 'Doe',
      username: 'johndoe',
      language_code: 'en'
    }
  };
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);
  
  try {
    const body = await request.json();
    
    // Validate Telegram init data
    if (!body.initData) {
      return NextResponse.json(
        { ok: false, error: 'Missing Telegram init data' },
        { 
          status: 400,
          headers: corsHeaders
        }
      );
    }
    
    // Validate Telegram initData
    const validation = validateTelegramInitData(body.initData);
    
    if (!validation.isValid) {
      return NextResponse.json(
        { ok: false, error: 'invalid_telegram' },
        { 
          status: 401,
          headers: corsHeaders
        }
      );
    }
    
    const userData = validation.userData!;
    
    // Create session token
    const sessionToken = await createSessionToken({
      user_id: userData.id.toString(),
      tg_id: userData.id.toString(),
      ttl: 3600 // 1 hour
    });
    
    return NextResponse.json(
      { 
        ok: true,
        session_token: sessionToken,
        user: {
          id: userData.id,
          tg_id: userData.id,
          first_name: userData.first_name,
          last_name: userData.last_name,
          username: userData.username
        }
      },
      { 
        status: 200,
        headers: corsHeaders
      }
    );
  } catch (error) {
    console.error('Telegram auth error:', error);
    return NextResponse.json(
      { ok: false, error: 'Invalid request body' },
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
