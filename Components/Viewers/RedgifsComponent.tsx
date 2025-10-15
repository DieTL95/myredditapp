import type { Gfy } from "@/lib/types";
import VideoPlayerComponent from "./VideoPlayer";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
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
  gif: Gfy;
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
          <Loader size={32} className="animate-slow-spin text-white" />
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
        url={`https://media.redgifs.com/${gif.gifName}.mp4`}
        duration={gif.duration}
        hasAudio={true}
        height={gif.height}
      />
    </div>
  );
};

export default RedgifsComponent;
