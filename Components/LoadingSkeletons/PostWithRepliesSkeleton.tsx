import InlinePostSkeleton from "./InlinePostSkeleton";
import RepliesSkeleton from "./RepliesSkeleton";

const PostWithRepliesSkeleton = () => {
  return (
    <>
      <InlinePostSkeleton />
      <RepliesSkeleton />
    </>
  );
};

export default PostWithRepliesSkeleton;
