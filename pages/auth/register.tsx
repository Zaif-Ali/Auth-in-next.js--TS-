import axios from "axios";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RegisterFormData } from "../../interfaces/IRClient";
import validateEmail from "../../lib/ValidateEmail";

interface Props {}

const Register: NextPage<Props> = ({}) => {
  //use Form Hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  // Handle Submit Btn
  const HandleSubmitRegister = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full mx-2 md:mx-0 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create a new Account
          </h1>
          <form className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Name
              </label>
              <input
                autoComplete="name"
                type="name"
                {...register("name", {
                  required: true,
                  minLength: 5,
                })}
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Joe Smith"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500 text-sm pt-1">Name was required</p>
              )}
              {errors.name?.type === "minLength" && (
                <p className="text-red-500 text-sm pt-1">
                  Name must my greater than 5 character
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Email
              </label>
              <input
                autoComplete="email"
                type="email"
                {...register("email", {
                  required: true,
                  minLength: 11,
                  validate: validateEmail,
                })}
                name="email"
                id="email"
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
                autoComplete="current-password"
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                name="password"
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
              onClick={handleSubmit(HandleSubmitRegister)}
              type="submit"
              className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            >
              Register
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account.{" "}
              <Link
                href={"/auth/login"}
              >
                <a className="font-medium text-purple-600 hover:underline dark:text-purple-400"> Login</a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
