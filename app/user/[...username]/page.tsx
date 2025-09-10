import UserPostsComponent from "@/Components/User/UserPostsComp";
import UserCardComponent from "@/Components/User/UserCardComp";
import { fetchUserInfo } from "@/lib/action";
import type { Metadata } from "next";
import { Suspense } from "react";
import UserAndSubSkeleton from "@/Components/LoadingSkeletons/UserSubSkeleton";
import UserLinksComponent from "@/Components/User/UserLinksComp";

type Params = Promise<{ username: string[] }>;

type Props = {
  params: Promise<{ username: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { username } = await params;

  return {
    title: username[0],
  };
}

const UserPage = async (props: { params: Params }) => {
  const params = await props.params;
  const username = params.username;
  const userInfo = await fetchUserInfo(username[0]);
  console.log(username);
  if (!userInfo) {
    return;
  }

  return (
    <Suspense fallback={<UserAndSubSkeleton />}>
      <div className="flex flex-col  ">
        {!userInfo.is_suspended ? (
          <>
            <UserCardComponent userInfo={userInfo} />
            <UserLinksComponent username={username} />
            <div>
              <UserPostsComponent
                username={username[0]}
                page={username[1]}
                userIcon={userInfo?.icon_img}
              />
            </div>
          </>
        ) : (
          <div className="text-center items-center justify-center w-full h-full">
            <span className="text-4xl text-pink-800">User is Suspended.</span>
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default UserPage;
