"use client";

import { subscribeAction } from "@/lib/action";
import { cn } from "@/lib/utils";
import { useState } from "react";

const SubButton = ({
  subreddit,
  state,
}: {
  subreddit: string;
  state: boolean;
}) => {
  const [isSubbing, setIsSubbing] = useState(false);
  const friendHandler = async () => {
    setIsSubbing(true);
    const res = await subscribeAction(subreddit, state);
    if (!res?.error) {
      console.log(res?.message);
    } else {
      console.log(res.message);
    }
    setIsSubbing(false);
  };
  return (
    <div>
      <button
        disabled={isSubbing}
        onClick={friendHandler}
        type="button"
        className={cn(
          "w-20 h-9 rounded-md bg-emerald-700 cursor-pointer hover:bg-emerald-900 disabled:bg-gray-700 disabled:cursor-default",
          state === true && "bg-pink-700 hover:bg-pink-900"
        )}
      >
        {state === false ? "Sub" : "Unsub"}
      </button>
    </div>
  );
};

export default SubButton;
