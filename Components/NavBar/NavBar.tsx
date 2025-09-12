import Link from "next/link";
import SearchComp from "../Search/SearchComp";
import NavUserComponent from "./UserNavComp";
import Image from "next/image";
const NavBarComponent = () => {
  return (
    <nav className="flex w-full border-b border-b-twitter-gray bg-black/60 backdrop-blur-md sticky  top-0 min-h-10 z-100">
      <div className="flex flex-row just items-center w-[70vw] mx-auto">
        <div className="basis-1/3 pl-1">
          <div className="w-[40px] ">
            <Link href="/">
              <Image
                src="/HomeIcon.png"
                width={40}
                height={40}
                alt="Home Icon"
              />
            </Link>
          </div>
        </div>
        <div className=" basis-1/3">
          <SearchComp />
        </div>
        <div className="flex basis-1/3 justify-end h-full items-center">
          <NavUserComponent />
        </div>
      </div>
    </nav>
  );
};

export default NavBarComponent;
