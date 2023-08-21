import { GeneralResponse, PaginationRequest, TotalResponse } from '@/type';
import { CreateTagRequest, Tag, UpdateTagRequest } from '@/type/tag';
import { x } from '@/utils/request';
import { obj2QueryString } from '@/utils/url';

export function getTags(data: PaginationRequest) {
  return x.get(`/auth/tags${obj2QueryString(data)}`) as Promise<
    TotalResponse<Tag[]>
  >;
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
