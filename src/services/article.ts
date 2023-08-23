import { GeneralResponse, PaginationRequest, TotalResponse } from '@/type';
import {
  Article,
  CreateArticleRequest,
  UpdateArticleRequest,
} from '@/type/article';
import { x } from '@/utils/request';
import { obj2QueryString } from '@/utils/url';

export function getArticles(data: PaginationRequest) {
  return x.get(`/auth/articles${obj2QueryString(data)}`) as Promise<
    TotalResponse<Article[]>
  >;
}

export function createArticle(data: CreateArticleRequest) {
  return x.post('/auth/articles', data) as Promise<GeneralResponse<Article>>;
}

export function updateArticleByID(id: string, data: UpdateArticleRequest) {
  return x.put(`/auth/articles/${id}`, data) as Promise<GeneralResponse<null>>;
}

export function deleteArticleByID(id: string) {
  return x.delete(`/auth/articles/${id}`) as Promise<GeneralResponse<null>>;
}
