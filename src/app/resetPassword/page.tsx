"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    setLoading(true);
    const passwordUpdate = await axios.post("/api/users/resetPassword", {
      password,
      resetToken: window.location.search.split("=")[1],
    });
    if (passwordUpdate?.data?.success) {
      setLoading(false);
      toast.success(passwordUpdate?.data?.message);
      router.push("/login");
    } else {
      toast.error(passwordUpdate?.data?.error ?? passwordUpdate?.data?.message);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h2 className="text-4xl text-white bg-blue-800">
        {loading ? "Processing..." : null}{" "}
      </h2>
      <label className="p-2" htmlFor="email">
        Enter your New Password
      </label>
      <input
        type="password"
        className="p-2 text-black text-2xl"
        placeholder="Enter your New Password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <br />
      <button
        onClick={handleSubmit}
        className="text-white rounded bg-green-500 hover:bg-green-800 p-2 text-4xl"
      >
        Reset Password
      </button>
      <Link
        className="bg-gray-400 rounded hover:bg-gray-600 text-2xl mt-2 p-2"
        href={"/login"}
      >
        Go to Login
      </Link>
    </div>
  );
}
