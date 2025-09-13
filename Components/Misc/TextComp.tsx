import { cn } from "@/lib/utils";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { useEffect, useRef, useState } from "react";
import ViewImageComponent from "../Viewers/ViewImgComponent";
const TextComponent = ({ post }: { post: string }) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const [media, setMedia] = useState<string | undefined>();
  const regex =
    /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1.*?(png|gif|jpeg|jpg|webp)/gm;
  const reggedSelf = regex.exec(post);
  useEffect(() => {
    if (innerRef.current && reggedSelf) {
      const dialog = document.querySelector("dialog");

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

      if (dialog?.open) {
        document.getElementById("thing")?.addEventListener("click", () => {
          dialog?.close();
          setMedia(undefined);
        });
      }

      return () => {
        if (dialog?.open) {
          document.getElementById("thing")?.removeEventListener("click", () => {
            dialog?.close();
            setMedia(undefined);
          });
        }
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
      {media && <ViewImageComponent image={media} />}
    </div>
  );
};

export default TextComponent;
