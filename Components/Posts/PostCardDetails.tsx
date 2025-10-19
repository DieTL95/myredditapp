import type { PostData } from "@/lib/types";
import { cn, relativeTimeFromElapsed } from "@/lib/utils";
import { Clock, Pin, Repeat2 } from "lucide-react";
import Link from "next/link";
import LinkFlairComponent from "../Misc/LinkFlairComp";
import AuthorFlairComp from "../Misc/AuthorFlairComp";

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
        <div className=" gap-2 flex-wrap flex-row flex items-center">
          <Link
            href={`/r/${post.subreddit}`}
            className="font-bold hover:opacity-50"
          >
            r/{post.subreddit}
          </Link>

          <Link
            href={post.author === "[deleted]" ? "" : `/user/${post.author}`}
            className={cn(
              "text-secondary-text hover:text-white",
              post.distinguished === "moderator" &&
                "text-emerald-600 after:content-['[M]']"
            )}
            id="author"
          >
            u/<span>{post.author}</span>
          </Link>

          {(post.author_flair_richtext?.[0] || post.author_flair_text) && (
            <AuthorFlairComp post={post} />
          )}

          <Link href={post.permalink}>
            <time
              className="flex-row flex gap-1 items-center"
              dateTime={new Date(post.created * 1000).toLocaleString()}
              title={new Date(post.created * 1000).toLocaleString()}
            >
              <Clock strokeWidth={2} size={18} />
              {relativeTimeFromElapsed(post.created)}
            </time>
          </Link>
          {post.stickied && (
            <span className="flex-row flex gap-1 items-center">
              <Pin strokeWidth={2} size={18} />
            </span>
          )}
          {post.crosspost_parent && (
            <span
              className="flex-row flex gap-1 items-center"
              title="Crossposted"
            >
              <Repeat2 strokeWidth={2} size={18} />
            </span>
          )}
        </div>
        <div className="inline space-x-2 ">
          <Link
            href={`${post.permalink}`}
            className="font-bold hover:opacity-90"
          >
            {post.title.replace(/&amp;/g, "&")}
          </Link>
          <span className=" text-pink-100 hover:text-pink-300">
            <Link href={post.url}>({post.domain})</Link>
          </span>
          {(post.link_flair_richtext?.[0] || post.link_flair_text) && (
            <LinkFlairComponent post={post} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCardDetailsComponent;
