import { ORDER_BY_ENUM, ORDER_ENUM } from '@/constants/unknown.ts';
import { GetUsersRequest } from '@/type/user';

export const defaultGetUsersReq: GetUsersRequest = {
  page: 1,
  page_size: 10,
  order: ORDER_ENUM.DESC,
  order_by: ORDER_BY_ENUM.CREATED_AT,
};
