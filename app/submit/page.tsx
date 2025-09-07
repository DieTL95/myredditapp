"use client";
import { deleteAction, submitAction } from "@/lib/action";

const SubmittionPage = () => {
  const kind = "self";
  const subreddit = "u_IdkWhoTheFuckIAm";
  const title = "Helllo this is a test post";
  const text = "I dk really, anything, will delete soon anyway.";
  const id = "t3_1mfpur4";
  const modhash = "u5zmv0cquo7f5af75febc6764ac87167258ea2530dce9aae3e";

  const submitHandler = async () => {
    const res = await submitAction({ kind, subreddit, title, text, modhash });
    console.log(res);
  };
  const deleteHandler = async () => {
    const res = await deleteAction(id, modhash);
    console.log(res);
  };
  return (
    <div className="flex flex-col mx-auto gap-8 my-auto h-screen">
      {" "}
      <div
        onClick={submitHandler}
        className="bg-cyan-800 hover:bg-cyan-900 cursor-pointer h-24 flex justify-center items-center text-center"
      >
        Submittttt
      </div>
      <div
        onClick={deleteHandler}
        className="bg-red-800 hover:bg-red-900 cursor-pointer h-24 flex justify-center items-center text-center"
      >
        Deleeetteeeee
      </div>
    </div>
  );
};

export default SubmittionPage;
