import { ORDER_BY_ENUM, ORDER_ENUM } from '@/constants/unknown';
import { GetArticlesRequest } from '@/type/article';
import { GetTagsRequest } from '@/type/tag';

export const defaultGetArticlesReq: GetArticlesRequest = {
  page: 1,
  page_size: 10,
  order: ORDER_ENUM.DESC,
  order_by: ORDER_BY_ENUM.CREATED_AT,
};

export const getAllTagsReq: GetTagsRequest = {
  page: 1,
  page_size: 100,
  order: 'desc',
  order_by: 'created_at',
};
