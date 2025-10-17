// CORS allowlist for frontend origins
export const ALLOWLIST = [
  'https://akuna-pay-pilot.lovable.app'
];

// Support for environment variable override
const getFrontendOrigins = (): string[] => {
  const envOrigins = process.env.FRONTEND_ORIGINS;
  if (envOrigins) {
    return envOrigins.split(',').map(origin => origin.trim());
  }
  return ALLOWLIST;
};

export function getCorsHeaders(origin: string | undefined): Record<string, string> {
  const allowedOrigins = getFrontendOrigins();
  
  // Check if origin is in allowlist
  const isAllowed = origin && allowedOrigins.includes(origin);
  
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : 'null',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400'
  };
}

// Helper function to handle OPTIONS preflight requests
export function handleOptionsRequest(origin: string | undefined): Response {
  const corsHeaders = getCorsHeaders(origin);
  return new Response(null, {
    status: 200,
    headers: corsHeaders
  });
}

// Helper function to add CORS headers to any response
export function addCorsHeaders(response: Response, origin: string | undefined): Response {
  const corsHeaders = getCorsHeaders(origin);
  
  // Create new headers object
  const newHeaders = new Headers(response.headers);
  Object.entries(corsHeaders).forEach(([key, value]) => {
    newHeaders.set(key, value);
  });
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}
