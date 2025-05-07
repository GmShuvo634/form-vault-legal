// src/hooks/useUpdatePost.ts
import { updatePost } from '@/services/post.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UpdatePostInput = {
  id: string;
  description: string,
  attachment: File
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, description, attachment }: UpdatePostInput) => updatePost(id, { description, attachment }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
