import { OrderRequest, PaginationRequest } from '.';

export type Article = {
  id: string;
  title: string;
  description: string;
  cover?: string;
  content: string;
  friendly_url: string;
  is_top?: boolean;
  top_priority?: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
};

export type CreateArticleRequest = {
  title: string;
  description: string;
  cover?: string;
  content: string;
  friendly_url: string;
  is_top?: boolean;
  top_priority?: number;
};

export type GetArticlesRequest = PaginationRequest &
  OrderRequest & {
    title?: string;
    friendly_url?: string;
  };

export type UpdateArticleRequest = Partial<CreateArticleRequest>;
