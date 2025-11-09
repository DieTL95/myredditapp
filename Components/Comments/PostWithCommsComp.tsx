"use client";

import type { PostData, Replies } from "@/lib/types";
import { useState } from "react";
import GetCommentsComponent from "./GetCommentsComp";
import PostCardComp from "../Posts/PostCardComp";
import CommentSubmittionComponent from "../Submittions/CommentSubmittion";
import Link from "next/link";
import PostWithRepliesSkeleton from "../LoadingSkeletons/PostWithRepliesSkeleton";
import { usePostComments } from "@/lib/utils";

type PostsChildren = {
  data: PostData;
  kind: string;
}[];

const PostWithCommentsComponent = ({ params }: { params: string[] }) => {
  const [context, setContext] = useState(2);

  console.log(params);

  const { data, isPending } = usePostComments(
    params[2],
    params[4],
    context
  );

  console.log(data);

  if (!data && isPending) {
    return <PostWithRepliesSkeleton />;
  } else if (!data) {
    return "Post not found";
  }

  const post: PostsChildren = data[0].data.children;
  const replies = data[1] as unknown as Replies;

  return (
    <div className="flex flex-col h-full mx-auto">
      <PostCardComp post={post[0]} />
      {post[0].data.send_replies && (
        <CommentSubmittionComponent parentId={post[0].data.name} />
      )}

      {params[4] && (
        <div className="flex gap-2">
          <span onClick={() => setContext((prev) => prev + 2)}>
            Show more context.
          </span>
          {post[0].data.num_comments > 1 && (
            <Link href={post[0].data.permalink}>See all comments.</Link>
          )}
        </div>
      )}
      <GetCommentsComponent replies={replies} />
    </div>
  );
};

export default PostWithCommentsComponent;
