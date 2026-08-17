"use client";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
type Provider = "githup" | "google";
const SocialProviders = () => {
  const socialLoginHandler = (provider: Provider) => {
    signIn(provider, { redirectTo: "/profile" });
  };
  return (
    <div className="flex items-center justify-center gap-6 mt-6">
      <div
        onClick={() => socialLoginHandler("githup")}
        className="border bg-slate-100 hover:bg-slate-200 rounded px-4 py-2 cursor-pointer w-1/2 flex justify-center items-center"
      >
        <FaGithub className="text-4xl" />
      </div>
    </div>
  );
};

export default SocialProviders;
