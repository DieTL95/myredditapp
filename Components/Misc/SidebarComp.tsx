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
      <div className="flex flex-col items-center sticky top-0 w-full ml-20">
        <div className="w-[14vw]">
          <TextComponent post={subInfo.data.description_html} />
        </div>
      </div>
    )
  );
};

export default SidebarComponent;
