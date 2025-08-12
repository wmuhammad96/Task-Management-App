import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

export const endpoints = {
  tasks: import.meta.env.VITE_TASKS_ENDPOINT,
  admin: import.meta.env.VITE_ADMIN_ENDPOINT,
  userData: import.meta.env.VITE_USERDATA_ENDPOINT
};

export default api;