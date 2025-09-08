import { useEffect, useRef, useState } from "react";
import { BsTextIndentLeft, BsThreeDots } from "react-icons/bs";
import GalleryComponent from "../Viewers/GalleryComp";
import RedgifsComponent from "../Viewers/RedgifsComponent";
import Image from "next/image";
import {
  cn,
  imageResolutions,
  MediaHandleFunc,
  secMinHrConvert,
} from "@/lib/utils";
import RedditVideoComp from "../Viewers/RedditVideoComp";
import ViewImageComponent from "../Viewers/ViewImgComponent";
import InlineGalleryComponent from "../Viewers/InlineGalleryComp";
import VotesComponent from "./VotesComp";
import { TfiCommentAlt } from "react-icons/tfi";
import LongSelfComponent from "../Misc/LongSelf";
import YoutubeComponent from "../Viewers/YoutubeComp";
import type { GalleryMetadata, Gfy, Post, PostData } from "@/lib/types";
import PostCardDetailsComponent from "./PostCardDetails";
import UserIconComponent from "../Misc/UserIconComp";

type Video = {
  fallback_url: string;
  duration: number;
  width: number;
  height: number;
  dash_url: string;
  has_audio: boolean;
};

type MediaType = Gfy | Video | GalleryMetadata[] | string;

