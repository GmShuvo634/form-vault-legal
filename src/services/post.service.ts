import { CreatePostInput } from '@/hooks/use-create-post';
import API from '../lib/axios';

export const createPost = async (formData: CreatePostInput) => {
  const { data } = await API.post('/posts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const getAllPosts = async () => {
  const { data } = await API.get('/posts');
  return data;
};

export const updatePost = async (id: string, formData: CreatePostInput) => {
  const { data } = await API.put(`/posts/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const deletePost = async (id: string) => {
  const { data } = await API.delete(`/posts/${id}`);
  return data;
};
