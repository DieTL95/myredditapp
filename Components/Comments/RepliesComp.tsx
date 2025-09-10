import type { Comments } from "@/lib/types";
import Link from "next/link";
import VotesComponent from "../Posts/VotesComp";
import { FaRegComment } from "react-icons/fa";
import { cn, relativeTimeFromElapsed } from "@/lib/utils";
import { TbPin } from "react-icons/tb";

import UserIconComponent from "../Misc/UserIconComp";
import { FiClock } from "react-icons/fi";
import TextComponent from "../Misc/TextComp";

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
                  " text-white  rounded-md hover:opacity-65",
                  reply.is_submitter &&
                    "text-pink-400 font-bold after:content-['[S]']",
                  reply.distinguished === "moderator" &&
                    "text-emerald-600 font-bold after:content-['[M]']"
                )}
              >
                {" "}
                u/<span>{reply.author}</span>{" "}
              </Link>

              <time
                className="flex-row flex gap-1 items-center"
                dateTime={new Date(reply.created * 1000).toLocaleString()}
                title={new Date(reply.created * 1000).toLocaleString()}
              >
                <FiClock />
                {relativeTimeFromElapsed(reply.created)}
              </time>
              {reply.stickied && (
                <span className="flex-row flex gap-1 items-center">
                  <TbPin />
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

        <div className="flex flex-row gap-0.5">
          <span className="flex-row flex gap-2 items-center">
            {reply.replies && reply.replies.data.children.length}{" "}
            <FaRegComment />
          </span>

          <div>
            <VotesComponent post={reply} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepliesComponent;
