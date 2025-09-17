import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import Link from "next/link";

const UserLinksComponent = async ({ username }: { username: string[] }) => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  return (
    <div className="w-full flex justify-between items-center text-center h-16 border-b border-twitter-gray box-border px-24 ">
      <Link
        className={`${!username[1] && "border-b-4 border-b-pink-700 h-full text-center flex items-center"} hover:bg-twitter-gray`}
        href={`/user/${username[0]}`}
      >
        <span>Overview</span>
      </Link>
      <Link
        className={`${username[1] && username[1] === "submitted" && "border-b-4 border-b-pink-700 h-full text-center flex items-center"} hover:bg-twitter-gray`}
        href={`/user/${username[0]}/submitted`}
      >
        <span>Posts</span>
      </Link>
      <Link
        className={`${username[1] && username[1] === "comments" && "border-b-4 border-b-pink-700 h-full text-center flex items-center"} hover:bg-twitter-gray`}
        href={`/user/${username[0]}/comments`}
      >
        <span>Comments</span>
      </Link>
      {session?.user.name === username[0] && (
        <>
          <Link
            className={`${username[1] && username[1] === "upvoted" && "border-b-4 border-b-pink-700 h-full text-center flex items-center"} hover:bg-twitter-gray`}
            href={`/user/${username[0]}/upvoted`}
          >
            <span>Upvoted</span>
          </Link>
          <Link
            className={`${username[1] && username[1] === "downvoted" && "border-b-4 border-b-pink-700 h-full text-center flex items-center"} hover:bg-twitter-gray`}
            href={`/user/${username[0]}/downvoted`}
          >
            <span>Downvoted</span>
          </Link>
          <Link
            className={`${username[1] && username[1] === "saved" && "border-b-4 border-b-pink-700 h-full text-center flex items-center"} hover:bg-twitter-gray`}
            href={`/user/${username[0]}/saved`}
          >
            <span>Saved</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default UserLinksComponent;
