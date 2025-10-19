"use client";
import type { SubCardType } from "@/lib/types";
import TextComponent from "./TextComp";
import { useState, useEffect } from "react";

const SidebarComponent = ({ subInfo }: { subInfo: SubCardType }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLoading = () => {
    setIsLoading(false);
    console.log("ass");
  };

  useEffect(() => {
    if (document.readyState === "complete") {
      handleLoading();
    }
    document.addEventListener("DOMContentLoaded", () => console.log("ass"));
    return () => {
      document.removeEventListener("DOMContentLoaded", () =>
        console.log("ass")
      );
    };
  }, []);
  if (!subInfo) {
    return;
  }
  return (
    !isLoading &&
    subInfo.data.description_html && (
      <div className="   absolute  -right-[5%] top-2 max-lg:hidden">
        <div className="fixed px-4 py-2 rounded-[16px] overflow-y-scroll border border-twitter-gray max-h-[75vh] max-w-[360px]">
          <TextComponent post={subInfo.data.description_html} />
        </div>
      </div>
    )
  );
};

export default SidebarComponent;
