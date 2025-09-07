"use client";
import { authClient } from "@/utils/auth-client";

const SigninPage = () => {
  const handleLogin = async () => {
    const { data } = await authClient.signIn.social({
      provider: "reddit",
    });

    console.log("Data: ", data);
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex w-full h-full justify-center items-center">
        <span>You need to use your Reddit account to Authorise this app.</span>
        <button onClick={handleLogin}> Click </button>
      </div>
    </div>
  );
};

export default SigninPage;
