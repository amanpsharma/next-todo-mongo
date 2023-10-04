"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Title and description are reqiure");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      if (res.ok) {
        router.refresh();
        router.push("/");
      } else {
        throw new Error("Faild to send data to server");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Add todo"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Add todo desc"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <button className="bg-green-300 font-bold text-white py-3 px-3 w-fit">
        Add Todo
      </button>
    </form>
  );
}
