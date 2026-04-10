import { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "@/lib/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load token from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('lkk_token');
      if (savedToken) {
        setToken(savedToken);
        verifyToken(savedToken);
      } else {
        setLoading(false);
      }
    }
  }, []);

  // Verify token with backend
  const verifyToken = async (t) => {
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${t}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(t);
      } else {
        logout();
      }
    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');

    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('lkk_token', data.token);
    localStorage.setItem('lkk_user', JSON.stringify(data.user));
    return data;
  };

  // Signup
  const signup = async (name, email, phone, password) => {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Signup failed');

    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('lkk_token', data.token);
    localStorage.setItem('lkk_user', JSON.stringify(data.user));
    return data;
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lkk_token');
      localStorage.removeItem('lkk_user');
    }
  };

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      user, token, loading, isAdmin,
      login, signup, logout,
      setUser, setToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
