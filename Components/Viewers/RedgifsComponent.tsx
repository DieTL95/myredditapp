import type { Gif } from "@/lib/types";
import VideoPlayerComponent from "./VideoPlayer";
import { PiSpinner } from "react-icons/pi";
import { cn } from "@/lib/utils";
type Thumbnail = [
  {
    source: {
      url: string;
      width: number;
      height: number;
    };
  },
];
const RedgifsComponent = ({
  gif,
  thumbnail,
}: {
  gif: Gif;
  thumbnail?: Thumbnail;
}) => {
  const getRatio = (num: number) => {
    if (!thumbnail || thumbnail[0] === undefined) {
      return 0;
    }
    const ratio = thumbnail[0].source.width / thumbnail[0].source.height;
    return ratio > num;
  };

  if (!gif) {
    return (
      <div
        className={cn(
          "flex max-h-[672px] z-100 rounded-[16px]",
          getRatio(1) ? "h-[380px]" : "h-[680px]"
        )}
      >
        <div
          className="absolute h-full w-full bg-[image:var(--image-url)] bg-no-repeat bg-center bg-contain mx-auto rounded-[16px]"
          id="bg-image"
          style={
            {
              "--image-url": `url(${thumbnail && thumbnail[0].source.url.replace(/&amp;/g, "&")})`,
            } as React.CSSProperties
          }
        ></div>
        <div className=" flex  w-full justify-center absolute top-[50%]  ">
          <PiSpinner
            className="animate-slow-spin text-black text-4xl"
            height="2em"
            width="2em"
            speed="0.5"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex max-h-[672px] z-100 rounded-[16px]",
        getRatio(1) ? "h-[380px]" : "h-[680px]"
      )}
    >
      <div
        className="absolute z-10 h-full w-full bg-[image:var(--image-url)] bg-no-repeat bg-center bg-contain mx-auto rounded-[16px]"
        id="bg-image"
        style={
          {
            "--image-url": `url(${thumbnail && thumbnail[0].source.url.replace(/&amp;/g, "&")})`,
          } as React.CSSProperties
        }
      ></div>

      <VideoPlayerComponent
        url={gif.urls.hd || gif.urls.sd}
        duration={gif.duration}
        hasAudio={gif.hasAudio}
        height={gif.height}
      />
    </div>
  );
};

export default RedgifsComponent;
