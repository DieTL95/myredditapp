import type { Comments } from "@/lib/types";
import Link from "next/link";
import { cn, relativeTimeFromElapsed } from "@/lib/utils";
import UserIconComponent from "../Misc/UserIconComp";
import TextComponent from "../Misc/TextComp";
import CommentsActionsComponent from "./CommentsActionsComp";
import { Clock, Pin } from "lucide-react";
import AuthorFlairComp from "../Misc/AuthorFlairComp";

const RepliesComponent = ({
  reply,
  parent,
  userIcon,
}: {
  reply: Comments;
  parent?: string;
  userIcon?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-row w-full  pr-4",
        parent !== "post" && "pl-4 py-2 border-b border-b-twitter-gray"
      )}
    >
      <div className="h-full w-fit mr-[8px] mt-1">
        <UserIconComponent userIcon={userIcon} reply={reply} />
      </div>

      <div className="flex flex-col py-2 w-full  ">
        <div className="flex flex-col">
          <div className="flex flex-col gap-1">
            <div className=" gap-2  flex-row flex">
              {parent !== "post" && (
                <Link
                  href={`/r/${reply.subreddit}`}
                  className="font-bold hover:opacity-50"
                >
                  r/{reply.subreddit}
                </Link>
              )}

              {/* {userCard && (
            <div
              className="h-[300px] w-[360px] bg-black border border-twitter-gray"
              onMouseLeave={hoverUnhandle}
            >
              <UserCardComponent userInfo={userCard} />
            </div>
          )} */}
              <Link
                href={
                  reply.author === "[deleted]" ? "" : `/user/${reply.author}`
                }
                className={cn(
                  " text-white font-bold  rounded-md hover:opacity-65",
                  reply.is_submitter &&
                    "text-pink-400 font-bold after:content-['[S]']",
                  reply.distinguished === "moderator" &&
                    "text-emerald-600 font-bold after:content-['[M]']"
                )}
              >
                {" "}
                u/<span>{reply.author}</span>{" "}
              </Link>
              {(reply.author_flair_richtext?.[0] ||
                reply.author_flair_text) && <AuthorFlairComp post={reply} />}
              <time
                className="flex-row flex gap-1 items-center"
                dateTime={new Date(reply.created * 1000).toLocaleString()}
                title={new Date(reply.created * 1000).toLocaleString()}
              >
                <Clock strokeWidth={2} size={18} />
                {relativeTimeFromElapsed(reply.created)}
              </time>
              {reply.stickied && (
                <span className="flex-row flex gap-1 items-center">
                  <Pin strokeWidth={2} size={18} />
                </span>
              )}
            </div>
            {parent !== "post" && (
              <div className="flex flex-row gap-1 ">
                <div>
                  <Link
                    href={`${reply.permalink}`}
                    className="font-bold hover:opacity-50"
                  >
                    {reply.link_title.replace(/&amp;/g, "&")}
                  </Link>{" "}
                </div>
              </div>
            )}
          </div>
        </div>
        {reply.body_html && <TextComponent post={reply.body_html} />}

        <CommentsActionsComponent reply={reply} />
      </div>
    </div>
  );
};

export default RepliesComponent;
