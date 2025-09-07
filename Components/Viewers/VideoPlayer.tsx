import * as portals from "react-reverse-portal";
import { cn, secMinHrConvert } from "@/lib/utils";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  IoIosPause,
  IoMdExpand,
  IoMdPlay,
  IoMdVolumeHigh,
  IoMdVolumeOff,
} from "react-icons/io";
import { FiZoomIn } from "react-icons/fi";
import DialogVideoComponent from "./DialogVidComp";
import { PiSpinner } from "react-icons/pi";

const VideoPlayerComponent = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  url,
  duration,
  hasAudio,
  height,
  poster,
}: {
  url: string;
  duration: number;
  height: number;
  hasAudio: boolean;
  poster?: string;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadedDuration, setLoadedDuration] = useState<number>();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [condition, setCondition] = useState<boolean>(false);

  const isSSR = typeof window === "undefined";

  const portalNode = useMemo(() => {
    if (isSSR) {
      return null;
    }
    return portals.createHtmlPortalNode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  const hanleMute = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.muted = !video.muted;

    if (video.muted) {
      localStorage.setItem("defaultVolume", JSON.stringify(0));
    } else {
      localStorage.setItem(
        "defaultVolume",
        JSON.stringify(volume === 0 && 100)
      );
    }
  };

  const handleVolume = (vol: number) => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    video.volume = vol / 100;
    setVolume(video.volume * 100);

    localStorage.setItem("defaultVolume", JSON.stringify(vol));
  };

  const handleSeek = (time: number) => {
    const video = videoRef.current;
    if (video?.currentTime == undefined) {
      return;
    }

    video.currentTime = time;

    setCurrentTime(time);
  };

  const handleFullscreen = () => {
    if (document.fullscreenElement) {
      document
        .exitFullscreen()
        .then(() =>
          document.querySelector(".vidPlayer")?.classList.remove("fullscreen")
        );
      return;
    }
    container.current
      ?.requestFullscreen()
      .then(() =>
        document.querySelector(".vidPlayer")?.classList.add("fullscreen")
      )
      .catch((error) => `There was an error. ${error}`);
  };

  const updateTime = () => {
    if (videoRef.current?.currentTime == undefined) {
      return;
    }
    setCurrentTime(videoRef.current?.currentTime);
  };

  const handleClick = () => {
    if (condition === true) {
      handlePlay();
    } else {
      setCondition(true);
    }
  };
  const handleZoom = () => {
    if (
      videoRef.current?.classList.contains("zoomed") ||
      videoRef.current?.classList.contains("h-screen")
    ) {
      videoRef.current.classList.remove("zoomed", "h-screen");
    } else if (videoRef.current && height > document.body.clientHeight) {
      console.log(height, " ", document.body.clientHeight);
      videoRef.current?.classList.add("zoomed");
    } else {
      videoRef.current?.classList.add("h-screen");
    }
  };
  useEffect(() => {
    const video = videoRef.current;

    if (!duration) {
      setLoadedDuration(videoRef.current?.duration);
    }
    const defaultVolume = localStorage.getItem("defaultVolume");
    if (defaultVolume && video) {
      video.volume = JSON.parse(defaultVolume) / 100;

      setVolume(JSON.parse(defaultVolume));
    }

    const observer = new IntersectionObserver(
      (enteries) => {
        enteries.forEach(async (entry) => {
          if (isPlaying && entry.intersectionRatio === 0) {
            console.log(entry);
            video?.pause();
            setIsPlaying(false);
          }
        });
      },
      {
        root: null,
      }
    );

    observer.observe(video!);

    document.querySelector("dialog")?.addEventListener("close", () => {
      video?.pause();
      setIsPlaying(false);
      setCondition(false);
      video?.classList.remove("zoomed", "h-screen");
    });
    video?.addEventListener("playing", () => {
      video.classList.add("visible");
    });
    video?.addEventListener("timeupdate", updateTime);

    return () => {
      document.querySelector("dialog")?.removeEventListener("close", () => {
        video?.pause();
        setIsPlaying(false);
        setCondition(false);
        video?.classList.remove("zoomed", "h-screen");
      });
      video?.removeEventListener("playing", () => {
        video.classList.add("visible");
      });
      video?.removeEventListener("timeupdate", updateTime);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef, condition, isPlaying]);

  useEffect(() => {
    if (condition === true) {
      document.querySelector("dialog")?.showModal();
    }
  }, [condition]);

  return (
    <div className="w-full h-auto  relative flex rounded-[16px]">
      {condition === true && portalNode && (
        <div className="  h-full w-full">
          <DialogVideoComponent portalNode={portalNode} />
        </div>
      )}
      <div
        ref={container}
        className="vidPlayer group mx-auto w-fit h-full flex flex-col justify-center items-center z-50"
      >
        {portalNode && (
          <portals.InPortal node={portalNode}>
            <div className=" h-full w-full">
              {document.querySelector("dialog")?.open && (
                <div
                  className="absolute  top-0 right-0 text-white text-lg z-40 hover:scale-110 "
                  onClick={handleZoom}
                >
                  <FiZoomIn />
                </div>
              )}
              {videoRef.current?.seeking && (
                <div className=" flex  w-full justify-center absolute top-[50%]  ">
                  <PiSpinner
                    className="animate-slow-spin text-black text-4xl"
                    height="2em"
                    width="2em"
                    speed="0.5"
                  />
                </div>
              )}
              <video
                ref={videoRef}
                className="h-full w-full z-40 rounded-b-[16px]"
                autoPlay
                poster={poster?.replace(/&amp;/g, "&")}
                onPlay={() => setIsPlaying(true)}
                onEnded={() => setIsPlaying(false)}
                onClick={handleClick}
                preload="metadata"
                style={
                  {
                    width: "auto",
                    "--image-url": `${poster}`,
                  } as CSSProperties
                }
              >
                <source
                  src="https://media.redgifs.com/EminentMonstrousBee.mp4"
                  type="video/mp4"
                />
                No Video Available
              </video>

              <div
                className={cn(
                  "controls z-100 flex absolute px-8 bottom-0 left-0 invisible rounded-[16px] transition delay-500 group-hover:ease-linear group-hover:delay-100 group-hover:visible w-full justify-between items-center text-2xl bg-linear-to-t from-black/90 to-black/0 text-white",
                  !isPlaying && "visible"
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex min-w-fit">
                  <div>
                    {isPlaying ? (
                      <button
                        type="button"
                        className=" button"
                        onClick={handlePlay}
                      >
                        <IoIosPause />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="button"
                        onClick={handlePlay}
                      >
                        <IoMdPlay />
                      </button>
                    )}
                  </div>
                  {duration && (
                    <div className="text-lg p-1">
                      {secMinHrConvert(currentTime)} /{" "}
                      {secMinHrConvert(
                        !loadedDuration ? duration : loadedDuration
                      )}
                    </div>
                  )}
                </div>
                <div className="flex w-full mx-2 items-center">
                  <div className="progress w-full flex h-full items-center">
                    <input
                      className="w-full"
                      type="range"
                      name="progress"
                      id="progress"
                      min="0"
                      max={Math.round(duration)}
                      value={currentTime}
                      onChange={(e) => handleSeek(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className=" flex group/volume">
                  {" "}
                  {hasAudio ? (
                    <>
                      <div>
                        <div className="volume invisible group-hover/volume:visible relative max-h-20">
                          <input
                            className="absolute max-h-20 bottom-0 "
                            type="range"
                            name="volume"
                            id="volume"
                            min="0"
                            max="100"
                            value={volume || 0}
                            onChange={(e) =>
                              handleVolume(Number(e.target.value))
                            }
                          />
                        </div>
                      </div>
                      <div
                        className=" button block"
                        onClick={hasAudio ? hanleMute : () => ""}
                      >
                        {volume === 0 ||
                        videoRef.current?.volume == undefined ||
                        videoRef.current.muted ? (
                          <IoMdVolumeOff />
                        ) : (
                          <IoMdVolumeHigh />
                        )}
                      </div>
                    </>
                  ) : (
                    <IoMdVolumeOff />
                  )}
                  <div onClick={handleFullscreen} className="button ">
                    <IoMdExpand />
                  </div>
                </div>
              </div>
            </div>{" "}
          </portals.InPortal>
        )}
        {condition === false && portalNode && (
          <portals.OutPortal node={portalNode} />
        )}
      </div>
    </div>
  );
};

export default VideoPlayerComponent;
