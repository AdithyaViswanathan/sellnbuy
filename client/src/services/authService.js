import { privateApi, publicApi } from './api';

export const signupUser = data => {
  return publicApi.post('/users', data);
};

export const signinUser = data => {
  return publicApi.post('/users/login', data);
};

export const getIsAuthenticated = () => {
  return privateApi.get('/users/isAuthenticated');
};
