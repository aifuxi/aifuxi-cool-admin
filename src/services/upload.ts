import { GeneralResponse } from '@/type';
import { x } from '@/utils/request';

export function uploadFile(data: FormData) {
  return x.post(`/auth/uploads`, data) as Promise<GeneralResponse<string>>;
}
