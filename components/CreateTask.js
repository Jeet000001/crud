"use client"
import React, { useState } from 'react'

const Task = () => {
    const [task, setTask] = useState([])
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false); // ✅ Fix: "loding" → "loading"

    const createTask = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) return;

        setLoading(true);

        try {
            const response = await fetch("/api/task", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content })
            })
            const result = await response.json();

            if (result.success) {
                console.log("Data created", result);
                
                setTask((prev) => [result.data, ...prev]);
                setTitle("");
                setContent("")
            }
        } catch (error) {
            console.error("Failed to create note:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="w-full max-w-md">

                {/* Header */}
                

                {/* Form Card */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-[0_0_40px_rgba(255,107,53,0.15)]">
                    <form onSubmit={createTask}>

                        {/* Title */}
                        <div className="mb-5">
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

                        {/* Description */}
                        <div className="mb-6">
                            <label className="block text-xs tracking-widest uppercase text-zinc-500 font-medium mb-2">
                                Description {/* ✅ Fix: "Discription" → "Description" */}
                            </label>
                            <textarea
                                value={content}
                                placeholder="Describe your task..."
                                onChange={(e) => setContent(e.target.value)} // ✅ Fix: setTitle → setContent
                                rows={4}
                                className="w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm resize-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/40 transition-all duration-200 outline-none"
                            />
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading || !title.trim() || !content.trim()}
                            className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-60 text-white font-semibold text-sm tracking-wide py-3.5 rounded-xl transition-all duration-200 hover:shadow-[0_0_24px_rgba(255,107,53,0.5)] flex items-center justify-center gap-2"
                        >
                            {loading ? "Saving..." : <><span className="text-lg leading-none">+</span> Create Note</>}
                        </button>
                    </form>
                </div>

                <p className="text-center text-zinc-600 text-xs mt-4">
                    Press create to save your task
                </p>
            </div>
        </div>
    )
}

export default Task