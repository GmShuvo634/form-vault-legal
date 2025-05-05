import { useGetAllPost } from "@/hooks/use-get-all-post";
import PostCard from "@/components/PostCard";

const PostList = () => {
  const { data: posts, isLoading } = useGetAllPost();

  if (isLoading) return <div className="text-center py-6">Loading...</div>;

  return (
    <div className="space-y-6">
      {/* <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">
          A Writ of Quo Warranto is not a lawsuit... it's much better.
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          It is a legal action that challenges a person's right to hold a public office or corporate position.
          The term comes from Medieval Latin and means <em>"by what authority"</em>.
        </p>
        <div className="mt-2 text-sm text-gray-500">
          <strong>Utah Supreme Court Case #20250135</strong>
        </div>
      </div> */}

      {posts?.length === 0 ? (
        <div className="text-center text-gray-500">No posts yet</div>
      ) : (
        posts?.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
};

export default PostList;
