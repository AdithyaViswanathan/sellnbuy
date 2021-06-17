import { privateApi } from './api';

export const getAllProducts = () => {
  return privateApi.get('/products');
};

export const addProduct = data => {
  return privateApi.post('/products', data);
};

export const getUserProducts = data => {
  return privateApi.get('/inventory');
};