import Link from "next/link";
import SearchComp from "../Search/SearchComp";
import NavUserComponent from "./UserNavComp";

const NavBarComponent = () => {
  return (
    <nav className="flex w-full border-b border-b-twitter-gray bg-black/60 backdrop-blur-md sticky  top-0 min-h-10 z-100">
      <div className="flex flex-row just items-center w-[70vw] mx-auto">
        <div className="basis-1/3">
          <Link href="/">Home</Link>
        </div>
        <div className=" basis-1/3">
          <SearchComp />
        </div>
        <div className="flex basis-1/3 justify-end">
          <NavUserComponent />
        </div>
      </div>
    </nav>
  );
};

export default NavBarComponent;
