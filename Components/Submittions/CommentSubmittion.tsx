import { commentSubmitAction } from "@/lib/action";
import { useState } from "react";

const CommentSubmittionComponent = ({ parentId }: { parentId: string }) => {
  const [text, setText] = useState<string>("");
  const handleSubmit = async () => {
    const res = await commentSubmitAction(text, parentId);
    if (res.ok) {
      console.log(res);
    }
  };
  return (
    <div className="max-h-[50vw] -ml-[71px] top-2 w-full border border-twitter-gray absolute">
      <div>
        <textarea
          name="text"
          id="text"
          className="min-h-20 w-full"
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="bg-cyan-800 hover:bg-cyan-900 cursor-pointer h-6 flex justify-center items-center text-center"
          onClick={handleSubmit}
        >
          Submittttt
        </button>
      </div>
    </div>
  );
};

export default CommentSubmittionComponent;
