import type { Replies, RepliesChildren } from "@/lib/types";

import RepliesComponent from "./RepliesComp";
import { cn } from "@/lib/utils";

const GetCommentsComponent = ({ replies }: { replies: Replies }) => {
  const loadMoreReplies = (childReplies: RepliesChildren) => {
    return childReplies.map(
      (baby, index) =>
        baby.kind === "t1" && (
          <div
            className={cn(
              "ml-4  my-2 border-l border-l-twitter-gray box-border ",
              index === replies.data.children.length - 1 && "border-b-0"
            )}
            key={baby.data.name}
          >
            <div className=" ml-4 border-b border-b-twitter-gray">
              <RepliesComponent reply={baby.data} parent={"post"} />
              {baby.data.replies &&
                loadMoreReplies(baby.data.replies.data.children)}
            </div>
          </div>
        )
    );
  };
  return (
    <div>
      {replies.data.children.map(
        (reply, index) =>
          reply.kind === "t1" && (
            <div
              key={reply.data.name}
              className={cn(
                "py-2 my-2 pl-4 box-border border-b border-b-twitter-gray",
                index === replies.data.children.length - 1 && "border-none"
              )}
            >
              <RepliesComponent reply={reply.data} parent={"post"} />
              {reply.data.replies &&
                loadMoreReplies(reply.data.replies.data.children)}
            </div>
          )
      )}
    </div>
  );
};

export default GetCommentsComponent;
