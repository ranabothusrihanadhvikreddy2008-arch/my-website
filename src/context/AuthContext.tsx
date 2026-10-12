import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../data/types';

export interface EmailCheckResult {
  exists: boolean;
  user?: User;
  message: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  registeredUsers: User[];
  checkEmailExists: (identifier: string, expectedRole?: 'customer' | 'admin') => EmailCheckResult;
  login: (identifier: string, secret: string, expectedRole?: 'customer' | 'admin') => Promise<{ success: boolean; message?: string }>;
  loginAsDemoCustomer: () => void;
  loginAsDemoAdmin: () => void;
  register: (data: { name: string; email: string; phone: string; password?: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

export const INITIAL_REGISTERED_USERS: User[] = [
  {
    id: 'user-srihan',
    name: 'Srihan',
    email: 'srihan@example.com',
    phone: '+91 95429 79999',
    role: 'customer',
    panNumber: 'ABCDE1234F',
    aadhaarNumber: 'XXXX-XXXX-9841',
    address: 'Indiranagar, Bengaluru / Pot Market Hyderabad'
  },
  {
    id: 'user-2',
    name: 'Srihan',
    email: 'ananya@example.com',
    phone: '+91 98860 34125',
    role: 'customer',
    panNumber: 'ABCDE1234F',
    aadhaarNumber: 'XXXX-XXXX-9841',
    address: 'Indiranagar, Bengaluru / Pot Market Hyderabad'
  },
  {
    id: 'admin-01',
    name: 'Srihan',
    email: 'admin@sgbw.com',
    phone: '+91 95429 79999',
    role: 'admin'
  },
  {
    id: 'user-1',
    name: 'Rajalakshmi Raghavan',
    email: 'rajalakshmi@example.com',
    phone: '+91 98490 23456',
    role: 'customer',
    panNumber: 'FGHIJ5678K',
    aadhaarNumber: 'XXXX-XXXX-1234',
    address: 'Banjara Hills, Hyderabad, Telangana 500034'
  },
  {
    id: 'user-3',
    name: 'Divya Venkatraman',
    email: 'divya@example.com',
    phone: '+91 98492 88712',
    role: 'customer',
    panNumber: 'KLMNO9012P',
    aadhaarNumber: 'XXXX-XXXX-5678',
    address: 'Jayanagar, Bengaluru, Karnataka 560041'
  },
  {
    id: 'user-4',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 98495 55123',
    role: 'customer',
    panNumber: 'PQRST3456U',
    aadhaarNumber: 'XXXX-XXXX-9012',
    address: 'Secunderabad, Telangana 500003'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Registered users database with cache versioning for Srihan
  const [registeredUsers, setRegisteredUsers] = useState<User[]>(() => {
    try {
      const version = localStorage.getItem('sgbw_users_version_v3');
      if (version !== 'v3_srihan') {
        localStorage.setItem('sgbw_users_version_v3', 'v3_srihan');
        localStorage.setItem('sgbw_registered_users', JSON.stringify(INITIAL_REGISTERED_USERS));
        return INITIAL_REGISTERED_USERS;
      }
      const saved = localStorage.getItem('sgbw_registered_users');
      return saved ? JSON.parse(saved) : INITIAL_REGISTERED_USERS;
    } catch {
      return INITIAL_REGISTERED_USERS;
    }
  });

  // Active authenticated user session
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('sgbw_auth_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed.email === 'ananya@example.com' ||
          parsed.email === 'admin@sgbw.com' ||
          parsed.email === 'srihan@example.com' ||
          parsed.role === 'admin'
        ) {
          parsed.name = 'Srihan';
          localStorage.setItem('sgbw_auth_user', JSON.stringify(parsed));
        }
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('sgbw_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sgbw_auth_user');
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('sgbw_registered_users', JSON.stringify(registeredUsers));
    } catch {
      // ignore
    }
  }, [registeredUsers]);

  // Check whether an email or phone number exists in registered records
  const checkEmailExists = (identifier: string, expectedRole?: 'customer' | 'admin'): EmailCheckResult => {
    const raw = identifier.trim().toLowerCase();
    if (!raw) {
      return {
        exists: false,
        message: 'Please enter an email address or mobile number.'
      };
    }

    const cleanDigits = raw.replace(/[^0-9]/g, '');

    const found = registeredUsers.find((u) => {
      const emailMatches = u.email.toLowerCase() === raw;
      const phoneDigits = u.phone.replace(/[^0-9]/g, '');
      const phoneMatches = cleanDigits.length >= 10 && phoneDigits.endsWith(cleanDigits);
      return emailMatches || phoneMatches;
    });

    if (!found) {
      return {
        exists: false,
        message: `Email "${identifier}" does NOT exist in registered records.`
      };
    }

    if (expectedRole && found.role !== expectedRole) {
      return {
        exists: true,
        user: found,
        message: `Account exists as ${found.role === 'admin' ? 'Bullion Admin' : 'Customer Member'}, not ${expectedRole}.`
      };
    }

    return {
      exists: true,
      user: found,
      message: `Verified: Account exists for ${found.name} (${found.role === 'admin' ? 'Admin Master' : 'Verified Member'}).`
    };
  };

  const login = async (
    identifier: string,
    secret: string,
    expectedRole?: 'customer' | 'admin'
  ): Promise<{ success: boolean; message?: string }> => {
    const raw = identifier.trim().toLowerCase();

    // 1. VERIFY WHETHER THE EMAIL / IDENTIFIER EXISTS OR NOT
    const check = checkEmailExists(raw, expectedRole);
    if (!check.exists) {
      return {
        success: false,
        message: `Email Not Found: "${identifier}" does not exist in our database. Please check the spelling or register a new passbook.`
      };
    }

    const matchedUser = check.user!;

    // 2. VERIFY ROLE RESTRICTION
    if (expectedRole && matchedUser.role !== expectedRole) {
      return {
        success: false,
        message: `Role Mismatch: "${identifier}" is registered as a ${matchedUser.role === 'admin' ? 'Bullion Administrator' : 'Customer Member'}. Please switch to the ${matchedUser.role === 'admin' ? 'Admin Terminal' : 'Customer Portal'} tab.`
      };
    }

    // 3. VERIFY PASSWORDS / OTP
    if (matchedUser.role === 'admin') {
      if (secret === 'admin123' || secret === 'bullion999') {
        const adminUser: User = { ...matchedUser, name: 'Srihan' };
        setUser(adminUser);
        return { success: true };
      }
      return {
        success: false,
        message: 'Invalid Administrator Security Key. (Demo hint: admin123)'
      };
    }

    // Customer login: verify secret password or OTP
    if (secret === 'customer123' || secret === '123456' || secret.length >= 4) {
      const custUser: User = { ...matchedUser, name: 'Srihan' };
      setUser(custUser);
      return { success: true };
    }

    return {
      success: false,
      message: 'Invalid Customer Password or OTP. (Demo hint: customer123 or OTP 123456)'
    };
  };

  const loginAsDemoCustomer = () => {
    const customer = registeredUsers.find((u) => u.name === 'Srihan' && u.role === 'customer') || INITIAL_REGISTERED_USERS[0];
    setUser({ ...customer, name: 'Srihan' });
  };

  const loginAsDemoAdmin = () => {
    const admin = registeredUsers.find((u) => u.role === 'admin') || INITIAL_REGISTERED_USERS[2];
    setUser({ ...admin, name: 'Srihan' });
  };

  const register = async (data: { name: string; email: string; phone: string; password?: string }) => {
    const cleanEmail = data.email.trim().toLowerCase();

    // Verify whether email already exists
    const existing = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return {
        success: false,
        message: `Email Already Exists: "${data.email}" is already registered in our database. Please sign in instead.`
      };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name.trim() || 'Srihan',
      email: data.email.trim(),
      phone: data.phone.trim(),
      role: 'customer',
      address: 'Hyderabad / Bengaluru sanctum'
    };

    const updated = [...registeredUsers, newUser];
    setRegisteredUsers(updated);
    try {
      localStorage.setItem('sgbw_registered_users', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setUser(newUser);
    return { success: true, message: 'Customer Passbook successfully registered!' };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        registeredUsers,
        checkEmailExists,
        login,
        loginAsDemoCustomer,
        loginAsDemoAdmin,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
