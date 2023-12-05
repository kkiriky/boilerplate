import {
  deleteUserApi,
  deleteUsersApi,
  editUsersApi,
  getUsersApi,
} from '@/api/user/user';
import { MockUser } from '@/api/user/user.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';

const USER_QUERY_KEY = 'users';

export const useGetUsers = () => {
  return useQuery({
    queryKey: [USER_QUERY_KEY],
    queryFn: getUsersApi,
    initialData: [],
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserApi,
    onSuccess: (_, id) => {
      queryClient.setQueryData<MockUser[]>([USER_QUERY_KEY], (oldData) => {
        if (!oldData) return [];

        return oldData.filter((user) => user.id !== id);
      });
    },
  });
};

export const useDeleteUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUsersApi,
    onSuccess: (_, idList) => {
      queryClient.setQueryData<MockUser[]>([USER_QUERY_KEY], (oldData) => {
        if (!oldData) return [];

        return oldData.filter((user) => !idList.includes(user.id));
      });
    },
  });
};

export const useEditUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editUsersApi,
    onSuccess: (_, editedUsers) => {
      queryClient.setQueryData<MockUser[]>([USER_QUERY_KEY], (oldData) =>
        produce(oldData, (draft) => {
          if (!draft) return [];

          for (const editedUser of editedUsers) {
            const index = draft.findIndex((user) => user.id === editedUser.id);
            draft[index] = editedUser;
          }
        })
      );
    },
  });
};
