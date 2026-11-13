// =========================================================================
// IMONOKE CUP 3X3 - PAYMENT & CONTACT CREDENTIALS
// File khusus pengelolaan nomor rekening panitia, gateway kontak WhatsApp, dll.
// =========================================================================

export const PAYMENT_CREDENTIALS = {
  // Kontak WhatsApp Panitia Resmi
  PANITIA_WHATSAPP: import.meta.env.VITE_PANITIA_WHATSAPP || '085757016933',
  PANITIA_WHATSAPP_INTL: import.meta.env.VITE_PANITIA_WHATSAPP_INTL || '6285757016933',
  
  // Rekening Bank / QRIS Panitia Resmi (IMOCUP 26, Makanan)
  QRIS_MERCHANT_NAME: import.meta.env.VITE_QRIS_MERCHANT_NAME || 'IMOCUP 26, Makanan',
  QRIS_NMID: import.meta.env.VITE_QRIS_NMID || 'ID1026490042029',
  QRIS_IMAGE_URL: import.meta.env.VITE_QRIS_IMAGE_URL || (import.meta.env.BASE_URL ? `${import.meta.env.BASE_URL}qris-official.jpg` : './qris-official.jpg'),
  BANK_NAME: import.meta.env.VITE_PAYMENT_BANK_NAME || 'BCA',
  ACCOUNT_NUMBER: import.meta.env.VITE_PAYMENT_ACCOUNT_NUMBER || '1234567890',
  ACCOUNT_NAME: import.meta.env.VITE_PAYMENT_ACCOUNT_NAME || 'IMONOKE CUP PANITIA'
} as const;
