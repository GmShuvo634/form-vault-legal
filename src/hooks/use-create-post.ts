// src/hooks/use-create-post.ts
import { createPost } from '@/services/post.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type CreatePostInput = {
  description: string;
  attachment?: File | null;
  createdBy?: string;
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePostInput) => createPost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
