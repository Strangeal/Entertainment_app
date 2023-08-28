"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "../styles/auth.css";
import OauthBtn from "../component/OauthBtn";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type RegisterProps = {
  name: string;
  email: string;
  password: string;
};

const page = () => {
  const router = useRouter();
  const form = useForm<RegisterProps>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: RegisterProps) => {
    console.log(data);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          ...data,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("sign up res", res);

      if (res.ok) {
        router.push("/signin");
        toast.success("Your account has been created successfully", {
          icon: "✅🚀😊",
        });
      } else {
        toast.error("Oops! Something went wrong", { icon: "😥❌" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-[95vw] flex flex-col justify-center mx-auto xs:w-[400px]">
      <div className="flex justify-center mb-10">
        <Image src="/assets/logo.svg" width={35} height={35} alt="logo" />
      </div>

      <div className="bg-prime-dark py-10 px-8 rounded-2xl">
        <h2 className="text-white text-3xl mb-5 font-light">Sign Up</h2>

        <form
          className="bg-prime-dark"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="input_body">
            <input
              className="input_field inset-y-0 autofill:bg-prime-dark"
              type="text"
              placeholder="Name"
              {...register("name", {
                required: "Name can't be empty",
              })}
            />
            <span className="input_error">{errors.name?.message}</span>
          </div>
          <div className="input_body">
            <input
              className="input_field inset-y-0 autofill:bg-prime-dark"
              type="email"
              placeholder="Email"
              {...register("email", {
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Invalid email format",
                },
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
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <span className="input_error">{errors.password?.message}</span>
          </div>

          <button className="submit_btn">Create an account</button>
          <p className="text-xs mb-3">
            By confirming your email, you agree to our{" "}
            <Link
              href="/register"
              className="text-prime-orange hover:underline hover:text-prime-orange/90 decoration-white"
            >
              Terms of Service
            </Link>{" "}
            and that you have read and understood our{" "}
            <Link
              href="/register"
              className="text-prime-orange hover:underline hover:text-prime-orange/90 decoration-white"
            >
              Privacy Policy
            </Link>
            .
          </p>

          <p className="text-center text-sm mb-10">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-prime-orange ml-2 cursor-pointer hover:underline decoration-white"
            >
              Login
            </Link>
          </p>
        </form>

        <span className="flex items-center justify-center gap-4 text-sm mb-5">
          <hr className="border-[0.1px] border-prime-gray w-24" />
          or Sign up with
          <hr className="border-[0.1px] border-prime-gray w-24" />
        </span>

        <OauthBtn />
      </div>
    </div>
  );
};

export default page;
