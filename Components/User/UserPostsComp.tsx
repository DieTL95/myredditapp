"use client";
import type { QueriesPages } from "@/lib/types";
import { usePosts } from "@/lib/utils";
import LoaderComponent from "../Misc/LoaderComp";
import FeedPostsComp from "../Posts/FeedPostsComp";
import PostsSkeleton from "../LoadingSkeletons/PostsSkeleton";

const UserPostsComponent = ({
  username,
  page,
  userIcon,
}: {
  username: string;
  page?: string;
  userIcon?: string;
}) => {
  const sort = "new";
  const redditType = "user";
  const {
    data,
    fetchNextPage,

    hasNextPage,
    isPending,
    isFetching,
    isLoading,
  } = usePosts(username, sort, redditType, page || "overview");
  if (!data) {
    return <div>User doesn&apos;t exist.</div>;
  }
  console.log(data);
  return isPending ? <PostsSkeleton/> : (
    <div>
      {data && !isLoading && (
        <FeedPostsComp
          redditData={data as unknown as QueriesPages}
          userIcon={userIcon}
        />
      )}
      {data && hasNextPage && (
        <div className="flex flex-col justify-center mx-auto">
          <button
            className="mx-auto w-24 h-10 cursor-pointer bg-pink-800 text-pink-200 hover:bg-pink-700 disabled:cursor-default"
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

export default UserPostsComponent;
