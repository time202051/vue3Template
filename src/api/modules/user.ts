import { instance } from '@/api';

export const getUserList = (params?: any) => {
  return instance.get('/user/list', { params });
};
