"use client";

import { fetchCommentsAction } from "@/lib/action";
import type { PostData, PostWithComments, Replies } from "@/lib/types";
import { useEffect, useState } from "react";
import GetCommentsComponent from "./GetCommentsComp";
import PostCardComp from "../Posts/PostCardComp";

type PostsChildren = {
  data: PostData;
  kind: string;
}[];

const PostWithCommentsComponent = ({ params }: { params: string[] }) => {
  const [listing, setListing] = useState<PostWithComments>();

  useEffect(() => {
    const fetchComms = async () => {
      const res = await fetchCommentsAction(params[2]);
      if (res && res[0] && res[1]) {
        setListing(res);
      }
    };
    fetchComms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!listing || !listing[0] || !listing[1]) {
    return;
  }

  console.log(listing);
  const post: PostsChildren = listing[0].data.children;
  const replies = listing[1] as unknown as Replies;

  return (
    <div className="flex flex-col max-w-[40vw] mx-auto ">
      <PostCardComp post={post[0]} />

      <GetCommentsComponent replies={replies} />
    </div>
  );
};

export default PostWithCommentsComponent;
