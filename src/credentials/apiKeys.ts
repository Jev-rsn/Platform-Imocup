// =========================================================================
// IMONOKE CUP 3X3 - API & CLOUD SERVICE CREDENTIALS
// File khusus pengelolaan API Keys, Endpoint, dan Project Config
// Seluruh nilai diambil aman dari environment variable (.env)
// Catatan: Vite mengharuskan akses statis (import.meta.env.VITE_...) agar terbaca saat build produksi
// =========================================================================

export const API_CONFIG = {
  // Supabase Cloud Backend Resmi
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || 'https://qveefvfkcxtjuyxpfguv.supabase.co',
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_9G_HDhKeuexULpyR6wTpag_IHbLfEQm',
  SUPABASE_PROJECT_ID: import.meta.env.VITE_SUPABASE_PROJECT_ID || 'qveefvfkcxtjuyxpfguv',
  SUPABASE_SERVICE_ROLE_KEY: import.meta.env.SUPABASE_SERVICE_ROLE_KEY || '',
} as const;

export const hasValidSupabaseApiConfig = (): boolean => {
  return Boolean(
    API_CONFIG.SUPABASE_URL && 
    API_CONFIG.SUPABASE_ANON_KEY && 
    API_CONFIG.SUPABASE_URL.startsWith('http')
  );
};
