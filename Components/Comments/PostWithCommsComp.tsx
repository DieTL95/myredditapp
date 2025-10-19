"use client";

import { fetchCommentsAction } from "@/lib/action";
import type { PostData, PostWithComments, Replies } from "@/lib/types";
import { useEffect, useState } from "react";
import GetCommentsComponent from "./GetCommentsComp";
import PostCardComp from "../Posts/PostCardComp";
import CommentSubmittionComponent from "../Submittions/CommentSubmittion";
import Link from "next/link";

type PostsChildren = {
  data: PostData;
  kind: string;
}[];

const PostWithCommentsComponent = ({ params }: { params: string[] }) => {
  const [context, setContext] = useState(2);
  const [listing, setListing] = useState<PostWithComments>();

  useEffect(() => {
    const fetchComms = async () => {
      const res = await fetchCommentsAction(params[2], params[4], context);
      if (res && res[0] && res[1]) {
        setListing(res);
      }
    };
    fetchComms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context]);

  if (!listing || !listing[0] || !listing[1]) {
    return;
  }

  console.log(listing);
  const post: PostsChildren = listing[0].data.children;
  const replies = listing[1] as unknown as Replies;

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
