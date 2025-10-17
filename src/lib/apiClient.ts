import { ENV } from '@/config/env';

export const API_BASE = ENV.API_BASE;

function makeUrl(path: string): string {
  return `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
}

export async function api(path: string, init: RequestInit = {}) {
  if (!API_BASE) throw new Error('API_BASE is not configured');
  const res = await fetch(makeUrl(path), init);
  return res;
}

export async function apiJson<T = unknown>(path: string, init: RequestInit = {}) {
  const res = await api(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export function withAuth(init: RequestInit = {}, token?: string): RequestInit {
  if (!token) return init;
  return {
    ...init,
    headers: {
      ...(init.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  };
}
