import { useRequest } from 'ahooks';
import useSWR from 'swr';

import { deleteUserByID, getUsers } from '@/services/user';
import { GetUsersRequest } from '@/type/user';

export function useUsers(req: GetUsersRequest) {
  const { data, isValidating, mutate } = useSWR(
    '/auth/users' + JSON.stringify(req),
    () => getUsers(req),
  );

  const users = data?.data;
  const isFetching = isValidating;
  const refetch = mutate;
  const total = data?.total;

  return {
    users,
    isFetching,
    refetch,
    total,
  };
}

export function useDeleteUserByID() {
  const { loading: deleteLoading, runAsync: deleteUser } = useRequest(
    deleteUserByID,
    {
      manual: true,
    },
  );

  return {
    deleteLoading,
    deleteUser,
  };
}
