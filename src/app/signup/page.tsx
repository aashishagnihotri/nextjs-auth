"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignUp() {
  const router = useRouter();
  const [disableButton, setDisableButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [user]);

  const signUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);

      if (response?.data?.error) {
        toast.error("Some Error Occured. Please Try Again!");
      } else if (response?.data?.success === false) {
        toast.error(response?.data?.message);
      } else {
        toast.success("Successfully Signed Up!");
        router.push("/login");
      }
    } catch (error: any) {
      console.log("signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 border-gray-300">
        <h1 className="text-center text-2xl text-white p-4">
          {loading ? "Processing" : "Sign Up"}
        </h1>

        <hr />
        <div className="input">
          <label htmlFor="username" className="p-2">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
            placeholder="Enter your username"
            className="p-2 border-gray-300 text-black rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          />
        </div>
        <div className="input">
          <label htmlFor="password" className="p-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            placeholder="Enter your Password"
            className="p-2 border-gray-300 text-black rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          />
        </div>
        <div className="input">
          <label htmlFor="email" className="p-2">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            placeholder="Enter your email"
            className="p-2 border-gray-300 text-black rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          />
        </div>
        <button
          onClick={signUp}
          className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          {disableButton ? "No Signup " : "Signup"}
        </button>
        <Link href={"/login"}>Visit Login Page</Link>
      </div>
    </>
  );
}
