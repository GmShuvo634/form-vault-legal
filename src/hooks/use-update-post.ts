// src/hooks/useUpdatePost.ts
import { updatePost } from '@/services/post.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UpdatePostInput = {
  id: string;
  formData: FormData;
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: UpdatePostInput) => updatePost(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
