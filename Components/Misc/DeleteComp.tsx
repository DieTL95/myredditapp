import { deleteAction } from "@/lib/action";
import { toast } from "sonner";
import { authClient } from "@/utils/auth-client";
import { Trash2 } from "lucide-react";

const DeletionComponent = ({
  name,
  author,
}: {
  name: string;
  author: string;
}) => {
  const { data: session } = authClient.useSession();
  const username = session?.user.name;

  const deletionHandler = async () => {
    const res = await deleteAction(name);
    if (!res?.error) {
      return res?.message;
    } else {
      return res.message;
    }
  };

  return username && username === author ? (
    <div
      className="flex items-center w-full cursor-pointer gap-2 py-3 px-4  text-red-700  hover:bg-gray-800"
      onClick={() => {
        toast.promise(deletionHandler, {
          loading: "Deleting...",
          success: (e) => e,
        });
      }}
    >
      <Trash2 size={20} /> <span>Delete</span>
    </div>
  ) : (
    ""
  );
};

export default DeletionComponent;
