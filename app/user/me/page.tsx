import DeleteUser from "@/Components/User/DeleteUser";
import SignOutComp from "@/Components/User/SignOutComp";

import { auth } from "@/utils/auth";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

const UserOwnPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/signin");
  }

  // const user = await fetchMeAction();
  // console.log(user);

  return (
    <div className="w-full h-screen">
      {session.user ? (
        <div className="flex flex-col mx-auto my-auto">
          {session.user.name}
          <div className="cursor-pointer">
            <SignOutComp />
            <DeleteUser />
          </div>
        </div>
      ) : (
        "No User :("
      )}
    </div>
  );
};

export default UserOwnPage;
