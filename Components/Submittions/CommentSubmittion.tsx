import { commentSubmitAction } from "@/lib/action";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const CommentSubmittionComponent = ({
  parentId,
  parent,
}: {
  parentId: string;
  parent?: string;
}) => {
  const [text, setText] = useState<string>("");
  const [isOpen, setIsOpen] = useState(parent === "reply" ? true : false);
  const [submitting, setSubmitting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parent !== "reply") {
      const handleOutsideClick = (e: Event) => {
        const target = e.target as Element;

        if (
          ref.current &&
          (!ref.current.contains(target) || target.id === "submittion")
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("click", handleOutsideClick);

      return () => {
        document.removeEventListener("click", handleOutsideClick);
      };
    }
  }, [parent, ref]);

  const handleSubmit = async () => {
    setSubmitting(true);
    const res = await commentSubmitAction(text, parentId);
    setSubmitting(false);
    return res;
  };

  return (
    <div className=" w-full border border-twitter-gray bg-black rounded-2xl ">
      <div
        ref={ref}
        className={cn(
          "submittion transition-[height] ease-out h-[75px] max-h-[125px]  w-full ",
          isOpen && "h-[125px]"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="w-full h-full p-2">
            <textarea
              name="text"
              style={{ resize: "none" }}
              id="text"
              className=" w-full h-full  focus-visible:outline-0 focus-visible:border-0"
              onChange={(e) => setText(e.target.value)}
              onClick={() => setIsOpen(true)}
              placeholder="Leave a comment?"
            ></textarea>
          </div>
          {isOpen && (
            <div className="w-full flex justify-end">
              <button
                type="button"
                className={cn(
                  "bg-pink-900 hover:bg-pink-800 cursor-pointer px-4 py-2 mr-2  rounded-2xl h-fit w-fit flex justify-center items-center text-center",
                  submitting && "cursor-wait"
                )}
                disabled={submitting}
                onClick={() => {
                  toast.promise(handleSubmit, {
                    loading: "Posting...",
                    success: (arg) => redirect(arg[0].data.permalink),
                    error: "Couldn't submit comment.",
                  });
                }}
              >
                Post
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSubmittionComponent;
