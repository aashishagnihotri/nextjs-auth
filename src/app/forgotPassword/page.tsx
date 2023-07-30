"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  async function handleSubmit() {
    console.log(email);
    const setPassword = await axios.post("/api/users/forgotPassword", {
      email: email,
    });
    router.push("/resetPassword");
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <label className="p-2" htmlFor="email">
        Enter your Email
      </label>
      <input
        className="p-2 text-black text-2xl"
        placeholder="Enter your Email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <br />
      <button
        onClick={handleSubmit}
        className="text-white rounded bg-green-500 hover:bg-green-800 p-2 text-4xl"
      >
        Send Email
      </button>
      <Link
        className="bg-gray-400 hover:bg-gray-600 text-2xl rounded mt-2 p-2"
        href={"/login"}
      >
        Go to Login
      </Link>
    </div>
  );
}
