import { blockUserAction } from "@/lib/action";
import { Ban } from "lucide-react";
import { toast } from "sonner";

const BlockComponent = ({
  account,
  name,
}: {
  account: string;
  name: string;
}) => {
  const blockHandler = async () => {
    const res = await blockUserAction(account, name);
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
        });
      }}
    >
<Ban size={20} />      <span>Block {name}</span>
    </div>
  );
};

export default BlockComponent;
