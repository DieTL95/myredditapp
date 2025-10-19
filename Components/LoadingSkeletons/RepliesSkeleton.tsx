const RepliesSkeleton = () => {
  return (
    <div className="flex flex-col max-w-[766px] w-3xl mx-auto box-border">
      <div className="flex w-full flex-row p-4 border-b border-twitter-gray ">
        <div className="h-full w-[50px] mr-[8px]">
          <div className="h-[50px] w-[50px] bg-gray-600  rounded-full animate-pulse"></div>
        </div>
        <div className="flex  flex-col w-full ">
          <div className="w-full flex flex-col gap-2">
            <div className="w-1/4 h-3 animate-pulse bg-gray-600 rounded-md"></div>
            <div className="w-2/3 h-3 animate-pulse bg-gray-600 rounded-md"></div>
          </div>
          <div className="flex flex-col  my-2 relative z-10  object-contain  gap-2 ">
            <div className="h-[16px] animate-pulse bg-gray-600 rounded-[16px]">
              <div className="flex flex-col h-full relative rounded-[16px] border border-twitter-gray object-contain cursor-pointer "></div>
            </div>
            <div className="h-[16px] animate-pulse bg-gray-600 rounded-[16px]">
              <div className="flex flex-col h-full relative rounded-[16px] border border-twitter-gray object-contain cursor-pointer "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepliesSkeleton;
