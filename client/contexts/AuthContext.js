import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { API_URL } from '@/lib/api';

const AuthContext = createContext(null);
const TOKEN_KEYS = ['lkk_token', 'adminToken', 'token'];
const USER_KEYS = ['lkk_user'];

function getStoredValue(keys) {
  if (typeof window === 'undefined') {
    return null;
  }

  for (const key of keys) {
    const value = localStorage.getItem(key);
    if (value) {
      return value;
    }
  }

  return null;
}

function clearStoredAuth() {
  if (typeof window === 'undefined') {
    return;
  }

  [...TOKEN_KEYS, ...USER_KEYS].forEach((key) => localStorage.removeItem(key));
}

function persistStoredAuth(token, user) {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem('lkk_token', token);
  localStorage.setItem('lkk_user', JSON.stringify(user));
  localStorage.removeItem('adminToken');
  localStorage.removeItem('token');
}

function normalizeFetchError(error, fallbackMessage) {
  if (error instanceof TypeError && /fetch/i.test(error.message)) {
    return new Error(
      'Cannot reach the backend server. Make sure the API is running on http://localhost:5000 and refresh the page.'
    );
  }

  if (error instanceof Error) {
    return error;
  }

  return new Error(fallbackMessage);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    clearStoredAuth();
  }, []);

  const verifyToken = useCallback(
    async (nextToken) => {
      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${nextToken}` },
        });

        if (!response.ok) {
          throw new Error('Session expired');
        }

        const data = await response.json();
        setUser(data.user);
        setToken(nextToken);
        persistStoredAuth(nextToken, data.user);
      } catch (error) {
        logout();
      } finally {
        setLoading(false);
      }
    },
    [logout]
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const savedToken = getStoredValue(TOKEN_KEYS);
    const savedUser = savedToken ? getStoredValue(USER_KEYS) : null;

    if (savedToken && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('lkk_user');
      }
    }

    if (savedToken) {
      setToken(savedToken);
      verifyToken(savedToken);
    } else {
      clearStoredAuth();
      setUser(null);
      setLoading(false);
    }
  }, [verifyToken]);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setUser(data.user);
      setToken(data.token);
      persistStoredAuth(data.token, data.user);
      return data;
    } catch (error) {
      throw normalizeFetchError(error, 'Login failed');
    }
  };

  const signup = async (name, email, phone, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      setUser(data.user);
      setToken(data.token);
      persistStoredAuth(data.token, data.user);
      return data;
    } catch (error) {
      throw normalizeFetchError(error, 'Signup failed');
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAdmin,
        login,
        signup,
        logout,
        setUser,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
