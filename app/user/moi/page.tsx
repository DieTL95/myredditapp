"use client";

import ImgDialogComponent from "@/Components/Viewers/ImgDialogComp";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowLeft, GalleryHorizontalEnd } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const imgArray = [
  "https://i.redd.it/6ajr6bzmb4vf1.png",
  "https://i.redd.it/m2ct9gtlx1vf1.jpg",
];

const MoiPage = () => {
  const [openGallery, setOpenGallery] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  const prevImage = () => {
    setCurrentImg(currentImg === 0 ? imgArray.length - 1 : currentImg - 1);
  };
  const nextImage = () => {
    setCurrentImg(currentImg === imgArray.length - 1 ? 0 : currentImg + 1);
  };
  return (
    <div>
      <ImgDialogComponent>
        <div className="flex flex-col w-full max-h-screen overflow-hidden h-screen ">
          <div className="flex overflow-hidden mx-auto my-auto w-auto">
            <>
              <div
                className=" absolute top-[50%] h-10 right-0 z-100 cursor-pointer text-white"
                onClick={nextImage}
              >
                <button className="hover:scale-110 rounded-full p-1 hover:bg-white/30">
                  <ArrowRight size={26} />
                </button>
              </div>
              <div
                className=" absolute top-[50%] h-10 left-0 z-100 cursor-pointer text-white"
                onClick={prevImage}
              >
                <button className="hover:scale-110 rounded-full p-1 hover:bg-white/30">
                  <ArrowLeft size={26} />
                </button>
              </div>
            </>

            <div className="relative mx-auto">
              <Image
                src={imgArray[currentImg]}
                alt="Image"
                width={0}
                height={0}
                sizes="100vw"
                style={{ height: "100%", width: "auto", maxHeight: "100vh" }}
                className="z-20"
              />{" "}
            </div>
          </div>
          <div className="w-full">
            <div className="flex h-0 w-full items-end justify-end mr-10">
              {" "}
              <div
                className="bottom-0 right-10 z-100 rotate-180 text-white shadow-2xl rounded-full p-2 cursor-pointer hover:bg-white/30"
                onClick={() => setOpenGallery((prev) => !prev)}
              >
                <GalleryHorizontalEnd size={26} />
              </div>
            </div>
            <div
              className={cn(
                "h-0 w-full flex transition-[height] ease-linear ",
                openGallery && "h-30 transition-[height] ease-linear "
              )}
            >
              <div className="flex bg-white h-full w-full bottom-0 ">
                {" "}
                Aloha
              </div>
            </div>
          </div>
        </div>
      </ImgDialogComponent>
    </div>
  );
};

export default MoiPage;
