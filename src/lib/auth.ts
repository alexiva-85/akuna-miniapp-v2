import { NextRequest } from 'next/server';
import { verifySessionToken, isTokenExpired, SessionPayload } from './jwt';

export interface AuthResult {
  isValid: boolean;
  payload?: SessionPayload;
  error?: string;
}

export async function validateAuth(request: NextRequest): Promise<AuthResult> {
  // Check for Authorization header
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      isValid: false,
      error: 'Unauthorized - Bearer token required'
    };
  }
  
  const token = authHeader.substring(7);
  
  // Verify JWT token
  const payload = await verifySessionToken(token);
  if (!payload) {
    return {
      isValid: false,
      error: 'Invalid token'
    };
  }
  
  // Check if token is expired
  if (isTokenExpired(payload)) {
    return {
      isValid: false,
      error: 'Token expired'
    };
  }
  
  return {
    isValid: true,
    payload
  };
}
