"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const { data: session } = useSession();
  let userName = session ? session.user.name : "Name";
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }
  console.log(session);
  return (
    <div className="flex justify-between items-center max-w-5xl mx-auto py-8 px-8">
      <h2 className="hidden md:inline-flex hover:text-red-600 font-semibold text-2xl cursor-pointer transition-transform duration-200">
        {session ? session.user.name : "Sign In"}
      </h2>
      <h2 className="md:hidden hover:text-red-500 font-semibold text-2xl cursor-pointer transition-transform duration-200">
        {session ? userName : "Sign In"}
      </h2>
      {session ? (
        <div className="flex gap-2 items-center">
          <Image
            src={session.user.image}
            alt={session.user.name}
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={signOut}
          />
        </div>
      ) : (
        <button
          onClick={signIn}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Log In
        </button>
      )}
    </div>
  );
}
