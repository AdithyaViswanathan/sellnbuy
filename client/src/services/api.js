import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1';

const publicApi = axios.create({
  baseURL: BASE_URL,
});

const privateApi = axios.create({
  baseURL: BASE_URL,
});

privateApi.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export { publicApi, privateApi };
