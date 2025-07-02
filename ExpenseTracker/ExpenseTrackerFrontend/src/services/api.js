import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const expenseAPI = {
  getExpenses: (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });
    return api.get(`/expenses?${params}`);
  },
  createExpense: (expense) => api.post('/expenses', expense),
  updateExpense: (id, expense) => api.put(`/expenses/${id}`, expense),
  deleteExpense: (id) => api.delete(`/expenses/${id}`),
  getTopDays: (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });
    console.log('API call getTopDays with URL:', `/expenses/stats/top-days?${params}`);
    return api.get(`/expenses/stats/top-days?${params}`);
  },
  getMonthlyChange: (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });
    console.log('API call getMonthlyChange with URL:', `/expenses/stats/monthly-change?${params}`);
    return api.get(`/expenses/stats/monthly-change?${params}`);
  },
  getPredictions: (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });
    console.log('API call getPredictions with URL:', `/expenses/stats/predictions?${params}`);
    return api.get(`/expenses/stats/predictions?${params}`);
  },
};

export const userAPI = {
  getUsers: () => api.get('/users'),
  getUserById: (id) => api.get(`/users/${id}`),
};

export const categoryAPI = {
  getCategories: () => api.get('/categories'),
  getCategoryById: (id) => api.get(`/categories/${id}`),
};

export default api; 