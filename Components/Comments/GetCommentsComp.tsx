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

    // for (const key in childReplies) {
    //   const child = childReplies[key];
    //   console.log(`Child: ${child.data.author}`, child);
    //   return (
    //     <div>
    //       {child.kind === "t1" && (
    //         <div className="ml-4  p-1">
    //           <RepliesComponent reply={child.data} />
    //           {child.data.replies &&
    //             child.data.replies.data.children.map(
    //               (kind) =>
    //                 kind.kind === "t1" && (
    //                   <div key={kind.data.name} className="ml-4  p-1">
    //                     <RepliesComponent reply={kind.data} />
    //                     {kind.data.replies &&
    //                       loadMoreReplies(kind.data.replies.data.children)}
    //                   </div>
    //                 )
    //             )}
    //         </div>
    //       )}
    //     </div>
    //   );
    // }
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
