import connectMongodb from "@/libs/mongodb";
import Todo from "@/models/todo";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { title, description, completed } = await request.json();
  await connectMongodb();
  await Todo.findByIdAndUpdate(id, { title, description, completed });
  return NextResponse.json({ message: "Todo Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongodb();
  const todo = await Todo.findOne({ _id: id });
  return NextResponse.json({ todo }, { status: 200 });
}
