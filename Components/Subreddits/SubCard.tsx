"use client";

import type { SubCardType } from "@/lib/types";
import Image from "next/image";
import SubButton from "./SubButton";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { useEffect, useState } from "react";
import UserAndSubSkeleton from "../LoadingSkeletons/UserSubSkeleton";

const SubCardComponent = ({ sub }: { sub?: SubCardType }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLoading = () => {
    setIsLoading(false);
    console.log("ass");
  };

  useEffect(() => {
    if (document.readyState === "complete") {
      handleLoading();
    }
    document.addEventListener("DOMContentLoaded", () => console.log("ass"));
    return () => {
      document.removeEventListener("DOMContentLoaded", () =>
        console.log("ass")
      );
    };
  }, []);
  if (!sub) {
    return;
  }
  console.log(sub);
  console.log(isLoading);
  return isLoading ? (
    <UserAndSubSkeleton />
  ) : (
    <div className="border-b  border-twitter-gray pb-4 box-border">
      <div className="w-full object-contain   h-[256px] ">
        {sub.data.mobile_banner_image || sub.data.banner_background_image ? (
          <div className="cursor-pointer relative">
            <div className="h-full absolute -z-1">
              <Image
                src={
                  sub.data.mobile_banner_image ||
                  sub.data.banner_background_image
                }
                width={0}
                height={0}
                sizes="2000px"
                alt={sub.data.name}
                style={{ height: "256px", width: "auto" }}
              />
            </div>
          </div>
        ) : (
          <div className="h-[256px] bg-black"></div>
        )}
      </div>
      <div className="px-4">
        <div className="h-[145px] max-w-[145px] -mt-[10%]">
          <div className=" ">
            {(sub.data.icon_img || sub.data.community_icon) && (
              <Image
                src={sub.data.icon_img || sub.data.community_icon}
                width={0}
                height={0}
                sizes="300px"
                alt={sub.data.name}
                style={{ maxHeight: "140px", width: "140px" }}
                className="rounded-[50%]"
              />
            )}
          </div>
        </div>{" "}
        <div></div>
        <div className="flex justify-end">
          <SubButton
            state={sub.data.user_is_subscriber}
            subreddit={sub.data.name}
          />
        </div>
        <div className="font-bold">{sub.data?.title}</div>
        {sub.data.public_description_html && (
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                marked
                  .parse(
                    sub.data.public_description_html.replace(
                      /\n(?=\n)/g,
                      "\n\n<br/>\n"
                    ),
                    {
                      gfm: true,
                      breaks: true,
                    }
                  )
                  .toString()
              ),
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SubCardComponent;
