import type { GalleryMetadata } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  GalleryHorizontalEnd,
  LoaderIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const GalleryComponent = ({
  media,
  currentImg,
  currentGalleryImgHandler,
  nextImage,
  prevImage,
}: {
  media: GalleryMetadata[];
  currentImg: number;
  currentGalleryImgHandler: (index: number) => void;
  nextImage: () => void;
  prevImage: () => void;
}) => {
  const [viewFull, setViewFull] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  const [thumbLoading, setThumbLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const thumbImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = thumbImgRef.current;

    const imgLoadHandler = () => {
      if (thumbLoading) {
        setThumbLoading(false);
      }
    };

    image?.addEventListener("load", imgLoadHandler);
    return () => image?.removeEventListener("load", imgLoadHandler);
  }, [thumbLoading]);

  useEffect(() => {
    const image = imgRef.current;

    const imgLoadHandler = () => {
      if (loading) {
        setLoading(false);
      }
    };

    image?.addEventListener("load", imgLoadHandler);
    return () => image?.removeEventListener("load", imgLoadHandler);
  }, [loading]);

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

  useEffect(() => {
    window.addEventListener("keyup", (e) => {
      if (e.code === "ArrowRight") {
        nextImage();
      }
      if (e.code === "ArrowLeft") {
        prevImage();
      }
    });

    return () =>
      window.removeEventListener("keyup", (e) => {
        if (e.code === "ArrowRight") {
          nextImage();
        }
        if (e.code === "ArrowLeft") {
          prevImage();
        }
      });
  }, [nextImage, prevImage]);

  const viewModeHandler = () => {
    localStorage.setItem("viewModeFull", JSON.stringify(!viewFull));
    setViewFull(!viewFull);

    console.log("view: ", viewFull);
  };

  console.log("Localstorage: ", localStorage.getItem("viewModeFull"));
  const imageLoader = ({ src }: { src: string }) => {
    return `${src}`;
  };

  return (
    <div className="flex flex-col w-full max-h-screen overflow-hidden h-screen ">
      {loading ? (
        <div className=" absolute right-[50%] top-[50%]  text-white">
          <LoaderIcon className="animate-slow-spin" />
        </div>
      ) : (
        ""
      )}
      <div className="flex overflow-hidden mx-auto my-auto w-auto">
        <>
          <div className=" absolute top-[50%]   h-10 right-0 z-100 text-white">
            <button
              className="hover:scale-110 rounded-full cursor-pointer p-1 hover:bg-white/30"
              onClick={nextImage}
            >
              <ArrowRight size={24} />
            </button>
          </div>
          <div className=" absolute top-[50%]  h-10 left-0 z-100 text-white">
            <button
              className="hover:scale-110 rounded-full cursor-pointer p-1 hover:bg-white/30"
              onClick={prevImage}
            >
              <ArrowLeft size={24} />
            </button>
          </div>
        </>

        <div
          className={cn(
            " mx-auto  relative z-50 cursor-default scale-20 transition-all duration-200 opacity-0",
            !loading && "scale-100 opacity-100"
          )}
        >
          <Image
            ref={imgRef}
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
            style={{ height: "100%", width: "auto", maxHeight: "100vh" }}
            alt={currentImg.toString()}
          />
        </div>
      </div>

      <div className="w-full z-100 ">
        <div className="flex h-0 w-full items-end justify-end z-100 mr-10">
          {" "}
          <div
            className="bottom-0 right-10  rotate-180 text-white shadow-2xl rounded-full p-2 cursor-pointer hover:bg-white/30"
            onClick={viewModeHandler}
          >
            <GalleryHorizontalEnd size={26} />
          </div>
        </div>
        <div
          className={cn(
            "h-0 w-full transition-none ",
            !thumbLoading && " transition-all ease-linear duration-300",
            !viewFull && "flex  h-30"
          )}
        >
          {thumbLoading && (
            <div className="flex w-full justify-center items-center h-30 text-white p-2">
              <LoaderIcon className="animate-slow-spin" />
            </div>
          )}
          <div
            className={cn(
              "w-full h-full flex items-center justify-center",
              thumbLoading && "hidden"
            )}
          >
            {media.map((obj, index) => (
              <div
                key={index}
                className={cn(
                  "border cursor-pointer hover:border-indigo-300 z-100 h-full  transition-all ease-linear opacity-50 scale-75",
                  currentImg === index && "opacity-100 scale-100"
                )}
                onClick={() => currentGalleryImgHandler(index)}
              >
                <Image
                  ref={thumbImgRef}
                  src={obj.p[0].u.replace(/&amp;/g, "&")}
                  width={100}
                  height={100}
                  loading={"eager"}
                  sizes="125px"
                  style={{
                    height: "100%",
                    width: "auto",
                    maxWidth: "125px",
                    objectFit: "contain",
                  }}
                  className={cn("pb-0", thumbLoading && "w-[125px]")}
                  alt={index.toString()}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryComponent;
