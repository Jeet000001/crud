import CreateTask from "@/components/CreateTask";
import ShowTask from "@/components/ShowTask";
import { dbConnect } from "@/lib/dbConnect";
import React from "react";

const page = async () => {
  await dbConnect();
  return (
    <div className="min-h-screen bg-[#0f0e17] p-6">

      {/* Header - Top Center */}
      <div className="text-center mb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-orange-400 font-medium mb-2">
          Personal Workspace
        </p>
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

      {/* Components - Side by Side (lg+), Stack (mobile) */}
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