import { dbConnect } from "@/lib/dbConnect";
import Tasks from "@/models/tasks";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  try {
    const { id } = await params;
    await dbConnect();
    const task = await Tasks.findByIdAndDelete(id);

    if (!task) {
      return NextResponse.json(
        {
          success: false,
          error: "Task not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 400 },
    );
  }
};
