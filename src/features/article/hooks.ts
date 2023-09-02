import { useMutation, useQuery } from 'react-query';

import {
  createArticle,
  deleteArticleByID,
  getArticleByID,
  getArticles,
  updateArticleByID,
} from '@/services/article';
import {
  CreateArticleRequest,
  GetArticlesRequest,
  UpdateArticleRequest,
} from '@/type/article';

export const useArticles = (req: GetArticlesRequest) => {
  return useQuery({
    queryKey: ['articles', req],
    queryFn: () => getArticles(req),
  });
};

export const useArticle = (id: string) => {
  return useQuery({
    queryKey: ['article', id],
    enabled: Boolean(id),
    queryFn: () => getArticleByID(id),
  });
};

export const useDeleteArticle = (onSuccess: () => void) => {
  return useMutation({
    mutationKey: 'delete article',
    mutationFn: (id: string) => deleteArticleByID(id),
    onSuccess: () => {
      onSuccess();
    },
  });
};

export const useCreateArticle = (onSuccess: () => void) => {
  return useMutation({
    mutationKey: 'create article',
    mutationFn: (arg: CreateArticleRequest) => createArticle(arg),
    onSuccess: () => {
      onSuccess();
    },
  });
};

export const useUpdateArticle = (onSuccess: () => void) => {
  return useMutation({
    mutationKey: 'update article',
    mutationFn: (arg: UpdateArticleRequest & { id: string }) =>
      updateArticleByID(arg.id, arg),
    onSuccess: () => {
      onSuccess();
    },
  });
};
