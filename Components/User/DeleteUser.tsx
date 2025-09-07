"use client";

import { authClient } from "@/utils/auth-client";

const DeleteUser = () => {
  const deleteHandler = async () => {
    await authClient.deleteUser({
      callbackURL: "/signin",
    });
  };
  return (
    <div
      onClick={deleteHandler}
      className="bg-red-800 hover:bg-red-900 h-24 flex justify-center items-center text-center"
    >
      Delete Account?
    </div>
  );
};

export default DeleteUser;
