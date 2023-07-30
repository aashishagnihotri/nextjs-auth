"use client";
import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  async function logout() {
    try {
      const request = await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  async function getDetails() {
    const data = await axios.get("/api/users/me");
    setUserData(data?.data?.username);
  }

  useEffect(() => {}, [userData]);
  return (
    <div className="flex flex-col justfy-center items-center min-h-screen p-2">
      <h1>Profile page</h1>
      <h2 className="rounded p-2 bg-green-400">
        {userData ? <Link href={`/profile/${userData}`} /> : null}
      </h2>
      <hr />
      <p>Profile Page</p>
      <button
        onClick={logout}
        className="bg-red-400 hover:bg-red-700 py-2 px-4 text-white rounded font-bold "
      >
        Logout
      </button>
      <button
        onClick={getDetails}
        className="bg-green-400 hover:bg-green-700 py-2 px-4 text-white rounded font-bold "
      >
        Get Details
      </button>
    </div>
  );
}
