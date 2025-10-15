import type { PostData } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const LinkFlairComponent = ({ post }: { post: PostData }) => {
  return (
    <Link
      href={`/${post.subreddit_name_prefixed}/search?q=flair:${post.link_flair_text}&restrict_sr=on`}
      className={cn(
        `px-2 py-0.5 rounded-3xl w-fit font-bold`,
        (post.link_flair_background_color === "transparent" ||
          !post.link_flair_background_color) &&
          "bg-white/20! text-white!",
        post.link_flair_text_color === "light" ? "text-white" : "text-black",
        post.link_flair_type !== "text" && "inline-flex flex-row gap-2"
      )}
      style={{ backgroundColor: post.link_flair_background_color }}
    >
      {post.link_flair_type === "text"
        ? post.link_flair_text
        : post.link_flair_richtext?.map((flair, index) => (
            <span className="flex" key={index}>
              {flair.e === "text"
                ? flair.t
                : flair.e === "emoji" && (
                    <Image
                      key={index}
                      alt={flair.a}
                      width={20}
                      height={20}
                      className="my-auto"
                      style={{ height: 20, width: 20 }}
                      src={flair.u}
                    />
                  )}
            </span>
          ))}
    </Link>
  );
};

export default LinkFlairComponent;
