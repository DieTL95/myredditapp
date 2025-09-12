import { cn } from "@/lib/utils";
import VideoPlayerComponent from "./VideoPlayer";

interface Video {
  fallback_url: string;
  duration?: number;
  width: number;
  height: number;
  dash_url?: string;
  has_audio: boolean;
}

const RedditVideoComp = ({
  video,
  poster,
}: {
  video: Video;
  poster?:
    | {
        images: [
          {
            source: {
              url: string;
              width: number;
              height: number;
            };
          },
        ];
      }
    | undefined;
}) => {
  // const [clicked, setClicked] = useState(false);
  const getRatio = (num: number) => {
    if (!poster || poster.images[0] === undefined) {
      return 0;
    }
    const ratio =
      poster.images[0].source.width / poster.images[0].source.height;
    return ratio > num;
  };

  if (!video) {
    return (
      <div
        className={cn(
          "flex max-h-[672px] z-100 rounded-[16px]",
          getRatio(1) ? "h-[380px]" : "h-[680px]"
        )}
      >
        <div
          className="absolute  h-full w-full bg-[image:var(--image-url)] bg-no-repeat bg-center bg-contain mx-auto rounded-[16px]"
          id="bg-image"
          style={
            {
              "--image-url": `url(${poster && poster.images[0].source.url.replace(/&amp;/g, "&")})`,
            } as React.CSSProperties
          }
        ></div>
      </div>
    );
  }

  // const regex = /(?:(?:v\.redd\.it)\/)(\w+)/gm;
  // const vidId = regex.exec(video.fallback_url);
  // if (!vidId) {
  //   return;
  // }

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
            "--image-url": `url(${poster && poster.images[0].source.url.replace(/&amp;/g, "&")})`,
          } as React.CSSProperties
        }
      ></div>
      <VideoPlayerComponent
        url={video.fallback_url}
        duration={video.duration || 0}
        hasAudio={video.has_audio}
        poster={poster?.images[0].source.url}
        height={video.height}
      />
    </div>
  );
};

export default RedditVideoComp;
