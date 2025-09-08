"use client";
import { usePosts } from "@/lib/utils";
import type { QueriesPages } from "@/lib/types";
import LoaderComponent from "../Misc/LoaderComp";
import FeedPostsComp from "../Posts/FeedPostsComp";
import PostsSkeleton from "../LoadingSkeletons/PostsSkeleton";
const SubPathComponent = ({
  subreddit,
  sort,
}: {
  subreddit: string;
  sort: string;
}) => {
  const redditType = "subreddit";

  const {
    data,
    fetchNextPage,

    hasNextPage,
    isPending,
    isFetching,
    isLoading,
  } = usePosts(subreddit, sort || "hot", redditType);
  return isPending ? (
    <PostsSkeleton />
  ) : (
    <>
      {data && !isLoading && (
        <FeedPostsComp redditData={data as unknown as QueriesPages} />
      )}
      {data && hasNextPage && (
        <div className="flex flex-col justify-center mx-auto">
          <button
            className="mx-auto w-24 h-10 cursor-pointer bg-pink-800 text-pink-200 hover:bg-pink-700 disabled:bg-gray-700 disabled:cursor-default disabled:text-gray-400"
            onClick={() => fetchNextPage()}
            disabled={isFetching || isLoading || !hasNextPage}
          >
            {isLoading || isFetching ? <LoaderComponent /> : "Next Page"}
          </button>
        </div>
      )}
    </>
  );
};

export default SubPathComponent;
