import Link from "next/link";

const SubLinksComp = ({ sub }: { sub: string[] }) => {
  return (
    <div className="w-full flex justify-between items-center text-center h-16 border-b border-twitter-gray box-border px-24 ">
      <Link
        className={`${!sub[1] && "border-b-4 border-b-pink-700 h-full text-center flex items-center"} hover:bg-twitter-gray`}
        href={`/r/${sub[0]}`}
      >
        <span>Hot</span>
      </Link>
      <Link
        className={`${sub[1] && sub[1] === "new" && "border-b-4 border-b-pink-700 h-full text-center flex items-center"} hover:bg-twitter-gray`}
        href={`/r/${sub[0]}/new`}
      >
        <span>New</span>
      </Link>
      <Link
        className={`${sub[1] && sub[1] === "top" && "border-b-4 border-b-pink-700 h-full text-center flex items-center"} hover:bg-twitter-gray`}
        href={`/r/${sub[0]}/top/`}
      >
        <span>Top</span>
      </Link>
    </div>
  );
};

export default SubLinksComp;
