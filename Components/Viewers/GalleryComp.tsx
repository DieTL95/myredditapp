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
  const [smallWin, setSmallWin] = useState<boolean>();
  const galleryElementRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const thumbImgRef = useRef<HTMLImageElement>(null);
  const elementWidth = window?.innerWidth;

  const handleScroll = (direction: string) => {
    const galleryParent = document.querySelector(".galleryParent") || undefined;
    if (galleryParent) {
      if (direction === "positive") {
        galleryParent.scrollLeft += 100;
      } else if (direction === "negative") {
        galleryParent.scrollLeft -= 100;
      }
    }
  };
  useEffect(() => {
    const galleryElm = galleryElementRef.current;
    const thumgImg = thumbImgRef.current;
    window.addEventListener("resize", (e) => {
      const win = e.target as Window;
      console.log("EEEEEEE: ", e);
      if (galleryElm) {
        console.log("Client: ", galleryElm.clientWidth);
        console.log("Offset: ", galleryElm.offsetWidth);
        console.log("Scroll: ", galleryElm.scrollWidth);
        console.log("Windo: ", win.innerWidth);
        console.log("ThumbImgRef: ", thumgImg?.naturalWidth, thumgImg?.src);

        if (galleryElm?.offsetWidth + 50 > win.innerWidth) {
          console.log("Smaller thant Offset");
          setSmallWin(true);
        }
        if (galleryElm?.offsetWidth + 50 < win.innerWidth) {
          console.log("Smaller thant Offset");
          setSmallWin(false);
        }
      }
    });
    return () =>
      window.removeEventListener("resize", (e) => {
        const win = e.target as Window;
        console.log("EEEEEEE: ", e);
        if (galleryElm) {
          console.log("Client: ", galleryElm.clientWidth);
          console.log("Offset: ", galleryElm.offsetWidth);
          console.log("Scroll: ", galleryElm.scrollWidth);
          console.log("Windo: ", win.innerWidth);
          console.log("ThumbImgRef: ", thumgImg?.naturalWidth, thumgImg?.src);

          if (galleryElm?.offsetWidth + 50 > win.innerWidth) {
            console.log("Smaller thant Offset");
            setSmallWin(true);
          }
          if (galleryElm?.offsetWidth + 50 < win.innerWidth) {
            console.log("Smaller thant Offset");
            setSmallWin(false);
          }
        }
      });
  }, [elementWidth, currentImg]);

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

      <div
        className={cn(
          "absolute invisible bottom-0 scale-25 z-100 mx-auto right-[50%] ",
          viewFull && " visible scale-100 transition-all delay-300"
        )}
      >
        <div className="mx-auto w-4 text-white opacity-80 text-shadow-md text-shadow-background ">
          {currentImg + 1}/{media.length}
        </div>
      </div>

      <div className=" relative w-full z-100 bg-blue-200/20">
        <div className="flex h-0 w-full items-end justify-end z-100 mr-10">
          {" "}
          <div
            className="bottom-0 right-10  rotate-180 text-white shadow-2xl rounded-full p-2 cursor-pointer hover:bg-white/30"
            onClick={viewModeHandler}
          >
            <GalleryHorizontalEnd size={26} />
          </div>
        </div>
        <>
          <div
            className={cn(
              "absolute hidden transition-all duration-200 ease-linear opacity-0 -translate-x-100 justify-center items-center  h-full right-0 z-100 text-white pr-2 bg-gradient-to-l from-black to-black/5",
              smallWin && "flex translate-x-0 opacity-100"
            )}
          >
            <button
              className="hover:scale-110 rounded-full cursor-pointer p-1 hover:bg-white/30"
              onClick={() => handleScroll("positive")}
            >
              <ArrowRight size={24} />
            </button>
          </div>

          <div
            className={cn(
              "absolute hidden transition-all duration-200 ease-linear opacity-0 -translate-x-100 justify-center items-center  h-full left-0 z-100 text-white pl-2 bg-gradient-to-r from-black to-black/5",
              smallWin && "flex translate-x-0 opacity-100"
            )}
          >
            <button
              className="hover:scale-110 rounded-full cursor-pointer p-1 hover:bg-white/30"
              onClick={() => handleScroll("negative")}
            >
              <ArrowLeft size={24} />
            </button>
          </div>
        </>

        <div
          className={cn(
            "galleryParent h-0 w-full px-10 transition-none cursor-default",
            !thumbLoading && " transition-all ease-linear duration-300",
            !viewFull && "flex  h-30",
            smallWin && " overflow-x-hidden "
          )}
        >
          {thumbLoading && (
            <div className="flex w-full justify-center items-center h-30 text-white p-2">
              <LoaderIcon className="animate-slow-spin" />
            </div>
          )}
          <div
            className={cn(
              "w-fit  mx-auto h-full invisible flex items-center justify-center ",
              !thumbLoading && "visible"
            )}
            ref={galleryElementRef}
          >
            {media.map((obj, index) => (
              <div
                key={index}
                className={cn(
                  "border-2 cursor-pointer  hover:border-pink-900 z-70 h-full  transition-all ease-linear opacity-75 scale-75",
                  currentImg === index &&
                    "opacity-100 scale-100 border-none cursor-default"
                )}
                onClick={() => currentGalleryImgHandler(index)}
              >
                <Image
                  ref={thumbImgRef}
                  src={obj.p[0].u.replace(/&amp;/g, "&")}
                  width={100}
                  height={100}
                  loading={"eager"}
                  sizes="8rem"
                  style={{
                    height: "100%",
                    width: "auto",
                    minWidth: "25px",
                    maxWidth: "125px",
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
  );
};

export default GalleryComponent;
