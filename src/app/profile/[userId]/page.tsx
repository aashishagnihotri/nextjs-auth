"use client";

export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col justfy-center items-center min-h-screen p-2">
      <h1>Profile page</h1>
      <hr />
      <p>
        Profile Page{" "}
        <p className="text-2xl bg-orange-400 text-black p-2">{params.userId}</p>
      </p>
    </div>
  );
}
