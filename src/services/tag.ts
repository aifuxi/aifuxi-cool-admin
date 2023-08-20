import { GeneralResponse } from '@/type';
import { Tag } from '@/type/tag';
import { x } from '@/utils/request';

export function getTags() {
  return x.get('/auth/tags') as Promise<GeneralResponse<Tag[]>>;
}
