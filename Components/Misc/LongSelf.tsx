import { useState } from "react";
import TextComponent from "./TextComp";

const LongSelfComponent = ({
  selfPost,
  postText,
}: {
  selfPost: string;
  postText: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

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

  return (
    <div>
      <TextComponent post={post} />

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
