import PostsSkeleton from "./PostsSkeleton";

const UserAndSubSkeleton = () => {
  return (
    <div className="flex flex-col w-[40vw] h-dvh border border-twitter-gray mx-auto box-border">
      <div className="w-full ">
        <div className="w-full h-[200px] animate-pulse bg-gray-600 "></div>
      </div>
      <div className=" w-full py-4 box-border  flex flex-col px-4 border-b border-twitter-gray">
        <div className="max-h-[145px] flex w-full justify-between ">
          <div className="h-[140px] w-[140px] z-100 bg-gray-900 rounded-[50%]  -mt-[12%] mb-4"></div>
          <div className=" w-20 h-9 rounded-md animate-pulse bg-gray-600"></div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="animate-pulse bg-gray-600 h-4 w-28 rounded-md"></div>
          <div className="animate-pulse bg-gray-600 h-4 w-40 rounded-md"></div>
          <div className="animate-pulse bg-gray-600 h-4 w-40 rounded-md"></div>
        </div>
      </div>
<PostsSkeleton/>
    </div>
  );
};

export default UserAndSubSkeleton;
