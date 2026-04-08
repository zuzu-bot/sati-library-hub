import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (data: any) => API.post('/login.php', data),
  register: (data: any) => API.post('/register.php', data),
  getAllUsers: () => API.get('/users.php'),
};

export const bookAPI = {
  getAll: () => API.get('/books.php'),
  getOne: (id: number) => API.get(`/books.php?id=${id}`),
  create: (data: any) => API.post('/books.php', data),
  update: (data: any) => API.put('/books.php', data),
  delete: (id: number) => API.delete(`/books.php?id=${id}`),
};

export const aiAPI = {
  getRecommendations: () => API.get('/recommend-books.php'),
  getSummary: (title: string) => API.post('/ai_summary.php', { title }),
};

export default API;
