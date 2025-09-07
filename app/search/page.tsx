import PostsSkeleton from "@/Components/LoadingSkeletons/PostsSkeleton";
import SearchResultsComponent from "@/Components/Search/SearchResultsComp";
import { Suspense } from "react";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const searchPage = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const searchParams = await props.searchParams;
  const query = searchParams.q;
  const sort = searchParams.sort;

  return (
    // <div className="w-[500px] h-[700px] relative border-2">
    //   <div className=" h-full justify-center items-center flex flex-col relative ">
    //     <div className="flex justify-center items-center">
    //       <div className="after:flex-1">
    //         <div className="flex h-fit gap-4">
    //           <div className="w-20 h-20 border-2 border-purple-500">One</div>
    //           <div className="w-20 h-20 border-2 border-purple-500">Two</div>
    //           <div className="w-20 h-20 border-2 border-purple-500">Three</div>
    //           <div className="w-20 h-20 border-2 border-purple-500">Three</div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="h-fit">
    //       <div className="flex items-end gap-4 h-24">
    //         <div className="w-20 h-20 border-2 border-pink-400">Footer One</div>
    //         <div className="w-20 h-20 border-2 border-pink-400">Footer Two</div>
    //         <div className="w-20 h-20 border-2 border-pink-400">
    //           Footer Three
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <Suspense fallback={<PostsSkeleton />}>
      <SearchResultsComponent query={query as string} sort={sort as string} />
    </Suspense>
  );
};

export default searchPage;
