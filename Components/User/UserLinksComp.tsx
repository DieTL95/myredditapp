import Link from "next/link";

const UserLinksComponent = ({ username }: { username: string[] }) => {
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
    </div>
  );
};

export default UserLinksComponent;
