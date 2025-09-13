import type { GalleryMetadata, PostData } from "@/lib/types";
import InlineGalleryComponent from "./InlineGalleryComp";
import { useState } from "react";
import GalleryComponent from "./GalleryComp";
import ImgDialogComponent from "./ImgDialogComp";

const ParentGallery = ({
  post,
  media,
  postIndex,
}: {
  post: PostData;
  media?: GalleryMetadata[];
  postIndex?: string;
}) => {
  const [currentImg, setCurrentImg] = useState(0);

  const inlineGalHandler = (postData: PostData) => {
    const mediaObject: GalleryMetadata[] = postData.crosspost_parent_list
      ? postData.crosspost_parent_list[0].media_metadata
      : postData.media_metadata;
    const moredata: GalleryMetadata[] = [];

    for (const element in mediaObject as GalleryMetadata[]) {
      const data = mediaObject[element];
      if (data.status === "valid") {
        moredata.push(data);
      }
    }
    return moredata;
  };

  return (
    <>
      <div>
        <InlineGalleryComponent
          media={inlineGalHandler(post)}
          currentImg={currentImg}
          nextImage={() =>
            setCurrentImg(
              currentImg === inlineGalHandler(post).length - 1
                ? 0
                : currentImg + 1
            )
          }
          prevImage={() =>
            setCurrentImg(
              currentImg === 0
                ? inlineGalHandler(post).length - 1
                : currentImg - 1
            )
          }
        />
      </div>
      {postIndex === post.id && media && (
        <ImgDialogComponent>
          <GalleryComponent
            media={media as GalleryMetadata[]}
            currentImg={currentImg}
            nextImage={() =>
              setCurrentImg(
                currentImg === media.length - 1 ? 0 : currentImg + 1
              )
            }
            prevImage={() =>
              setCurrentImg(
                currentImg === 0 ? media.length - 1 : currentImg - 1
              )
            }
          />
        </ImgDialogComponent>
      )}
    </>
  );
};

export default ParentGallery;
