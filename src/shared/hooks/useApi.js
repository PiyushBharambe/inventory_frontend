/**
 * Custom React hooks for common patterns
 */
import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

/**
 * Hook for API requests with loading, error, and retry logic
 * 
 * Usage:
 *   const { data, loading, error, refetch } = useApi('/products/', 'GET');
 */
export const useApi = (url, method = 'GET', body = null, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (method === 'GET') {
        response = await api.get(url);
      } else if (method === 'POST') {
        response = await api.post(url, body);
      } else if (method === 'PUT') {
        response = await api.put(url, body);
      } else if (method === 'DELETE') {
        response = await api.delete(url);
      }
      
      if (response.data.success) {
        setData(response.data.data);
      } else {
        setError(response.data.message || 'Unknown error');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  }, [url, method, body]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  return { data, loading, error, refetch: fetchData };
};

/**
 * Hook for authentication
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('access_token');
    if (token) {
      // Verify token is still valid
      const userData = localStorage.getItem('user');
      setUser(userData ? JSON.parse(userData) : null);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api.post('/auth/login/', { username, password });
      if (response.data.success) {
        localStorage.setItem('access_token', response.data.data.access);
        localStorage.setItem('refresh_token', response.data.data.refresh);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        setUser(response.data.data.user);
        return { success: true };
      }
      return { success: false, message: response.data.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const hasRole = (requiredRole) => {
    if (!user) return false;
    if (user.role === 'admin') return true; // Admin can do everything
    return user.role === requiredRole;
  };

  return { user, loading, login, logout, hasRole, isAuthenticated: !!user };
};

/**
 * Hook for barcode scanning input
 * Handles debouncing and duplicate prevention
 */
export const useBarcodeInput = () => {
  const [barcode, setBarcode] = useState('');
  const [lastScan, setLastScan] = useState(null);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const handleBarcodeChange = useCallback((value) => {
    const now = Date.now();
    
    // Check for duplicate scans within 100ms
    if (lastScan && now - lastScan < 100) {
      setIsDuplicate(true);
      setTimeout(() => setIsDuplicate(false), 500);
      return;
    }

    setBarcode(value);
    setLastScan(now);
  }, [lastScan]);

  const clearBarcode = useCallback(() => {
    setBarcode('');
    setLastScan(null);
  }, []);

  return { barcode, setBarcode: handleBarcodeChange, clearBarcode, isDuplicate };
};

/**
 * Hook for form submission with loading state
 */
export const useForm = (onSubmit) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await onSubmit(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  }, [onSubmit]);

  return { loading, error, success, handleSubmit };
};

/**
 * Hook for debounced values (useful for search)
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook for local storage persistence
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
