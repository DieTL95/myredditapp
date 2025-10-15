import { useEffect, useRef, useState } from "react";
import VotesComponent from "./../Posts/VotesComp";
import type { Comments } from "@/lib/types";
import CommentSubmittionComponent from "../Submittions/CommentSubmittion";
import DeletionComponent from "../Misc/DeleteComp";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Ellipsis,
  Link,
  MessageCircle,
  SquareArrowOutUpRight,
} from "lucide-react";

const CommentsActionsComponent = ({ reply }: { reply: Comments }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hostDomain = "localhost:3000";
  const [isClicked, setIsClicked] = useState(false);

  const elBounds = ref.current?.getBoundingClientRect();
  const winHeight = window.innerHeight;
  const spaceBelow = elBounds && winHeight - elBounds.bottom;
  const spaceAbove = elBounds?.top;

  const copytoClipboard = async (text: string) => {
    const type = "text/plain";
    const clipData = {
      [type]: text,
    };
    const clipboardItem = new ClipboardItem(clipData);
    await navigator.clipboard.write([clipboardItem]).then(() => {
      toast("Copied to clipboard.");
    });
  };

  useEffect(() => {
    const handleOutsideClick = (e: Event) => {
      const target = e.target as Element;

      if (
        ref.current &&
        (!ref.current.contains(target) ||
          ref.current.querySelector("#actionMenu")?.contains(target))
      ) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [ref]);

  return (
    <>
      <div className="flex flex-row  text-lg items-center px-1 pt-2 justify-between">
        <div className="basis-1/3 flex justify-start">
          <span
            className={cn(
              "flex-row flex gap-2 items-center cursor-pointer",
              !reply.send_replies && "cursor-default text-gray-400"
            )}
            onClick={() => {
              if (reply.send_replies) setIsClicked((prev) => !prev);
            }}
          >
            {reply.replies && reply.replies.data.children.length}{" "}
            <MessageCircle size={20} />
          </span>
        </div>
        <div className="basis-1/3">
          <VotesComponent post={reply} />
        </div>
        <div className="basis-1/3 flex justify-end relative">
          <div
            className="cursor-pointer hover:bg-gray-800 rounded-full p-1"
            onClick={() => setOpenMenu((prev) => !prev)}
            ref={ref}
          >
            <Ellipsis size={20} />
            {openMenu && spaceAbove && spaceBelow && (
              <div
                className={cn(
                  "absolute z-100 h-fit w-fit right-0 bg-black border border-twitter-gray shadow-box-shadow-white  rounded-[16px]",
                  spaceAbove > spaceBelow && "bottom-0",
                  spaceAbove < spaceBelow && "top-0"
                )}
              >
                <div
                  className="flex flex-col justify-center divide-y divide-twitter-gray  w-full text-lg list-none"
                  id="actionMenu"
                >
                  <div className="flex items-center gap-2 py-3 px-4 cursor-pointer w-full border-b border-b-twitter-gray rounded-t-[16px] hover:bg-gray-800">
                    <Link size={20} />

                    <span
                      onClick={() =>
                        copytoClipboard(`${hostDomain}${reply.permalink}`)
                      }
                    >
                      Copy Post Link.
                    </span>
                  </div>{" "}
                  <div className="flex items-center w-full cursor-pointer gap-2 py-3 px-4 border-b border-b-twitter-gray hover:bg-gray-800">
                    <SquareArrowOutUpRight size={20} />

                    <span
                      onClick={() =>
                        copytoClipboard(`https://reddit.com${reply.permalink}`)
                      }
                    >
                      Copy Reddit Link.
                    </span>
                  </div>
                  <DeletionComponent name={reply.name} author={reply.author} />
                  <li>Hola</li>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={cn(
          "transition-[height]  ease-out h-0  max-h-fit",
          isClicked && "h-fit mt-2"
        )}
      >
        {isClicked && (
          <CommentSubmittionComponent parentId={reply.name} parent="reply" />
        )}
      </div>
    </>
  );
};

export default CommentsActionsComponent;
