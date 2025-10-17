export const ENV = {
  API_BASE: import.meta.env.VITE_API_BASE_URL || '',
  SUPPORT_URL: import.meta.env.VITE_SUPPORT_URL || '',
  TBANK_URL: import.meta.env.VITE_TBANK_URL || '',
  SBP_URL: import.meta.env.VITE_SBP_URL || '',
  FAQ_URL: import.meta.env.VITE_FAQ_URL || '',
};
if (!ENV.API_BASE) {
  // one-time console warning to help diagnose missing env
  // eslint-disable-next-line no-console
  console.warn('[ENV] VITE_API_BASE_URL is empty. Set it in project Environment Variables.');
}
