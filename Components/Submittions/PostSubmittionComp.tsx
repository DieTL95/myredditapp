import { getSubRules, postSubmitAction } from "@/lib/action";
import type { SubredditRules } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const PostSubmittionComponent = ({ page }: { page?: string }) => {
  const [kind, setKind] = useState<"link" | "self">("self");
  const [rules, setRules] = useState<SubredditRules>();
  // const subreddit = "u_IdkWhoTheFuckIAm";
  // const title = "Helllo this is a test post";
  // const text = "I dk really, anything, will delete soon anyway.";
  // const id = "t3_1mfpur4";
  // const modhash = "u5zmv0cquo7f5af75febc6764ac87167258ea2530dce9aae3e";
  useEffect(() => {
    if (!page) {
      return;
    }
    const rules = async () => {
      const res = await getSubRules(page);
      if (res) {
        setRules(res);
      }
    };
    rules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const post = async (formData: FormData) => {
    console.log(FormData);

    const text = formData.get("post")?.toString();
    const title = formData.get("title")?.toString();
    if (!title) {
      return;
    }
    if (!page) {
      return;
    }
    const res = await postSubmitAction({
      subreddit: page,
      text: text,
      title: title,
      kind,
    });
    if (res.ok) {
      console.log(res);
    }
    // console.log(text, title);
    // const res = await submitAction({
    //   kind,
    //   subreddit: page,
    //   title,
    //   text,
    //   modhash,
    // });
    // console.log(res);
  };

  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-col w-[40vw] px-4 gap-8 my-auto h-screen border border-twitter-gray">
        <div className="flex gap-2 ">
          <span
            onClick={() => setKind("link")}
            className={cn(
              "py-4 px-2 cursor-pointer bg-gray-600 hover:bg-gray-400 ",
              kind === "link" && "underline"
            )}
          >
            Link
          </span>
          <span
            onClick={() => setKind("self")}
            className={cn(
              "p-5 cursor-pointer bg-gray-600 hover:bg-gray-400 ",
              kind === "self" && "underline"
            )}
          >
            Self
          </span>
        </div>{" "}
        <div>
          <form action={post} className="flex flex-col w-full gap-2">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              className="bg-gray-600 rounded-[16px]"
            />
            {kind === "self" && (
              <div className="flex flex-col w-full">
                <label htmlFor="post">Post text</label>
                <textarea
                  name="post"
                  id="post"
                  className="bg-gray-600 rounded-[16px]"
                />
              </div>
            )}
            <button
              type="submit"
              className="bg-cyan-800 hover:bg-cyan-900 cursor-pointer h-10 flex justify-center items-center text-center"
            >
              Submittttt
            </button>
          </form>
        </div>
      </div>
      <div>
        {rules?.rules.map((rule, index) => (
          <div key={index}>{rule.short_name}</div>
        ))}
      </div>
    </div>
  );
};

export default PostSubmittionComponent;
