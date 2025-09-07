import { voteAction } from "@/lib/action";
import type { VotesPropType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { IoArrowUp, IoArrowDown } from "react-icons/io5";

const VotesComponent = ({ post }: { post: VotesPropType }) => {
  const [isVoting, setIsVoting] = useState<boolean>(false);
  const [voteState, setVoteState] = useState<boolean | null>(post.likes);
  const handleVote = async (state: string) => {
    setIsVoting(true);
    if (state === "upvote" && (voteState === false || voteState === null)) {
      const res = await voteAction(post.name, 1);
      if (!res?.error) {
        setVoteState(true);
        console.log("yay");
      }
    } else if (
      state === "downvote" &&
      (voteState === true || voteState === null)
    ) {
      const res = await voteAction(post.name, -1);
      if (!res?.error) {
        setVoteState(false);

        console.log("nay");
      }
    } else if (
      (state === "upvote" && voteState === true) ||
      (state === "downvote" && voteState === false)
    ) {
      const res = await voteAction(post.name, 0);
      if (!res?.error) {
        setVoteState(null);

        console.log("meh");
      }
    }
    setIsVoting(false);
  };
  return (
    <div className="flex-row flex gap-1 items-center">
      <button
        disabled={isVoting}
        type="button"
        className={cn(
          "hover:bg-gray-800 rounded-[50%] p-1 cursor-pointer",
          isVoting && "cursor-wait bg-grey-800"
        )}
        onClick={() => handleVote("upvote")}
      >
        <IoArrowUp
          className={cn(
            "text-[1.250rem]",
            voteState === true && "text-pink-500"
          )}
        />{" "}
      </button>
      {post.score}{" "}
      <button
        type="button"
        disabled={isVoting}
        className={cn(
          "hover:bg-gray-800 rounded-[50%] p-1 cursor-pointer",
          isVoting && "cursor-wait bg-grey-800"
        )}
        onClick={() => handleVote("downvote")}
      >
        <IoArrowDown
          className={cn(
            "text-[1.250rem]",
            voteState === false && "text-purple-500"
          )}
        />
      </button>
    </div>
  );
};

export default VotesComponent;
