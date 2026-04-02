import CreateTask from "@/components/CreateTask";
import ShowTask from "@/components/ShowTask";
import { dbConnect } from "@/lib/dbConnect";
import Tasks from "@/models/tasks";

export const dynamic = "force-dynamic";

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
    console.error("DB Fetch Error:", error);
    return []; // important fallback
  }
};

const page = async () => {
  const tasks = await getData();

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
          <ShowTask saveTask={tasks} />
        </div>
      </div>
    </div>
  );
};

export default page;