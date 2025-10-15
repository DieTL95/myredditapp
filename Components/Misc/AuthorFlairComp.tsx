import type { PostData, Comments } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

type PostType = PostData | Comments;

const AuthorFlairComp = ({ post }: { post: PostType }) => {
  return (
    <div>
      <div
        className={cn(
          `px-2 py-0.5 rounded-3xl`,
          (post.author_flair_background_color === "transparent" ||
            !post.author_flair_background_color) &&
            "bg-white/20! text-white!",
          post.author_flair_text_color === "light"
            ? "text-white"
            : "text-black",
          post.author_flair_type !== "text" && "flex gap-2"
        )}
        style={{ backgroundColor: post.author_flair_background_color }}
      >
        {post.author_flair_type === "text"
          ? post.author_flair_text
          : post.author_flair_richtext?.map((flair, index) => (
              <div key={index}>
                {flair.e === "text" ? (
                  <span>{flair.t}</span>
                ) : (
                  flair.e === "emoji" && (
                    <Image
                      key={index}
                      alt={flair.a}
                      width={25}
                      height={25}
                      style={{ height: 25, width: 25 }}
                      src={flair.u}
                    />
                  )
                )}
              </div>
            ))}
      </div>
    </div>
  );
};

export default AuthorFlairComp;
