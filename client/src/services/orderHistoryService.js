import { privateApi } from './api';

export const getOrderedProducts = () => {
  return privateApi.get('/orders/cart', {
    params: {
      isPurchased: 1,
    },
  });
};
