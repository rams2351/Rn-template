import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api-url.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor (Add Token)
api.interceptors.request.use(
  async config => {
    // TODO: Get token from MMKV
    const token = undefined;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

export default api;
