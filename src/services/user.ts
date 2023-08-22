import { GeneralResponse, PaginationRequest, TotalResponse } from '@/type';
import { CreateUserRequest, UpdateUserRequest, User } from '@/type/user';
import { x } from '@/utils/request';
import { obj2QueryString } from '@/utils/url';

export function getUsers(data: PaginationRequest) {
  return x.get(`/auth/users${obj2QueryString(data)}`) as Promise<
    TotalResponse<User[]>
  >;
}

export function createUser(data: CreateUserRequest) {
  return x.post('/auth/users', data) as Promise<GeneralResponse<User>>;
}

export function updateUserByID(id: string, data: UpdateUserRequest) {
  return x.put(`/auth/users/${id}`, data) as Promise<GeneralResponse<null>>;
}

export function deleteUserByID(id: string) {
  return x.delete(`/auth/users/${id}`) as Promise<GeneralResponse<null>>;
}
