import { getPostApi } from '@/api/post/post';
import { useQuery } from '@tanstack/react-query';

const POST_QUERY_KEY = 'post';

export const useGetPost = () => {
  return useQuery({
    queryKey: [POST_QUERY_KEY],
    queryFn: getPostApi,
  });
};
