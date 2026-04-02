import { dbConnect } from "@/lib/dbConnect";
import Tasks from "@/models/tasks";
import React from "react";

const getData = async () => {
  try {
    await dbConnect();

    const tasks = await Tasks.find({})
      .sort({ createdAt: -1 })
      .lean();

    return tasks.map((task) => ({
      ...task,
      _id: task._id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

const ShowTask = async () => {
    const tasks = await getData();

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-[0_0_40px_rgba(255,107,53,0.15)] h-full flex flex-col">

            {/* Card Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-white font-bold text-lg" style={{ fontFamily: "Syne, sans-serif" }}>
                        ✦ My Tasks
                    </h2>
                    <p className="text-zinc-500 text-xs mt-1">{tasks.length} task{tasks.length !== 1 ? "s" : ""} total</p>
                </div>

                {/* Badge */}
                <span className="bg-orange-500/10 text-orange-400 text-xs font-semibold px-3 py-1 rounded-full border border-orange-500/20">
                    {tasks.length} Total
                </span>
            </div>

            {/* Scrollable Task List */}
            <div className="flex-1 overflow-y-auto max-h-[500px] pr-1 space-y-3
                scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">

                {tasks.length === 0 ? (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center h-40 text-center">
                        <span className="text-4xl mb-3">📋</span>
                        <p className="text-zinc-500 text-sm">No tasks yet</p>
                        <p className="text-zinc-600 text-xs mt-1">Create your first task!</p>
                    </div>
                ) : (
                    tasks.map((task) => (
                        <div
                            key={task._id}
                            className="bg-zinc-800/60 border border-zinc-700 hover:border-orange-500/40 rounded-xl p-4 transition-all duration-200 group"
                        >
                            {/* Task Title */}
                            <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-orange-400 transition-colors duration-200">
                                {task.title}
                            </h3>

                            {/* Task Content */}
                            <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2 mb-4">
                                {task.content}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2">
                                <button className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 hover:text-white text-xs font-medium py-2 px-3 rounded-lg transition-all duration-200">
                                    ✏️ Edit
                                </button>
                                <button className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 text-xs font-medium py-2 px-3 rounded-lg transition-all duration-200">
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ShowTask;