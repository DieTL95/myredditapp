"use client";
import { authClient } from "@/utils/auth-client";

const SignOutComp = () => {
  const signOutHandler = async () => {
    await authClient.signOut();
  };

  return <button onClick={signOutHandler}>Sign out</button>;
};

export default SignOutComp;
