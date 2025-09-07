import type { SubSearchType } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

const SubResultsComponents = ({
  redditData,
}: {
  redditData: SubSearchType;
}) => {
  return redditData.subreddits.map((sub, index) => (
    <div key={index} className="w-[40vw]">
      <div className="flex flex-col w-full even:bg-pink-950 odd:bg-pink-900  ">
        <div className="flex flex-row bg-[image:var(--image-url)] bg-contain max-h-[200px]">
          <div className="flex flex-col gap-2 max-h-[100px]">
            <div className="h-[100px]">
              <div className="h-[100px]">
                {sub.icon_img && (
                  <Image
                    src={sub.icon_img}
                    height={100}
                    width={100}
                    objectFit="contain"
                    alt={sub.name}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <Link id="searchResult" href={`/r/${sub.name}`}>
                {sub.name}
              </Link>
            </div>
            <div>Subscribers: {sub.subscriber_count}</div>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default SubResultsComponents;
