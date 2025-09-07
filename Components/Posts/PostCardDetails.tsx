import type { PostData } from "@/lib/types";
import { cn, relativeTimeFromElapsed } from "@/lib/utils";
import Link from "next/link";
import { FiClock } from "react-icons/fi";
import { TbPin } from "react-icons/tb";

const PostCardDetailsComponent = ({ post }: { post: PostData }) => {
  // const [isHover, setIsHover] = useState(false);

  // let timeout: string | number | NodeJS.Timeout | undefined;
  // const hoverHandle = () => {
  //   timeout = setTimeout(async () => {
  //     setIsHover(true);
  //     const user = await fetchUserInfo(post.author);
  //     if (user) {
  //       setUserCard(user);
  //     }
  //   }, 2000);
  // };
  // const hoverUnhandle = () => {
  //   timeout = setTimeout(() => {
  //     setIsHover(false);
  //     setUserCard(undefined);
  //   }, 500);
  // };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1">
        <div className=" gap-2  flex-row flex">
          <Link
            href={`/r/${post.subreddit}`}
            className="font-bold hover:opacity-50"
          >
            r/{post.subreddit}
          </Link>

          {/* {userCard && (
            <div
              className="h-[300px] w-[360px] bg-black border border-twitter-gray"
              onMouseLeave={hoverUnhandle}
            >
              <UserCardComponent userInfo={userCard} />
            </div>
          )} */}
          <Link
            href={post.author === "[deleted]" ? "" : `/user/${post.author}`}
            className={cn(
              "text-secondary-text hover:text-white",
              post.distinguished === "moderator" &&
                "text-emerald-600 after:content-['[M]']"
            )}
            id="author"
            // onMouseLeave={() => {
            //   clearTimeout(timeout);
            // }}
            // onMouseOver={hoverHandle}
          >
            {" "}
            u/<span>{post.author}</span>{" "}
          </Link>

          <time
            className="flex-row flex gap-1 items-center"
            dateTime={new Date(post.created * 1000).toLocaleString()}
            title={new Date(post.created * 1000).toLocaleString()}
          >
            <FiClock />
            {relativeTimeFromElapsed(post.created)}
          </time>
          {post.stickied && (
            <span className="flex-row flex gap-1 items-center">
              <TbPin />
            </span>
          )}
        </div>
        <div className="flex flex-row gap-1 ">
          <div>
            <Link
              href={`${post.permalink}`}
              className="font-bold hover:opacity-50"
            >
              {post.title.replace(/&amp;/g, "&")}
            </Link>{" "}
            <span className="text-pink-100 hover:text-pink-300">
              <Link href={post.url}>({post.domain})</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCardDetailsComponent;
