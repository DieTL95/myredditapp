import type { GalleryMetadata } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsFullscreenExit } from "react-icons/bs";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";

const GalleryComponent = ({
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
  const [viewFull, setViewFull] = useState<boolean>();
  useEffect(() => {
    const view = localStorage.getItem("viewModeFull");
    if (view) {
      const prasedView = JSON.parse(view);
      setViewFull(prasedView);
      console.log("blewwwww");
    } else if (!view) {
      setViewFull(false);
      localStorage.setItem("viewModeFull", "false");
      console.log("Awwoohaa");
    }
  }, []);

  const viewModeHandler = () => {
    localStorage.setItem("viewModeFull", JSON.stringify(!viewFull));
    setViewFull(!viewFull);

    console.log("view: ", viewFull);
  };

  addEventListener("keyup", (e) => {
    if (e.code === "ArrowRight") {
      nextImage();
    }
    if (e.code === "ArrowLeft") {
      prevImage();
    }
  });
  console.log("Localstorage: ", localStorage.getItem("viewModeFull"));
  const imageLoader = ({ src }: { src: string }) => {
    return `${src}`;
  };

  return (
    <div className="h-screen">
      <div className="flex flex-col w-full overflow-x-hidden  h-full justify-center items-center">
        <div className="flex items-center max-h-screen  h-full min-w-screen ">
          <>
            <div className=" absolute top-[50%] h-10 right-0 z-50 hover:scale-110">
              <button onClick={nextImage}>
                <FaArrowCircleRight className="text-2xl text-white" />
              </button>
            </div>
            <div className=" absolute top-[50%] h-10 left-0 z-50 hover:scale-110">
              <button onClick={prevImage}>
                <FaArrowCircleLeft className="text-2xl text-white" />
              </button>
            </div>
          </>

          <div className="flex mx-auto my-auto w-fit h-fit relative z-50">
            <Image
              src={
                media[currentImg].s.gif
                  ? media[currentImg].s.gif
                  : media[currentImg].p[5]
                    ? media[currentImg].p[5].u.replace(/&amp;/g, "&")
                    : media[currentImg].s.u.replace(/&amp;/g, "&")
              }
              loader={imageLoader}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "auto",
                maxHeight: viewFull ? "100vh" : "90vh",
              }}
              alt={currentImg.toString()}
            />
            <div
              className="absolute top-0 right-0 z-100 text-gray-400 shadow-2xl cursor-pointer font-bold"
              onClick={viewModeHandler}
            >
              <BsFullscreenExit size={20} />
            </div>
          </div>
        </div>
        {!viewFull && (
          <div className="w-full h-fit flex items-end ">
            <div className="min-h-[10vh] mx-auto w-full overflow-hidden pr-[96px] relative  max-w-1/3 flex  z-50 gal-prev duration-1000 transition ">
              <div className="stuff relative mx-auto my-0 ">
                <div
                  className=" absolute  flex z-50 transition-transform ease-linear pointer-events-none"
                  style={{
                    transform: `translatex(-${currentImg * (100 / media.length)}%)`,
                  }}
                >
                  {media.map((obj, index) => (
                    <div
                      key={index}
                      className={cn(
                        "border cursor-pointer hover:border-indigo-300 z-100   transition-all ease-linear opacity-50 scale-75",
                        currentImg === index && "opacity-100 scale-100"
                      )}
                    >
                      <Image
                        src={obj.p[0].u.replace(/&amp;/g, "&")}
                        width={100}
                        height={100}
                        loading={"eager"}
                        sizes="100px"
                        style={{
                          width: "auto",
                          minWidth: "100px",
                          maxHeight: "100px",
                          objectFit: "contain",
                        }}
                        className="pb-0"
                        alt={index.toString()}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryComponent;
