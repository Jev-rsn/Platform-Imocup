import React, { createContext, useContext, useState, useEffect } from 'react';
import { Customer } from '../types/tournament';
import { 
  registerCustomer, 
  loginCustomer, 
  isSupabaseConfigured, 
  RegisterCustomerInput,
  getSupabaseConfig
} from '../lib/supabase';

interface CustomerAuthContextType {
  customer: Customer | null;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  isSupabaseConnected: boolean;
  supabaseConfig: { url: string; anonKey: string };
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  setAuthModalMode: (mode: 'login' | 'register') => void;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterCustomerInput) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  saveSupabaseConfig: (url: string, anonKey: string) => void;
}

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(undefined);

export const CustomerAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customer, setCustomer] = useState<Customer | null>(() => {
    try {
      const saved = localStorage.getItem('imonoke_customer_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(isSupabaseConfigured());
  const [supabaseConfig, setSupabaseConfig] = useState(getSupabaseConfig());

  useEffect(() => {
    if (customer) {
      localStorage.setItem('imonoke_customer_session', JSON.stringify(customer));
    } else {
      localStorage.removeItem('imonoke_customer_session');
    }
  }, [customer]);

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await loginCustomer(email, password);
      if (res.customer) {
        setCustomer(res.customer);
        closeAuthModal();
        return { success: true };
      }
      return { success: false, error: res.error || 'Gagal masuk akun' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Terjadi kesalahan sistem' };
    }
  };

  const register = async (data: RegisterCustomerInput) => {
    try {
      const res = await registerCustomer(data);
      if (res.customer) {
        setCustomer(res.customer);
        closeAuthModal();
        return { success: true };
      }
      return { success: false, error: res.error || 'Gagal mendaftar akun' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Terjadi kesalahan sistem' };
    }
  };

  const logout = () => {
    setCustomer(null);
  };

  const saveSupabaseConfig = (url: string, anonKey: string) => {
    localStorage.setItem('imonoke_supabase_url', url.trim());
    localStorage.setItem('imonoke_supabase_key', anonKey.trim());
    setIsSupabaseConnected(isSupabaseConfigured());
    setSupabaseConfig(getSupabaseConfig());
  };

  return (
    <CustomerAuthContext.Provider
      value={{
        customer,
        isAuthModalOpen,
        authModalMode,
        isSupabaseConnected,
        supabaseConfig,
        openAuthModal,
        closeAuthModal,
        setAuthModalMode,
        login,
        register,
        logout,
        saveSupabaseConfig
      }}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
};

export const useCustomerAuth = (): CustomerAuthContextType => {
  const context = useContext(CustomerAuthContext);
  if (!context) {
    throw new Error('useCustomerAuth must be used within a CustomerAuthProvider');
  }
  return context;
};
