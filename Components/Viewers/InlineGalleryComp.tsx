import type { GalleryMetadata } from "@/lib/types";

import Image from "next/image";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";

const InlineGalleryComponent = ({
  media,
  currentImg,
  nextImage,
  prevImage,
}: {
  media: GalleryMetadata[];
  currentImg: number;
  nextImage: () => void;
  prevImage: () => void;
}) => {
  // const [currentImg, setCurrentImg] = useState(0);
  //   const nextImgHandler = () => {
  //     addEventListener("keyup", (e) => {
  //       if (e.code === "ArrowRight") {
  //         setCurrentImg(currentImg === media.length - 1 ? 0 : currentImg + 1);
  //       }
  //       if (e.code === "ArrowLeft") {
  //         setCurrentImg(currentImg === 0 ? media.length - 1 : currentImg - 1);
  //       }
  //     });
  //   };

  const imageLoader = ({ src }: { src: string }) => {
    return `${src}`;
  };

  return (
    <div className="flex flex-col h-full ">
      <div className="h-full">
        <>
          <div className=" absolute top-[50%] h-10 right-0 z-50 hover:scale-110">
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <FaArrowCircleRight className="text-2xl text-white" />
            </button>
          </div>
          <div className=" absolute top-[50%] h-10 left-0 z-50 hover:scale-110">
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <FaArrowCircleLeft className="text-2xl text-white" />
            </button>
          </div>
        </>

        <div className="h-full">
          {media[currentImg] && (
            <Image
              src={
                media[currentImg].p[3]
                  ? media[currentImg].p[3].u.replace(/&amp;/g, "&")
                  : media[currentImg].p[2]
                    ? media[currentImg].p[2].u.replace(/&amp;/g, "&")
                    : media[currentImg].p[1]
                      ? media[currentImg].p[1].u.replace(/&amp;/g, "&")
                      : media[currentImg].s.u.replace(/&amp;/g, "&")
              }
              loader={imageLoader}
              loading="eager"
              unoptimized
              width={1000}
              height={1000}
              style={{ height: "100%", maxHeight: "60vh", width: "40vw" }}
              className="object-contain relative mx-auto max-h-fit"
              alt={currentImg.toString()}
            />
          )}
        </div>
      </div>
      <div className="absolute bottom-0 mx-auto w-full">
        <div className="mx-auto w-4 text-white opacity-80 text-shadow-md text-shadow-background ">
          {currentImg + 1}/{media.length}
        </div>
      </div>
    </div>
  );
};

export default InlineGalleryComponent;
