"use client";

import { loginAction } from "@/actions/auth.action";
import Alert from "@/components/Alert";
import SocialProviders from "@/components/SocialProviders";
import Spinner from "@/components/Spinner";
import { LoginShema } from "@/utils/validationSchemas";
import { useState } from "react";

import { IoMdLogIn } from "react-icons/io";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientError, setClientError] = useState("");
  const [serverError, setServerError] = useState("");

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = LoginShema.safeParse({ email, password });
    if (!validation.success) {
      return setClientError(validation.error.issues[0].message);
    }
    setLoading(true);
    loginAction({ email, password }).then((result) => {
      if (!result?.success) setServerError(result.message);
      setLoading(false);
    });
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <div className="flex flex-col mb-3">
        <label className="p-1 text-slate-500 font-bold" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="border border-slate-500 rounded-lg px-2 py-1 text-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="flex flex-col mb-3">
        <label className="p-1 text-slate-500 font-bold" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="border border-slate-500 rounded-lg px-2 py-1 text-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>
      {(clientError || serverError) && (
        <Alert type="error" message={clientError || serverError} />
      )}
      <button
        disabled={loading}
        className="flex items-center justify-center bg-slate-800 hover:bg-slate-900 mt-4 text-white cursor-pointer rounded-lg w-full p-2 text-xl disabled:bg-gray-300"
        type="submit"
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            <IoMdLogIn className="me-1 text-2xl" /> Login
          </>
        )}
      </button>
      <SocialProviders />
    </form>
  );
};

export default LoginForm;
