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
