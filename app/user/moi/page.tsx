"use client";
import VideoPlayerComponent from "@/Components/Viewers/VideoPlayer";

const AssAssPage = () => {
  return (
    <div className="w-[40vw] flex flex-col">
      <VideoPlayerComponent
        url="https://media.redgifs.com/EminentMonstrousBee.mp4"
        duration={10}
        hasAudio={true}
        height={1080}
      />
    </div>
  );
};

export default AssAssPage;
