"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [disableButton, setDisableButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    password: "",
    email: "",
  });
  const login = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      if (response?.data?.error) {
        toast.error(response?.data?.error);
      } else {

        toast.success("Login Successful");
        router.push("/profile");
      }
    } catch (error: any) {
      console.log("Login Failed", error?.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [user]);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 border-gray-300">
        <h1 className="text-center text-2xl text-white p-4">
          {loading ? "Processing..." : "Login"}
        </h1>
        <hr />
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
            className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
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
            className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          />
        </div>
        <button
          onClick={login}
          className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Login
        </button>
        <Link href={"/signup"}>Visit Signup Page</Link>
        <Link href={"/forgotPassword"}>ForgotPassword</Link>
      </div>
    </>
  );
}
