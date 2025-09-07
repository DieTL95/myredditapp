import PostsSkeleton from "@/Components/LoadingSkeletons/PostsSkeleton";
import FrontFrontComp from "@/Components/Subreddits/FrontFront";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col w-full relative">
        <Suspense fallback={<PostsSkeleton />}>
          <FrontFrontComp />
        </Suspense>
      </div>
    </div>
  );
}
