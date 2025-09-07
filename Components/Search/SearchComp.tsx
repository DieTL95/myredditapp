import { Suspense } from "react";
import SubSearchComponent from "./SubSearchComp";
import PostsSkeleton from "../LoadingSkeletons/PostsSkeleton";

const SearchComp = () => {
  return (
    <Suspense fallback={<PostsSkeleton />}>
      <SubSearchComponent />;
    </Suspense>
  );
};

export default SearchComp;
