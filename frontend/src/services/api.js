import axios from 'axios';

const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Job API functions
export const jobsAPI = {
  // Get all jobs
  getAll: async () => {
    try {
      const response = await api.get('/jobs');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch jobs');
    }
  },

  // Get single job by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch job');
    }
  },

  // Create new job
  create: async (jobData) => {
    try {
      const response = await api.post('/jobs', jobData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create job';
      const errors = error.response?.data?.errors;
      throw { message, errors };
    }
  },

  // Update job
  update: async (id, jobData) => {
    try {
      const response = await api.put(`/jobs/${id}`, jobData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update job';
      const errors = error.response?.data?.errors;
      throw { message, errors };
    }
  },

  // Delete job
  delete: async (id) => {
    try {
      const response = await api.delete(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete job');
    }
  }
};

export default api;