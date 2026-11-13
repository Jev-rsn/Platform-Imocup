/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Supabase Cloud Configuration
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;

  // Admin & Committee Accounts Configuration (Optional Overrides)
  readonly VITE_ADMIN_USERNAME?: string;
  readonly VITE_ADMIN_PASSWORD?: string;
  readonly VITE_OPERATOR_PASSWORD?: string;
  readonly VITE_PANITIA_PASSWORD?: string;
  readonly VITE_GATE_PASSWORD?: string;

  // Contact Configuration
  readonly VITE_PANITIA_WHATSAPP?: string;
  readonly VITE_PANITIA_WHATSAPP_INTL?: string;

  // QRIS Configuration
  readonly VITE_QRIS_MERCHANT_NAME?: string;
  readonly VITE_QRIS_NMID?: string;
  readonly VITE_QRIS_IMAGE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
