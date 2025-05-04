import { useGetAllPost } from "@/hooks/use-get-all-post";
import PostCard from "@/components/PostCard";

const PostList = () => {
  const { data: posts, isLoading } = useGetAllPost();

  if (isLoading) return <div className="text-center py-6">Loading...</div>;

  return (
    <div className="space-y-4">
      {posts?.length === 0 ? (
        <div className="text-center text-gray-500">No posts yet</div>
      ) : (
        posts?.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
};

export default PostList;
