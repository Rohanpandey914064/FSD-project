import axios from 'axios';

const API_BASE = '/api';

// Automatically attach Bearer token to all outgoing requests if logged in
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('codingx_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  getProfile: async () => {
    const res = await axios.get(`${API_BASE}/auth/me`);
    return res.data;
  },

  login: async (email, password) => {
    const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
    if (res.data?.token) {
      localStorage.setItem('codingx_token', res.data.token);
      localStorage.setItem('codingx_user', JSON.stringify(res.data.user));
    }
    return res.data;
  },

  register: async (username, email, password) => {
    const res = await axios.post(`${API_BASE}/auth/register`, { username, email, password });
    if (res.data?.token) {
      localStorage.setItem('codingx_token', res.data.token);
      localStorage.setItem('codingx_user', JSON.stringify(res.data.user));
    }
    return res.data;
  },

  logout: async () => {
    try {
      await axios.post(`${API_BASE}/auth/logout`);
    } catch {
      // ignore
    } finally {
      localStorage.removeItem('codingx_token');
      localStorage.removeItem('codingx_user');
    }
  },

  getCurrentUser: () => {
    try {
      const stored = localStorage.getItem('codingx_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  getToken: () => {
    return localStorage.getItem('codingx_token');
  },
};

export const problemApi = {
  getProblems: async (params = {}) => {
    const res = await axios.get(`${API_BASE}/problems`, { params });
    return res.data;
  },

  getProblemById: async (idOrSlug) => {
    const res = await axios.get(`${API_BASE}/problems/${idOrSlug}`);
    return res.data;
  },

  runCode: async (problemId, language, code) => {
    const res = await axios.post(`${API_BASE}/problems/${problemId}/run`, { language, code });
    return res.data;
  },

  submitCode: async (problemId, language, code) => {
    const res = await axios.post(`${API_BASE}/problems/${problemId}/submit`, { language, code });
    return res.data;
  },
};

export const contestApi = {
  getContests: async () => {
    const res = await axios.get(`${API_BASE}/contests`);
    return res.data;
  },

  getLeaderboard: async () => {
    const res = await axios.get(`${API_BASE}/contests/leaderboard`);
    return res.data;
  },
};

export default { authApi, problemApi, contestApi };
