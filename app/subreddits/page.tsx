"use client";
import LoaderComponent from "@/Components/Misc/LoaderComp";
import { useUserSubs } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
const SubredditsPage = () => {
  const { data, hasNextPage, isFetching, isLoading, fetchNextPage } =
    useUserSubs();
  console.log(data);
  return (
    <div className="w-[40vw]">
      {data?.pages.map((page, index) => (
        <div key={index}>
          <div>
            {page?.children.map(({ data }, index) => (
              <div
                key={index}
                className="w-full max-h-[525px] border-b border-b-twitter-gray"
              >
                <div className="flex flex-col w-full hover:bg-white/5">
                  <Link href={`${data.url}`}>
                    <div
                      className="flex flex-row bg-[image:var(--image-url)] bg-contain h-[82px]"
                      id="searchResult"
                    >
                      <div className="flex flex-col gap-2" id="searchResult">
                        <div
                          className="flex items-center justify-center"
                          id="searchResult"
                        >
                          <div className="p-4">
                            {data.community_icon ? (
                              <Image
                                src={data.community_icon}
                                width={50}
                                height={50}
                                className="rounded-full"
                                id="searchResult"
                                alt="User Icon"
                              />
                            ) : (
                              <div
                                className="h-[50px] w-[50px]"
                                id="searchResult"
                              ></div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                        className="flex flex-col justify-center"
                        id="searchResult"
                      >
                        {data.display_name}
                        <div id="searchResult">
                          Subscribers: {data.subscribers}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {data && hasNextPage && (
        <div className="flex flex-col justify-center mx-auto" id="loadMoreDiv">
          <button
            className="mx-auto w-24 h-10 cursor-pointer bg-pink-800 text-pink-200 hover:bg-pink-700 disabled:bg-gray-700 disabled:cursor-default disabled:text-gray-400"
            onClick={() => fetchNextPage()}
            disabled={isFetching || isLoading || !hasNextPage}
          >
            {isLoading || isFetching ? <LoaderComponent /> : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SubredditsPage;
