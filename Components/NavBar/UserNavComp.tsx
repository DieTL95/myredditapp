import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import Link from "next/link";
import db from "@/utils/prisma";
import { redirect } from "next/navigation";
import DropdownComponent from "./DropdownComp";
const NavUserComponent = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (session?.user) {
    const user = await db.user.findUnique({
      where: {
        id: session?.user.id,
      },
      select: {
        accounts: {
          where: {
            userId: session?.user.id,
          },
          select: {
            id: true,
          },
        },
      },
    });
    const account = await db.account.findUnique({
      where: {
        id: user?.accounts[0].id,
      },
    });
    const now = new Date(Date.now());

    if (!account?.accessTokenExpiresAt) {
      redirect("/signin");
    }
    if (account?.accessTokenExpiresAt < now) {
      console.log("awawawawa");
      const res = await auth.api.refreshToken({
        body: {
          providerId: "reddit",
          userId: session?.user.id,
          accountId: account.id,
        },
      });

      console.log(res);
    }
  }
  const user = session?.user.name;
  const image = session?.user.image;

  return (
    <div>
      {!user ? (
        <Link href="/signin">Signin</Link>
      ) : (
        <DropdownComponent user={user} image={image} />
      )}
    </div>
  );
};

export default NavUserComponent;
