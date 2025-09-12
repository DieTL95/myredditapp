import type { GalleryMetadata, Gfy, PostData } from "@/lib/types";
import {
  cn,
  imageResolutions,
  mediaHandler,
  secMinHrConvert,
} from "@/lib/utils";
import Image from "next/image";
import RedditVideoComp from "../Viewers/RedditVideoComp";
import RedgifsComponent from "../Viewers/RedgifsComponent";
import { useState } from "react";

import ParentGallery from "../Viewers/ParentGallery";

type MediaType = Gfy | Video | GalleryMetadata[] | string;
type Video = {
  fallback_url: string;
  duration?: number;
  width: number;
  height: number;
  dash_url?: string;
  has_audio: boolean;
};

const MediaComponent = ({ post }: { post: PostData }) => {
  const [openPostIndex, setOpenPostIndex] = useState<string>();
  // const [mediaImages, setMediaImages] = useState<ImagesType>();
  // const [mediaVids, setMediaVids] = useState<VideosType>();
  const [media, setMedia] = useState<MediaType>();

  const openMedia = async (
    postData: PostData,
    postId: string,
    domain: string
  ) => {
    setOpenPostIndex(postId);
    if (postId === openPostIndex && domain.includes("redgifs.com")) {
      return;
    }

    const meddy = await mediaHandler(postData, domain);

    if (!meddy) {
      return;
    }

    setMedia(meddy);
    console.log(meddy);
  };

  // useEffect(() => {
  //   if (!media) {
  //     return;
  //   }
  //   if (post.domain === "i.redd.it") {
  //     imgModalRef.current?.showModal();
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [media]);

  // const inlineGalHandler = (postData: PostData) => {
  //   const mediaObject = postData.media_metadata as GalleryMetadata[];
  //   const moredata: GalleryMetadata[] = [];
  //   for (const element in mediaObject) {
  //     const data = mediaObject[element];
  //     if (data.status === "valid") {
  //       moredata.push(data);
  //     }
  //   }
  //   return moredata;
  // };

  return (
    <>
      <div
        className=" max-h-[672px] pt-2"
        onClick={() => {
          openMedia(post, post.id, post.domain);
        }}
      >
        <div
          className={cn(
            "flex flex-col h-full relative rounded-[16px] border border-twitter-gray object-contain cursor-pointer",
            post.over_18 && "border-red-700"
          )}
          id="media"
        >
          {post.domain === "v.redd.it" && media ? (
            <RedditVideoComp
              video={media as Video}
              poster={post.preview && post.preview}
            />
          ) : (post.domain === "redgifs.com" ||
              post.domain === "v3.redgifs.com") &&
            openPostIndex === post.id ? (
            <RedgifsComponent
              gif={media as Gfy}
              thumbnail={post.preview?.images}
            />
          ) : post.is_gallery ||
            (post.crosspost_parent_list &&
              post.crosspost_parent_list[0]?.gallery_data?.items?.length) ? (
            <ParentGallery
              post={post}
              media={media as GalleryMetadata[]}
              postIndex={openPostIndex}
              undefineMedia={() => setMedia(undefined)}
            />
          ) : // <InlineGalleryComponent
          //   media={inlineGalHandler(
          //     post.crosspost_parent_list
          //       ? post.crosspost_parent_list[0]
          //       : post
          //   )}
          //   currentImg={currentImg}
          //   changeImg={() =>
          //     setCurrentImg(
          //       currentImg === inlineGalHandler(post).length - 1
          //         ? 0
          //         : currentImg + 1
          //     )
          //   }
          // />
          post.preview ? (
            post.preview.images[0] && (
              <div className="flex flex-col h-full gap-2 relative z-100 rounded-[16px]">
                <Image
                  src={imageResolutions(post.preview.images[0])}
                  height={700}
                  width={700}
                  loader={({ src }) => src}
                  unoptimized
                  alt={post.title}
                  style={{
                    height: "auto",
                    maxHeight: "672px",
                    width: "100%",
                  }}
                  className={cn(
                    "max-h-fit rounded-[16px]",
                    post.domain === "i.redd.it"
                      ? "object-contain"
                      : "object-cover"
                  )}
                />
                {(post.post_hint.includes("video") ||
                  post.preview.images[0].variants.gif) && (
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
                {post.media?.reddit_video?.duration && (
                  <div className="bg-black/60 w-fit rounded-md bottom-4 px-2 left-8 absolute">
                    {secMinHrConvert(post.media.reddit_video.duration)}
                  </div>
                )}
                {post.preview?.reddit_video_preview?.duration && (
                  <div className="bg-black/60 w-fit rounded-md bottom-4 px-2 left-8 absolute">
                    {secMinHrConvert(
                      post.preview.reddit_video_preview.duration
                    )}
                  </div>
                )}
              </div>
            )
          ) : (
            !post.preview &&
            post.thumbnail.startsWith("https://") && (
              <div className="flex flex-col h-full w-fit gap-2 relative z-100">
                <Image
                  src={post.thumbnail}
                  height={1000}
                  width={1000}
                  alt={post.title}
                  style={{
                    height: "100%",
                    maxHeight: "60vh",
                    width: "auto",
                  }}
                  className="object-contain max-h-fit"
                />
              </div>
            )
          )}
        </div>
      </div>
      {/* {openPostIndex === post.id &&
        !post.is_self &&
        media &&
        post.domain === "i.redd.it" && (
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
        
              {media && post.domain === "i.redd.it" && (
                <ViewImageComponent image={media as string} />
              )}
            </div>
          </dialog>
        )} */}
    </>
  );
};

export default MediaComponent;
