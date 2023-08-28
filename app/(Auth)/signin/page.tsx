"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import "../styles/auth.css";
import OauthBtn from "../component/OauthBtn";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

type SignInProps = {
  email: string;
  password: string;
};

const SignIn = () => {
  const searchParam = useSearchParams();
  const router = useRouter();
  const form = useForm<SignInProps>();
  const [hasError, setHasError] = useState("");
  const callbackUrl = searchParam.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: SignInProps) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        ...data,
        callbackUrl,
      });
      console.log("res", res);
      if (!res?.error) {
        router.push(callbackUrl);
        toast.error(`Hello, ${data.email}, welcome back!`, { icon: "👋" });
      } else {
        toast.error("Invalid email and password", { icon: "❌" });
      }
    } catch (error) {
      setHasError(error as string);
    }
  };

  return (
    <div className="max-w-[95vw] h-[80vh] flex flex-col justify-center mx-auto xs:w-[400px]">
      <div className="flex justify-center mb-20">
        <Image src="/assets/logo.svg" width={35} height={35} alt="logo" />
      </div>

      <div className="bg-prime-dark py-10 px-8 rounded-2xl">
        <h2 className="text-white text-3xl/3 font-light mb-12">Login</h2>

        <form className="bg-prime-dark" onSubmit={handleSubmit(onSubmit)}>
          <div className="input_body">
            <input
              className="input_field inset-y-0 autofill:bg-prime-dark"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email can't be empty",
              })}
            />
            <span className="input_error">{errors.email?.message}</span>
          </div>

          <div className="input_body">
            <input
              className="input_field inset-y-0"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password can't be empty",
              })}
            />
            <span className="input_error">{errors.password?.message}</span>
          </div>

          <button className="submit_btn">Login to your account</button>

          <p className="text-center text-sm mb-10">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-prime-orange ml-2 cursor-pointer hover:underline decoration-white"
            >
              Sign Up
            </Link>
          </p>
        </form>

        <span className="flex items-center justify-center gap-4 text-sm mb-5">
          <hr className="border-[0.1px] border-prime-gray w-24" />
          or login with
          <hr className="border-[0.1px] border-prime-gray w-24" />
        </span>
        {/* <p className="text-sm text-prime-gray text-center">
          Log in using email address
        </p> */}
        <OauthBtn />
      </div>
    </div>
  );
};

export default SignIn;
