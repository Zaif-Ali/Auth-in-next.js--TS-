import { NextPage } from "next";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Link from "next/link";
import validateEmail from "../../lib/ValidateEmail";
import { LoginFormData } from "../../interfaces/IRClient";
import { useisLogged } from "../../store/islogged";

interface Props {}

const Login: NextPage<Props> = ({}) => {
  const { loggedtrue } = useisLogged();
  // use Form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  // Handle submit
  const HandleSubmitLogin = (data: LoginFormData) => {
    console.log(data);
    loggedtrue();
    router.push("/");
  };

  const router = useRouter();
  // const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setdata((prevstate) => ({
  //     ...prevstate,
  //     [e.target.name]: e.target.value,
  //   }));
  // };
  // const signin = async () => {
  //   try {
  //     const res = await axios.post("/api/auth/signin",  userData );
  //     const data = res.data;
  //     console.log(data);
  //     router.push('/');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full mx-2 md:mx-0 border border-gray-400 bg-gray-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: true,
                  minLength: 11,
                  validate: validateEmail,
                })}
                name="email"
                id="email"
                autoComplete="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500 text-sm pt-1">email was required</p>
              )}
              {errors.email?.type === "validate" && <p>Invalid Email</p>}
              {errors.email?.type === "minLength" && (
                <p className="text-red-500 text-sm pt-1">Invalid Email</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                name="password"
                autoComplete="current-password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.password?.type === "minLength" && (
                <p className="text-red-500 text-sm pt-1">
                  password must have a 6 character
                </p>
              )}
            </div>

            <button
              onClick={handleSubmit(HandleSubmitLogin)}
              type="submit"
              className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            >
              Login
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <Link href={"/auth/register"}>
                <a className="font-medium text-purple-600 hover:underline dark:text-purple-500">
                  Register
                </a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
