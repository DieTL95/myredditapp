import type { UserInfo } from "@/lib/types";
import Image from "next/image";
import FriendButton from "./FriendButton";
const UserCardComponent = ({ userInfo }: { userInfo: UserInfo }) => {
  console.log(userInfo);
  return (
    <div className="border-b border-twitter-gray pb-4 box-border">
      <div className="w-full object-contain   h-[256px] ">
        {userInfo.subreddit.banner_img && (
          <div className="cursor-pointer relative">
            <div className="h-full absolute -z-1 ">
              <Image
                src={userInfo.subreddit.banner_img}
                width={0}
                height={0}
                sizes="1000px"
                alt={userInfo.name}
                style={{ height: "256px", width: "auto" }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="px-4">
        <div className="max-h-[145px] max-w-[145px] z-10 -mt-[10%]">
          <div className=" ">
            <Image
              src={userInfo.subreddit.icon_img}
              width={0}
              height={0}
              sizes="300px"
              alt={userInfo.name}
              style={{ maxHeight: "140px", width: "140px" }}
              className="rounded-[50%]"
            />
          </div>
        </div>{" "}
        <div></div>
        <div className="flex justify-end">
          <FriendButton state={userInfo.is_friend} username={userInfo.name} />
        </div>
        <div>{userInfo?.subreddit.title}</div>
        <div>{userInfo?.name}</div>
        <div>{userInfo?.subreddit.description}</div>
        <div>{userInfo.subreddit.public_description}</div>
        <div>Posts Karma {userInfo?.link_karma}</div>
        <div>Comments Karma {userInfo?.comment_karma}</div>
      </div>
    </div>
  );
};

export default UserCardComponent;
