import { GeneralResponse } from '@/type';
import { CreateTagRequest, Tag, UpdateTagRequest } from '@/type/tag';
import { x } from '@/utils/request';

export function getTags() {
  return x.get('/auth/tags') as Promise<GeneralResponse<Tag[]>>;
}

export function createTag(data: CreateTagRequest) {
  return x.post('/auth/tags', data) as Promise<GeneralResponse<Tag>>;
}

export function updateTagByID(id: string, data: UpdateTagRequest) {
  return x.put(`/auth/tags/${id}`, data) as Promise<GeneralResponse<null>>;
}

export function deleteTagByID(id: string) {
  return x.delete(`/auth/tags/${id}`) as Promise<GeneralResponse<null>>;
}
