import { useMutation, useQuery } from 'react-query';

import {
  createTag,
  deleteTagByID,
  getTags,
  updateTagByID,
} from '@/services/tag';
import { CreateTagRequest, GetTagsRequest, UpdateTagRequest } from '@/type/tag';

export const useTags = (req: GetTagsRequest) => {
  return useQuery({
    queryKey: ['tags', req],
    queryFn: () => getTags(req),
  });
};

export const useDeleteTag = (onSuccess: () => void) => {
  return useMutation({
    mutationKey: 'delete tag',
    mutationFn: (id: string) => deleteTagByID(id),
    onSuccess: () => {
      onSuccess();
    },
  });
};

export const useCreateTag = (onSuccess: () => void) => {
  return useMutation({
    mutationKey: 'create tag',
    mutationFn: (arg: CreateTagRequest) => createTag(arg),
    onSuccess: () => {
      onSuccess();
    },
  });
};

export const useUpdateTag = (onSuccess: () => void) => {
  return useMutation({
    mutationKey: 'update tag',
    mutationFn: (arg: UpdateTagRequest & { id: string }) =>
      updateTagByID(arg.id, arg),
    onSuccess: () => {
      onSuccess();
    },
  });
};
