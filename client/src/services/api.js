import axios from 'axios';

const API_BASE = '/api';

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

export const authApi = {
  getProfile: async () => {
    const res = await axios.get(`${API_BASE}/auth/me`);
    return res.data;
  },
};
