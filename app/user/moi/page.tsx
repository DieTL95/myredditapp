"use client";
import PostsSkeleton from "@/Components/LoadingSkeletons/PostsSkeleton";
import { getRedditToken } from "@/lib/action";
import type { RedditData } from "@/lib/types";
import { useEffect } from "react";

const AssAssPage = () => {
  useEffect(() => {
    const ass = async () => {
      const accessToken = await getRedditToken();

      const res = await fetch(
        `https://oauth.reddit.com/r/friends/hot?t=all&raw_json=1&sr_detail=true&after=`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",

            authorization: `bearer ${accessToken}`,
          },
        }
      );

      if (res.ok) {
        const { data } = await res.json();
        console.log(data);
        return data as RedditData;
      }
    };
    ass();
  }, []);
  return (
    <div>
      <PostsSkeleton />
    </div>
  );
};

export default AssAssPage;
