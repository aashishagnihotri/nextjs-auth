"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  async function verifyUserEmail() {
    try {
      await axios.post("/api/users/verifyToken", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (token?.length > 0) {

      verifyUserEmail();
    }
  }, [token]);

  useEffect(() => {
    const urlToken = window.location?.search.split("=")?.[1];
    setToken(urlToken || "");
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen py-2">
        <h1 className="text-4xl">Verify your Email</h1>
        <h2 className="text-2xl bg-orange-500 text-black">
          {token ?? "No Email"}
        </h2>
        {verified && (
          <>
            <div className="bg-blue-400 text-cyan-800">Verified Email</div>
            <Link href="/login">Login</Link>
          </>
        )}
        {error && (
          <>
            <h1 className="text-red-700 bg-red-400 font-bold">Error</h1>
          </>
        )}
      </div>
    </>
  );
}
