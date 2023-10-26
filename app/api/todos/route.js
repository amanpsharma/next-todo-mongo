import connectMongodb from "@/libs/mongodb";
import Todo from "@/models/todo";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, description } = await request.json();
  await connectMongodb();
  await Todo.create({ title, description, completed: false });
  return NextResponse.json({ message: "Todo created" }, { status: 200 });
}
export async function GET() {
  await connectMongodb();
  const todosList = await Todo.find();
  return NextResponse.json({ todosList });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongodb();
  await Todo.findByIdAndDelete(id);
  return NextResponse.json({ message: "Todo deleted" }, { status: 200 });
}
