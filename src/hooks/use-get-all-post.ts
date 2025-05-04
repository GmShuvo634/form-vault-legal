import { getAllPosts } from '@/services/post.service';
import { useQuery } from '@tanstack/react-query';

export const useGetAllPost = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getAllPosts,
  });
};
