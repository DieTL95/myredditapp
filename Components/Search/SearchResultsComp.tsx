"use client";
import type { QueriesPages } from "@/lib/types";
import { usePosts } from "@/lib/utils";
import LoaderComponent from "../Misc/LoaderComp";
import FeedPostsComp from "../Posts/FeedPostsComp";
import PostsSkeleton from "../LoadingSkeletons/PostsSkeleton";

const SearchResultsComponent = ({
  query,
  sort,
}: {
  query: string;
  sort: string;
}) => {
  const redditType = "search";
  const {
    data,
    fetchNextPage,

    hasNextPage,
    isPending,
    isFetching,
    isLoading,
  } = usePosts(query, sort, redditType);
  return isPending ? (
    <PostsSkeleton />
  ) : (
    <div>
      {data && !isLoading && (
        <FeedPostsComp redditData={data as unknown as QueriesPages} />
      )}
      {data && hasNextPage && (
        <div className="flex flex-col justify-center mx-auto">
          <button
            className="mx-auto w-24 h-10 cursor-pointer bg-pink-800 text-pink-200 hover:bg-pink-700 disabled:bg-gray-700 disabled:text-gray-400"
            onClick={() => fetchNextPage()}
            disabled={isFetching || isLoading || !hasNextPage}
          >
            {isLoading || isFetching ? <LoaderComponent /> : "Next Page"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResultsComponent;
