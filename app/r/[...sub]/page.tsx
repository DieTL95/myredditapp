import SubPathComponent from "@/Components/Subreddits/SubPathComponent";
import CommentsComponent from "@/Components/Comments/PostWithCommsComp";
import SubCardComponent from "@/Components/Subreddits/SubCard";
import { fetchCommentsAction, fetchSubredditInfo } from "@/lib/action";
import type { Metadata } from "next";
import { Suspense } from "react";
import UserAndSubSkeleton from "@/Components/LoadingSkeletons/UserSubSkeleton";
import SubLinksComp from "@/Components/Subreddits/SubLinksComp";
import SidebarComponent from "@/Components/Misc/SidebarComp";

type Params = Promise<{ sub: string[] }>;
type Props = {
  params: Promise<{ sub: string[] }>;
};

type Post = {
  data: {
    title?: string;
    subreddit?: string;
  };
}[];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { sub } = await params;
  const res = await fetchCommentsAction(sub[2]);
  if (!res) {
    return {
      title: `${sub[0]} | RedditApp`,
      referrer: "no-referrer",
    };
  }

  const post: Post = res[0].data.children;
  if (!post) {
    return {
      title: "Post Not Found!",
    };
  }

  if (sub[1] === "comments") {
    return {
      title: `${post[0].data.title} | ${post[0].data.subreddit} | RedditApp`,
    };
  }

  return { title: "Reddit App", referrer: "no-referrer" };
}

const SubredditPage = async (props: { params: Params }) => {
  const params = await props.params;
  const sub = params.sub;
  const subInfo = await fetchSubredditInfo(sub[0]);
  if (!subInfo && sub[0] !== "friends") {
    return;
  }

  return sub[1] === "comments" ? (
    <CommentsComponent params={[...sub]} />
  ) : (
    <Suspense fallback={<UserAndSubSkeleton />}>
      <div className="flex flex-row">
        <div className="border border-twitter-gray max-w-[40vw] mx-auto">
          {sub[0] !== "friends" && <SubCardComponent sub={subInfo} />}
          <SubLinksComp sub={sub} />
          <SubPathComponent subreddit={sub[0]} sort={sub[1]} />
        </div>
        {subInfo && <SidebarComponent subInfo={subInfo} />}
      </div>
    </Suspense>
  );
};

export default SubredditPage;
