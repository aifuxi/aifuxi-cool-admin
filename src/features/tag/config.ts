import { ORDER_BY_ENUM, ORDER_ENUM } from '@/constants/unknown.ts';
import { GetTagsRequest } from '@/type/tag';

export const defaultGetTagsReq: GetTagsRequest = {
  page: 1,
  page_size: 10,
  order: ORDER_ENUM.DESC,
  order_by: ORDER_BY_ENUM.CREATED_AT,
};
