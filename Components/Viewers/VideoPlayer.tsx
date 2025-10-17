import * as portals from "react-reverse-portal";
import { cn, secMinHrConvert } from "@/lib/utils";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import DialogVideoComponent from "./DialogVidComp";

import {
  Expand,
  Loader,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Volume,
  Volume1,
  Volume2,
  VolumeOff,
  VolumeX,
} from "lucide-react";

const VideoPlayerComponent = ({
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
  const [zoomed, setZoomed] = useState(false);
  const [loadedDuration, setLoadedDuration] = useState<number>();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>();
  const [muted, setMuted] = useState<boolean>();
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
    if (!videoRef.current?.paused) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleMute = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.muted = !video.muted;
    setMuted((prev) => !prev);

    localStorage.setItem("muted", JSON.stringify(video.muted));
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

  document.querySelector("dialog")?.addEventListener("keyup", (e) => {
    if (e.defaultPrevented) {
      return;
    }

    if (e.key === " ") {
      e.preventDefault();
      handlePlay();
      console.log("pase play");
    }
    if (videoRef.current) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();

        handleSeek(videoRef.current.currentTime - 10);
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();

        handleSeek(videoRef.current.currentTime + 10);
      }
    }
  });

  const handleZoom = () => {
    if (zoomed) {
      videoRef.current?.classList.remove("zoomed", "h-screen");
      setZoomed(false);
    } else if (videoRef.current && height > document.body.clientHeight) {
      videoRef.current?.classList.add("zoomed");
      setZoomed(true);
    } else {
      videoRef.current?.classList.add("h-screen");
      setZoomed(true);
    }
  };
  useEffect(() => {
    const video = videoRef.current;

    if (!duration) {
      setLoadedDuration(videoRef.current?.duration);
    }
    const defaultVolume = localStorage.getItem("defaultVolume");
    const mutedStorage = localStorage.getItem("muted");
    if (defaultVolume && video) {
      video.volume = JSON.parse(defaultVolume) / 100;
      video.muted = mutedStorage && JSON.parse(mutedStorage);

      setVolume(JSON.parse(defaultVolume));
      if (mutedStorage) {
        setMuted(JSON.parse(mutedStorage));
      }
    }

    const observer = new IntersectionObserver(
      (enteries) => {
        enteries.forEach(async (entry) => {
          if (isPlaying && entry.intersectionRatio === 0) {
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

    const handleOutsideClick = (e: Event) => {
      const target = e.target as Element;

      if (video && !video.contains(target)) {
        document.querySelector("dialog")?.close();
      }
    };

    document
      .querySelector("dialog")
      ?.addEventListener("click", handleOutsideClick);

    document.querySelector("dialog")?.addEventListener("close", () => {
      video?.pause();
      setIsPlaying(false);
      setCondition(false);
      video?.classList.remove("zoomed", "h-screen");
      setZoomed(false);
    });
    video?.addEventListener("playing", () => {
      video.classList.add("visible");
    });
    video?.addEventListener("timeupdate", updateTime);

    return () => {
      document
        .querySelector("dialog")
        ?.removeEventListener("click", handleOutsideClick);
      document.querySelector("dialog")?.removeEventListener("close", () => {
        video?.pause();
        setIsPlaying(false);
        setCondition(false);
        video?.classList.remove("zoomed", "h-screen");
        setZoomed(false);
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
    <div
      className="w-full h-auto z-20 relative flex rounded-[16px]"
      onClick={handleClick}
    >
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
            <div className=" h-full w-full ">
              {videoRef.current?.seeking && (
                <div className=" left-[50%] absolute top-[50%]  ">
                  <Loader size={32} className="animate-slow-spin text-white" />
                </div>
              )}
              <video
                ref={videoRef}
                className="h-full w-full z-40 rounded-b-[16px]"
                autoPlay
                poster={poster?.replace(/&amp;/g, "&")}
                onPlay={() => setIsPlaying(true)}
                onEnded={() => setIsPlaying(false)}
                preload="metadata"
                style={
                  {
                    width: "auto",
                    "--image-url": `${poster}`,
                  } as CSSProperties
                }
              >
                <source src={url} type="video/mp4" />
                No Video Available
              </video>

              <div
                className={cn(
                  "controls z-100 flex flex-col absolute px-4 bottom-0 left-0 invisible rounded-[16px] transition delay-500 group-hover:ease-linear group-hover:delay-100 group-hover:visible w-full justify-between items-center text-2xl bg-linear-to-t from-black/90 to-black/0 text-white",
                  !isPlaying && "visible"
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-full">
                  <div className="flex w-full items-center">
                    <div className="progress w-full flex h-full items-center">
                      <input
                        className="w-full cursor-pointer"
                        type="range"
                        name="progress"
                        id="progress"
                        min="0"
                        max={Math.round(
                          loadedDuration ? loadedDuration : duration
                        )}
                        value={currentTime}
                        onChange={(e) => handleSeek(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full justify-between flex flex-row">
                  <div className="flex min-w-fit">
                    <div>
                      {isPlaying ? (
                        <button
                          type="button"
                          className="size-8 cursor-pointer bg-none hover:bg-gray-400/40 flex justify-center items-center rounded-full"
                          onClick={handlePlay}
                        >
                          <div>
                            <Pause size={20} />
                          </div>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="size-8 cursor-pointer bg-none hover:bg-gray-400/40 flex justify-center items-center rounded-full"
                          onClick={handlePlay}
                        >
                          <div className="">
                            <Play size={20} />
                          </div>
                        </button>
                      )}
                    </div>
                    {(loadedDuration || duration) && (
                      <div className="text-lg p-1 cursor-default">
                        {secMinHrConvert(currentTime)} /{" "}
                        {secMinHrConvert(
                          !loadedDuration ? duration : loadedDuration
                        )}
                      </div>
                    )}
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
                          className="size-8 cursor-pointer bg-none hover:bg-gray-400/40 flex justify-center items-center rounded-full"
                          onClick={handleMute}
                        >
                          {muted ? (
                            <VolumeX size={20} />
                          ) : volume && volume === 0 ? (
                            <Volume size={20} />
                          ) : volume && volume < 50 ? (
                            <Volume1 size={20} />
                          ) : volume && volume > 50 ? (
                            <Volume2 size={20} />
                          ) : videoRef.current?.volume == undefined ? (
                            <VolumeOff size={20} />
                          ) : (
                            <Volume size={20} />
                          )}
                        </div>
                      </>
                    ) : (
                      <VolumeOff size={20} />
                    )}
                    {condition && (
                      <div
                        className="size-8 cursor-pointer bg-none hover:bg-gray-400/40 flex justify-center items-center rounded-full"
                        onClick={handleZoom}
                      >
                        {zoomed ? (
                          <Minimize2 size={20} />
                        ) : (
                          <Maximize2 size={20} />
                        )}
                      </div>
                    )}
                    <div
                      onClick={handleFullscreen}
                      className="size-8 cursor-pointer bg-none hover:bg-gray-400/40 flex justify-center items-center rounded-full"
                    >
                      <Expand size={20} />
                    </div>
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