const PostCardComp = ({
  post,
  userIcon,
}: {
  post: Post;
  userIcon?: string;
}) => {
  const [openPostIndex, setOpenPostIndex] = useState<string>();
  // const [mediaImages, setMediaImages] = useState<ImagesType>();
  // const [mediaVids, setMediaVids] = useState<VideosType>();
  const imgModalRef = useRef<HTMLDialogElement | null>(null);
  const [media, setMedia] = useState<MediaType>();

  const openMedia = async (postData: Post, postId: string, domain: string) => {
    setOpenPostIndex(postId);
    if (postId === openPostIndex && domain.includes("redgifs.com")) {
      return;
    }

    const meddy = await MediaHandleFunc(postData, domain);

    if (!meddy) {
      return;
    }

    setMedia(meddy);
    console.log(meddy);
  };

  useEffect(() => {
    if (!media) {
      return;
    }
    if (post.data.domain === "reddit.com" || post.data.domain === "i.redd.it") {
      imgModalRef.current?.showModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [media]);

  const inlineGalHandler = (postData: PostData) => {
    const mediaObject = postData.media_metadata as GalleryMetadata[];
    const moredata: GalleryMetadata[] = [];
    for (const element in mediaObject) {
      const data = mediaObject[element];
      if (data.status === "valid") {
        moredata.push(data);
      }
    }
    return moredata;
  };

  return (
    <div
      className="flex max-w-[40vw]  h-full flex-row box-border px-4 py-2 border-b border-b-twitter-gray hover:bg-black-hover"
      id="ass"
    >
      <div className="h-full w-fit mr-[8px] mt-0.5">
        <UserIconComponent userIcon={userIcon} post={post.data} />
      </div>
      <div className="flex  flex-col w-full ">
        <PostCardDetailsComponent post={post.data} />
        <div className="flex flex-col my-2 relative z-10  object-contain  ">
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
            <div
              className=" max-h-[672px] pt-2"
              onClick={() => {
                openMedia(post, post.data.id, post.data.domain);
              }}
            >
              <div
                className={cn(
                  "flex flex-col h-full relative rounded-[16px] border border-twitter-gray object-contain cursor-pointer",
                  post.data.over_18 && "border-red-700"
                )}
                id="media"
              >
                {post.data.domain === "v.redd.it" && media ? (
                  <RedditVideoComp
                    video={media as Video}
                    poster={post.data.preview && post.data.preview}
                  />
                ) : (post.data.domain === "redgifs.com" ||
                    post.data.domain === "v3.redgifs.com") &&
                  openPostIndex === post.data.id ? (
                  <RedgifsComponent
                    gif={media as Gfy}
                    thumbnail={post.data.preview?.images}
                  />
                ) : post.data.is_gallery &&
                  post.data.gallery_data &&
                  post.data.gallery_data?.items.length > 1 ? (
                  <InlineGalleryComponent media={inlineGalHandler(post.data)} />
                ) : post.data.crosspost_parent_list &&
                  post.data.crosspost_parent_list[0]?.gallery_data?.items
                    ?.length ? (
                  <InlineGalleryComponent
                    media={inlineGalHandler(post.data.crosspost_parent_list[0])}
                  />
                ) : post.data.preview ? (
                  post.data.preview.images[0] && (
                    <div className="flex flex-col h-full gap-2 relative z-100 rounded-[16px]">
                      <Image
                        src={imageResolutions(post.data.preview.images[0])}
                        height={700}
                        width={700}
                        loader={({ src }) => src}
                        unoptimized
                        alt={post.data.title}
                        style={{
                          height: "auto",
                          maxHeight: "672px",
                          width: "100%",
                        }}
                        className={cn(
                          "max-h-fit rounded-[16px]",
                          post.data.domain === "i.redd.it"
                            ? "object-contain"
                            : "object-cover"
                        )}
                      />
                      {post.data.post_hint.includes("video") && (
                        <div className="absolute flex justify-center  items-center  top-[45%] right-[45%] my-auto w-16 h-16 mx-auto z-100">
                          <svg viewBox="0 0 60 61" aria-hidden="true">
                            <g>
                              <circle
                                cx="30"
                                cy="30.4219"
                                fill="#333333"
                                opacity="0.6"
                                className="hover:opacity-80"
                                r="30"
                              ></circle>
                              <path
                                d="M22.2275 17.1971V43.6465L43.0304 30.4218L22.2275 17.1971Z"
                                fill="white"
                              ></path>
                            </g>
                          </svg>
                        </div>
                      )}
                      {post.data.media?.reddit_video?.duration && (
                        <div className="bg-black/60 w-fit rounded-md bottom-4 px-2 left-8 absolute">
                          {secMinHrConvert(
                            post.data.media.reddit_video.duration
                          )}
                        </div>
                      )}
                      {post.data.preview?.reddit_video_preview?.duration && (
                        <div className="bg-black/60 w-fit rounded-md bottom-4 px-2 left-8 absolute">
                          {secMinHrConvert(
                            post.data.preview.reddit_video_preview.duration
                          )}
                        </div>
                      )}
                    </div>
                  )
                ) : !post.data.preview &&
                  post.data.thumbnail.startsWith("https://") ? (
                  <div className="flex flex-col h-full w-fit gap-2 relative z-100">
                    <Image
                      src={post.data.thumbnail}
                      height={1000}
                      width={1000}
                      alt={post.data.title}
                      style={{
                        height: "100%",
                        maxHeight: "60vh",
                        width: "auto",
                      }}
                      className="object-contain max-h-fit"
                    />
                  </div>
                ) : (
                  <BsTextIndentLeft className="text-5xl" />
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-row  text-lg items-center px-1 pt-2 justify-between ">
          <span className="flex-row items-center flex gap-2 ">
            <TfiCommentAlt /> {post.data.num_comments}
          </span>
          <div>
            <VotesComponent post={post.data} />
          </div>
          <div>
            <BsThreeDots />
          </div>
        </div>
      </div>
      {openPostIndex === post.data.id &&
        !post.data.is_self &&
        media &&
        (post.data.domain === "i.redd.it" ||
          post.data.domain === "reddit.com") && (
          <dialog
            className="dialog min-w-full  min-h-[100vh] justify-center items-center overflow-x-hidden backdrop:bg-black/85 bg-transparent"
            ref={imgModalRef}
          >
            <div
              className=" absolute top-0 bottom-0 right-0 left-0 h-full w-full z-10"
              onClick={() => {
                imgModalRef.current?.close();
                setMedia(undefined);
              }}
            ></div>

            <div>
              {media && post.data.domain === "reddit.com" && (
                <GalleryComponent media={media as GalleryMetadata[]} />
              )}
              {media && post.data.domain === "i.redd.it" && (
                <ViewImageComponent image={media as string} />
              )}
              {/* {media?.gif && <RedgifsComponent gif={media.gif} />} */}
              {/* {mediaVids?.redditVid && (
              <RedditVideoComp video={post.data.media.reddit_video} />
            )} */}
            </div>
          </dialog>
        )}
    </div>
  );
};

export default PostCardComp;
