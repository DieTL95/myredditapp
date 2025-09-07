import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import db from "@/utils/prisma";
import { redirect } from "next/navigation";
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
      {!session?.user ? (
        <Link href="/signin">Signin</Link>
      ) : (
        <Link className="flex flex-row gap-2" href="/user/me">
          <Image
            src={image!}
            width={0}
            height={0}
            sizes="100px"
            className="rounded-[50%]"
            style={{ maxHeight: "30px", width: "auto" }}
            alt={user!}
          />
          {user}
        </Link>
      )}
    </div>
  );
};

export default NavUserComponent;
