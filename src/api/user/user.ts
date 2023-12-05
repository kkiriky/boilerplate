import axios from 'axios';
import { MockUser } from './user.types';

export const getUsersApi = async () => {
  const { data } = await axios.get<MockUser[]>('/api/users');
  return data;
};

export const deleteUserApi = async (id: number) => {
  const { data } = await axios.delete('/api/user', { data: { id } });
  return data;
};

export const deleteUsersApi = async (idList: number[]) => {
  const { data } = await axios.delete('/api/users', { data: idList });
  return data;
};

export const editUsersApi = async (users: MockUser[]) => {
  const { data } = await axios.patch('/api/users', users);
  return data;
};
