import { cn } from "@/lib/utils";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { useEffect, useRef, useState } from "react";
import ViewImageComponent from "../Viewers/ViewImgComponent";
const TextComponent = ({ post }: { post: string }) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [media, setMedia] = useState<string | undefined>();
  const regex =
    /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1.*?(png|gif|jpeg|jpg|webp)/gm;
  const reggedSelf = regex.exec(post);
  useEffect(() => {
    if (innerRef.current && reggedSelf) {
      const replyBody = innerRef.current.querySelector(".replyImage");

      if (replyBody) {
        if (replyBody.querySelector("a")) {
          replyBody.querySelector("a")!.innerHTML =
            `<Image src=${reggedSelf[2]} width=${300} height=${300} className="pb-1" alt="Inline image"  />`;
        }
        replyBody.querySelector("a")?.addEventListener("click", (e: Event) => {
          e.preventDefault();

          setMedia(reggedSelf[2].replace(/&amp;/g, "&"));
        });
      }

      modalRef.current?.showModal();

      return () => {
        if (replyBody) {
          replyBody
            .querySelector("a")
            ?.removeEventListener("click", (e: Event) => {
              e.preventDefault();

              setMedia(reggedSelf[2].replace(/&amp;/g, "&"));
            });
        }
      };
    }
  }, [reggedSelf]);

  return (
    <div ref={innerRef}>
      <div
        className={cn(
          "reply",
          reggedSelf?.input ? "replyImage" : "replyLink after:content-['']"
        )}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            marked
              .parse(post.replace(/\n(?=\n)/g, "\n\n<br/>\n"), {
                gfm: true,
                breaks: true,
              })
              .toString()
          ),
        }}
      />
      {media && (
        <dialog
          className="dialog min-w-full  min-h-[100vh] justify-center items-center overflow-x-hidden backdrop:bg-black/85 bg-transparent"
          ref={modalRef}
        >
          <div
            className=" absolute top-0 bottom-0 right-0 left-0 h-full w-full z-10"
            onClick={() => {
              modalRef.current?.close();
              setMedia(undefined);
            }}
          ></div>

          <div>
            <ViewImageComponent image={media} />
          </div>
        </dialog>
      )}
    </div>
  );
};

export default TextComponent;
