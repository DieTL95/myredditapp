"use client";

import VideoPlayerComponent from "@/Components/Viewers/VideoPlayer";

const MoiPage = () => {
  return (
    <div className="w-[40vw] flex flex-col">
      <VideoPlayerComponent duration={0} hasAudio={false} height={0} url="" />
    </div>
  );
};

export default MoiPage;
