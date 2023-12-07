import axios from 'axios';

export const getPostApi = async () => {
  const { data } = await axios.get('/api/post');
  return data;
};
