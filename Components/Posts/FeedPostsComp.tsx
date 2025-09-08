"use client";
import type { Comments, Post, QueriesPages } from "@/lib/types";

import PostCardComp from "./PostCardComp";
import RepliesComponent from "../Comments/RepliesComp";

const FeedPostsComp = ({
  redditData,
  userIcon,
}: {
  redditData: QueriesPages;
  userIcon?: string;
}) => {
  console.log(redditData);
  return (
    <div className="flex flex-col max-w-[40vw] mx-auto ">
      {redditData.pages.map((pages, pageIndex) => (
        <div key={pageIndex}>
          {pages.children.map((post: Post) =>
            post.kind === "t1" ? (
              <RepliesComponent
                key={post.data.name}
                reply={post.data as unknown as Comments}
                userIcon={userIcon}
              />
            ) : (
              <PostCardComp
                post={post}
                userIcon={userIcon}
                key={post.data.id}
              />
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default FeedPostsComp;
