"use client";

import { useFrontPage } from "@/lib/utils";
import type { QueriesPages } from "@/lib/types";
import LoaderComponent from "../Misc/LoaderComp";
import FeedPostsComp from "../Posts/FeedPostsComp";
import { Suspense } from "react";
import PostsSkeleton from "../LoadingSkeletons/PostsSkeleton";

const FrontPageComponent = () => {
  const {
    data,
    fetchNextPage,

    hasNextPage,
    isFetching,
    isLoading,
  } = useFrontPage();

  console.log(isFetching, isLoading);

  if (!data && !isLoading) {
    return <div>No posts found.</div>;
  }

  return isLoading ? (
    <PostsSkeleton />
  ) : (
    <Suspense fallback={<PostsSkeleton />}>
      <div>
        <FeedPostsComp redditData={data as unknown as QueriesPages} />
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
      </div>{" "}
    </Suspense>
  );
};

export default FrontPageComponent;
