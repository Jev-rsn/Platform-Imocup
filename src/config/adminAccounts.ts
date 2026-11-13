// =========================================================================
// IMONOKE CUP 3X3 - ADMIN SESSION & AUTH VERIFICATION SERVICE
// Seluruh akun & password panitia dipisahkan ke modul credentials (src/credentials/adminCredentials.ts)
// =========================================================================

import { ADMIN_CREDENTIALS, AdminAccount, AdminRole } from '../credentials/adminCredentials';

export type { AdminAccount, AdminRole };
export const ADMIN_ACCOUNTS: AdminAccount[] = ADMIN_CREDENTIALS;

// 1. Kunci Penyimpanan Sesi
export const ADMIN_SESSION_STORAGE_KEY = 'imonoke_admin_auth';
export const ADMIN_USER_STORAGE_KEY = 'imonoke_admin_user';

// 3. Helper Verifikasi Login Admin (Verifikasi Ketat, Tanpa Bypass PIN)
export const verifyAdminLogin = (
  usernameInput: string,
  passwordInput: string
): { valid: boolean; account?: AdminAccount; error?: string } => {
  const userClean = usernameInput.trim().toLowerCase();
  const passClean = passwordInput.trim();

  if (!userClean) {
    return { valid: false, error: 'Username panitia wajib diisi.' };
  }

  if (!passClean) {
    return { valid: false, error: 'Kata sandi panitia wajib diisi.' };
  }

  // Verifikasi kecocokan username dan kata sandi secara tepat
  const found = ADMIN_ACCOUNTS.find(acc => {
    const isUserMatch = acc.username.toLowerCase() === userClean;
    const isPassMatch = acc.password === passClean;
    return isUserMatch && isPassMatch;
  });

  if (found) {
    // Sanitasi: Jangan sertakan password pada objek sesi
    const safeAccount: AdminAccount = {
      ...found,
      password: undefined
    };
    return { valid: true, account: safeAccount };
  }

  return { valid: false, error: 'Username atau kata sandi panitia salah. Akses ditolak.' };
};

// 4. Helper Status Sesi Admin
export const setAdminSession = (account: AdminAccount, rememberMe = true) => {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(ADMIN_SESSION_STORAGE_KEY, 'true');
  storage.setItem(ADMIN_USER_STORAGE_KEY, JSON.stringify(account));
};

export const clearAdminSession = () => {
  localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
  localStorage.removeItem(ADMIN_USER_STORAGE_KEY);
  sessionStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
  sessionStorage.removeItem(ADMIN_USER_STORAGE_KEY);
};

export const getActiveAdminSession = (): AdminAccount | null => {
  const isAuth = 
    localStorage.getItem(ADMIN_SESSION_STORAGE_KEY) === 'true' ||
    sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY) === 'true';

  if (!isAuth) return null;

  try {
    const raw = localStorage.getItem(ADMIN_USER_STORAGE_KEY) || sessionStorage.getItem(ADMIN_USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : ADMIN_ACCOUNTS[0];
  } catch {
    return ADMIN_ACCOUNTS[0];
  }
};
