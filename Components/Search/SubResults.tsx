import type { SubSearchType } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

const SubResultsComponents = ({
  redditData,
}: {
  redditData: SubSearchType;
}) => {
  return (
    <div className="w-[40vw] bg-pink-900 max-h-[525px] relative searchScrollable">
      {redditData.subreddits.map((sub, index) => (
        <div
          key={index}
          className="w-full even:bg-pink-800 odd:bg-pink-900 hover:border-2 border-pink-950 z-10"
          id="searchResult"
        >
          <div className="flex flex-col w-full  -z-1 ">
            <Link href={`/r/${sub.name}`} id="searchResult">
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
                      {sub.icon_img ? (
                        <Image
                          src={sub.icon_img}
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
                <div className="flex flex-col justify-center" id="searchResult">
                  {sub.name}
                  <div id="searchResult">
                    Subscribers: {sub.subscriber_count}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubResultsComponents;
