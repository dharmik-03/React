import { createContext, useState, useEffect } from 'react';
import api from '../api/api';
import Popup from '../components/Popup';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(null);

  const showPopup = (message, type = 'info') => {
    setPopup({ message, type });
    setTimeout(() => {
      setPopup(null);
    }, 3000);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (!savedToken) {
      setLoading(false);
      return;
    }

    api.post('/user/authLogin')
      .then((res) => {
        const userData = res.data?.user || res.data?.data || res.data;
        setUser(userData);
      })
      .catch(() => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/user/login', { email, password });
      const authToken = res.data?.token;
      const userData = res.data?.user || res.data?.data;

      if (authToken) {
        localStorage.setItem('token', authToken);
        setToken(authToken);
      }
      if (userData) {
        setUser(userData);
      }
      showPopup('Logged in successfully', 'success');
      return true;
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.msg || 'Login failed';
      showPopup(msg, 'error');
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.post('/user/logOut');
    } catch (err) {
      void err;
    } finally {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
      showPopup('Logged out successfully', 'success');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, showPopup }}>
      {children}
      {popup && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup(null)}
        />
      )}
    </AuthContext.Provider>
  );
}
