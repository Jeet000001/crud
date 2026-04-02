import { dbConnect } from "@/lib/dbConnect";
import Tasks from "@/models/tasks";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await dbConnect();
    const body = await req.json();
    const task = await Tasks.create(body);

    return NextResponse.json(
      {
        success: true,
        data: task,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { success: 400 },
    );
  }
};

export const GET = async () => {
  try {
    await dbConnect();
    const Tasks = await Tasks.find({}).sort({
      createdAt: -1,
    });
    // find({}) = No filter get all teh Data & .sort({ createdAt: -1 }) = short the notes base on create time ans descending order (newest first)

    return NextResponse.json(
      {
        success: true,
        data: tasks,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
};
