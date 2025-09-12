"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
    <div className="relevant" ref={ref} id="dropdown">
      <div>
        <div
          className="cursor-pointer flex flex-row gap-2 text-lg"
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
        {isOpen && (
          <div className="absolute flex flex-col justify-center items-center gap-2 list-none">
            <li>ass</li>
            <li>eaa</li>
            <li>eeeee</li>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownComponent;
