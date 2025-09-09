import { useState } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { cn } from "@/lib/utils";

const LongSelfComponent = ({
  selfPost,
  postText,
}: {
  selfPost: string;
  postText: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const regex =
    /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1.*?(png|gif|jpeg|jpg|webp)/gm;

  const longPost = postText.length > 400;
  const cutPost = selfPost.substring(0, 400);
  const truncatedPost = cutPost.substring(
    0,
    Math.min(cutPost.length, cutPost.lastIndexOf(" "))
  );
  const expandPostToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const post = longPost && !isExpanded ? `${truncatedPost}...` : selfPost;

  const reggedSelf = regex.exec(post);

  return (
    <div>
      <div
        className={cn(
          "reply",
          reggedSelf?.input
            ? "replyImage after:content-['']"
            : "replyLink after:content-['']"
        )}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            marked
              .parse(post.replace(/\n(?=\n)/g, "\n\n<br/>\n"), {
                gfm: true,
                breaks: true,
              })
              .toString()
          ),
        }}
      />
      {longPost && (
        <span
          onClick={expandPostToggle}
          className="cursor-pointer text-pink-300 hover:underline"
        >
          {isExpanded ? "Show less" : "Show more"}
        </span>
      )}
      {/* {reggedSelf && (
        <Image
          src={reggedSelf[2].replace(/&amp;/g, "&")}
          width={900}
          height={900}
          alt="aaaa"
        />
      )} */}
    </div>
  );
};

export default LongSelfComponent;
