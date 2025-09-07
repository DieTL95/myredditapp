"use client";

import { friendUnAction } from "@/lib/action";
import { cn } from "@/lib/utils";
import { useState } from "react";

const FriendButton = ({
  username,
  state,
}: {
  username: string;
  state: boolean;
}) => {
  const [isFriending, setIsFriending] = useState(false);
  const friendHandler = async () => {
    setIsFriending(true);
    const res = await friendUnAction(username, state);
    if (!res?.error) {
      console.log(res?.message);
    } else {
      console.log(res.message);
    }
    setIsFriending(false);
  };
  return (
    <div>
      <button
        disabled={isFriending}
        onClick={friendHandler}
        type="button"
        className={cn(
          "w-20 h-9 rounded-md bg-emerald-700 cursor-pointer hover:bg-emerald-900 disabled:bg-gray-700 disabled:cursor-default",
          state === true && "bg-pink-700 hover:bg-pink-900"
        )}
      >
        {state === false ? "Friend" : "Unfriend"}
      </button>
    </div>
  );
};

export default FriendButton;
