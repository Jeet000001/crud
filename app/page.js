import CreateTask from "@/components/CreateTask";
import ShowTask from "@/components/ShowTask";
import { dbConnect } from "@/lib/dbConnect";
import React from "react";

const page = async () => {
  await dbConnect();
  return (
    <div className="min-h-screen bg-[#0f0e17] p-6">
      <div className="text-center mb-6">
        <h1
          className="text-4xl font-extrabold text-white leading-tight"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          Task <span className="text-orange-400">Manager</span>
        </h1>
        <p className="text-zinc-400 text-sm mt-1 font-light">
          Your personal task manager
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="w-full lg:w-1/2">
          <CreateTask />
        </div>
        <div className="w-full lg:w-1/2">
          <ShowTask />
        </div>
      </div>
    </div>
  );
};

export default page;