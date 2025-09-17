import LongSelfComponent from "../Misc/LongSelf";
import YoutubeComponent from "../Viewers/YoutubeComp";
import type { Post } from "@/lib/types";
import PostCardDetailsComponent from "./PostCardDetails";
import UserIconComponent from "../Misc/UserIconComp";
import MediaComponent from "../Misc/MediaComp";
import ActionsComponent from "./ActionsComp";

const PostCardComp = ({
  post,
  userIcon,
}: {
  post: Post;
  userIcon?: string;
}) => {
  return (
    <div
      className="flex max-w-[40vw] w-[40vw]  h-full flex-row box-border px-4 py-2 border-b border-b-twitter-gray hover:bg-black-hover"
      id="ass"
    >
      <div className="h-full w-fit mr-[8px] mt-0.5">
        <UserIconComponent userIcon={userIcon} post={post.data} />
      </div>
      <div className="flex  flex-col w-full ">
        <PostCardDetailsComponent post={post.data} />
        <div className="flex flex-col my-2 relative z-10  object-contain  ">
          {post.data.removed_by_category !== null && (
            <div>[Removed by {post.data.removed_by_category}]</div>
          )}
          {!post.data.is_self && post.data.selftext_html && (
            <LongSelfComponent
              selfPost={post.data.selftext_html}
              postText={post.data.selftext}
            />
          )}
          {post.data.domain === "youtube.com" ||
          post.data.domain === "youtu.be" ? (
            <YoutubeComponent url={post.data.url} />
          ) : post.data.is_self && post.data.selftext_html ? (
            <LongSelfComponent
              selfPost={post.data.selftext_html}
              postText={post.data.selftext}
            />
          ) : post.data.is_self && !post.data.selftext_html ? (
            ""
          ) : (
            <MediaComponent post={post.data} />
          )}
        </div>
        <ActionsComponent post={post.data} />
      </div>
    </div>
  );
};

export default PostCardComp;
