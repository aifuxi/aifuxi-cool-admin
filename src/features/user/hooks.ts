import { useMutation, useQuery } from 'react-query';

import {
  createUser,
  deleteUserByID,
  getUsers,
  updateUserByID,
} from '@/services/user';
import {
  CreateUserRequest,
  GetUsersRequest,
  UpdateUserRequest,
} from '@/type/user';

export const useUsers = (req: GetUsersRequest) => {
  return useQuery({
    queryKey: ['users', req],
    queryFn: () => getUsers(req),
  });
};

export const useDeleteUser = (onSuccess: () => void) => {
  return useMutation({
    mutationKey: 'delete user',
    mutationFn: (id: string) => deleteUserByID(id),
    onSuccess: () => {
      onSuccess();
    },
  });
};

export const useCreateUser = (onSuccess: () => void) => {
  return useMutation({
    mutationKey: 'create user',
    mutationFn: (arg: CreateUserRequest) => createUser(arg),
    onSuccess: () => {
      onSuccess();
    },
  });
};

export const useUpdateUser = (onSuccess: () => void) => {
  return useMutation({
    mutationKey: 'update user',
    mutationFn: (arg: UpdateUserRequest & { id: string }) =>
      updateUserByID(arg.id, arg),
    onSuccess: () => {
      onSuccess();
    },
  });
};
