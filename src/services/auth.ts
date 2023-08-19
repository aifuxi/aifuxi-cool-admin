import { GeneralResponse, SignInRequest, SignInResponse } from '@/type';
import { x } from '@/utils/request';

export function signIn(data: SignInRequest) {
  return x.post('/public/sign_in', data) as Promise<
    GeneralResponse<SignInResponse>
  >;
}
