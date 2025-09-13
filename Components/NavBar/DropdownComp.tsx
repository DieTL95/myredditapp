"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
const DropdownComponent = ({
  user,
  image,
}: {
  user: string;
  image: string | null | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: Event) => {
      const target = e.target as Element;

      if (
        ref.current &&
        (!ref.current.contains(target) || target.id === "dropdown")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [ref]);

  return (
    <div className=" w-full" ref={ref} id="dropdown">
      <div className="w-full">
        <div
          className="cursor-pointer w-full flex flex-row gap-2 text-lg"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Image
            src={image!}
            width={0}
            height={0}
            sizes="100px"
            className="rounded-[50%]"
            style={{ maxHeight: "30px", width: "auto" }}
            alt={user!}
          />
          {user}
        </div>
        <div className="w-full relative">
          {isOpen && (
            <div className="absolute p-2 w-full mt-4 bg-pink-950">
              <div className="flex flex-col justify-center  w-full items-start gap-2 text-lg list-none">
                <li>
                  <Link href={`/user/${user}`}>Profile</Link>
                </li>
                <li>
                  <Link href={`/user/${user}`}>link</Link>
                </li>
                <li>
                  <Link href={`/user/${user}`}>Signout</Link>
                </li>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropdownComponent;
