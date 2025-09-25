import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || '';

// Create instance
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to centralize error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can enhance error handling here: refresh tokens, redirect to login, etc.
    // For now, pass through so callers can handle specific messages.
    return Promise.reject(error);
  }
);

// Helper wrappers
const get = async (url, config = {}) => {
  const res = await api.get(url, config);
  return res.data;
};

const post = async (url, body = {}, config = {}) => {
  const res = await api.post(url, body, config);
  return res.data;
};

const put = async (url, body = {}, config = {}) => {
  const res = await api.put(url, body, config);
  return res.data;
};

const del = async (url, config = {}) => {
  const res = await api.delete(url, config);
  return res.data;
};

const patch = async (url, body = {}, config = {}) => {
  const res = await api.patch(url, body, config);
  return res.data;
};

const setAuthToken = (token) => {
  if (token) {
    sessionStorage.setItem('token', token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

const clearAuthToken = () => {
  sessionStorage.removeItem('token');
  delete api.defaults.headers.common.Authorization;
};

export default api;
export { get, post, put, del as deleteRequest, patch, setAuthToken, clearAuthToken };
