"use client"
import React, { useState } from 'react'

const CreateTask = () => {
    const [task, setTask] = useState([])
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const createTask = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) return;

        setLoading(true);

        try {
            const response = await fetch("/api/task", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content })
            });
            const result = await response.json();

            if (!response.ok) throw new Error(result.message || "Something went wrong");

            if (result.success) {
                console.log("Data created", result);
                setTask((prev) => [result.data, ...prev]);
                setTitle("");
                setContent("");
            }
        } catch (error) {
            console.error("Failed to create note:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-[0_0_40px_rgba(255,107,53,0.15)] h-full flex flex-col">
                <div className="mb-6">
                    <h2 className="text-white font-bold text-lg" style={{ fontFamily: "Syne, sans-serif" }}>
                        ✦ New Task
                    </h2>
                    <p className="text-zinc-500 text-xs mt-1">Fill in the details below</p>
                </div>

                <form onSubmit={createTask} className="flex flex-col flex-1">
                    <div className="mb-2">
                        <label className="block text-xs tracking-widest uppercase text-zinc-500 font-medium mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            placeholder="Task Title..."
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500/40 transition-all duration-200 outline-none"
                        />
                    </div>
                    <div className="mb-2 flex-1">
                        <label className="block text-xs tracking-widest uppercase text-zinc-500 font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            value={content}
                            placeholder="Describe your task..."
                            onChange={(e) => setContent(e.target.value)}
                            rows={2}
                            className="w-full h-full min-h-[120px] bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm resize-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/40 transition-all duration-200 outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading || !title.trim() || !content.trim()}
                        className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm tracking-wide py-3.5 rounded-xl transition-all duration-200 hover:shadow-[0_0_24px_rgba(255,107,53,0.5)] flex items-center justify-center gap-2"
                    >
                        {loading
                            ? <><span className="animate-spin text-base">⟳</span> Saving...</>
                            : <><span className="text-lg leading-none">+</span> Create Task</>
                        }
                    </button>

                </form>
                <p className="text-center text-zinc-600 text-xs mt-4">
                    Press create to save your task
                </p>
            </div>
        </div>
    )
}

export default CreateTask