import { BsThreeDots } from "react-icons/bs";
import { TfiCommentAlt } from "react-icons/tfi";
import VotesComponent from "./VotesComp";
import type { PostData } from "@/lib/types";
import { useState } from "react";
import CommentSubmittionComponent from "../Submittions/CommentSubmittion";

const ActionsComponent = ({ post }: { post: PostData }) => {
  const [openComment, setOpenComment] = useState(false);

  return (
    <>
      <div className="flex flex-row  text-lg items-center px-1 pt-2 justify-between ">
        <span className="flex-row items-center flex gap-2 basis-1/3">
          <TfiCommentAlt
            className="cursor-pointer"
            title="Leave a comment"
            onClick={() => setOpenComment((prev) => !prev)}
          />
          {post.num_comments}
        </span>
        <div className="basis-1/3">
          <VotesComponent post={post} />
        </div>
        <div className="basis-1/3 flex justify-end">
          <BsThreeDots />
        </div>
      </div>
      {openComment && (
        <div className=" w-full relative">
          <CommentSubmittionComponent parentId={post.name} />
        </div>
      )}
    </>
  );
};

export default ActionsComponent;
