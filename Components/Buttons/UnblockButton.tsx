"use client";
import { unblockUserAction } from "@/lib/action";
import { CircleAlert } from "lucide-react";
import { toast } from "sonner";
const UnblockComponent = ({ account }: { account: string }) => {
  const blockHandler = async () => {
    const res = await unblockUserAction(account);
    if (!res?.error) {
      return res?.message;
    } else {
      return res.message;
    }
  };

  return (
    <div
      className="flex items-center w-full cursor-pointer gap-2 py-3 px-4  hover:bg-gray-800"
      onClick={() => {
        toast.promise(blockHandler, {
          loading: "Blocking...",
          success: (e) => e,
          error: (e) => e,
        });
      }}
    >
      <CircleAlert size={20} /> <span>Unblock</span>
    </div>
  );
};

export default UnblockComponent;
