import type { GalleryMetadata, PostData } from "@/lib/types";
import InlineGalleryComponent from "./InlineGalleryComp";
import { useEffect, useRef, useState } from "react";
import GalleryComponent from "./GalleryComp";

const ParentGallery = ({
  post,
  media,
  postIndex,
  undefineMedia,
}: {
  post: PostData;
  media?: GalleryMetadata[];
  postIndex?: string;
  undefineMedia: () => void;
}) => {
  const [currentImg, setCurrentImg] = useState(0);
  const modal = useRef<HTMLDialogElement>(null);

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

  useEffect(() => {
    const modalRef = modal.current;
    if (!media) {
      return;
    }

    modalRef?.showModal();

    if (modal.current?.open) {
      document.getElementById("thing")?.addEventListener("click", () => {
        modalRef?.close();
        undefineMedia();
      });
    }

    return () => {
      if (modalRef?.open) {
        document.getElementById("thing")?.removeEventListener("click", () => {
          modalRef?.close();
          undefineMedia();
        });
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [media]);

  return (
    <>
      <div>
        <InlineGalleryComponent
          media={inlineGalHandler(
            post.crosspost_parent_list ? post.crosspost_parent_list[0] : post
          )}
          currentImg={currentImg}
          changeImg={() =>
            setCurrentImg(
              currentImg === inlineGalHandler(post).length - 1
                ? 0
                : currentImg + 1
            )
          }
        />
      </div>
      {postIndex === post.id && media && (
        <dialog
          className="dialog min-w-full  min-h-[100vh] justify-center items-center overflow-x-hidden backdrop:bg-black/85 bg-transparent"
          ref={modal}
        >
          <div
            className=" absolute top-0 bottom-0 right-0 left-0 h-full w-full z-10"
            id="thing"
          ></div>

          <div>
            {media && (
              <GalleryComponent
                media={media as GalleryMetadata[]}
                currentImg={currentImg}
                changeImg={() =>
                  setCurrentImg(
                    currentImg === (media as GalleryMetadata[]).length - 1
                      ? 0
                      : currentImg + 1
                  )
                }
              />
            )}
          </div>
        </dialog>
      )}
    </>
  );
};

export default ParentGallery;
