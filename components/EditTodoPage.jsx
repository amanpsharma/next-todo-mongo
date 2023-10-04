"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function EditTodoPage({ id, title, description }) {
  const [newtitle, setTitle] = useState(title);
  const [newdescription, setDescription] = useState(description);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.SERVER_URL}/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title: newtitle, description: newdescription }),
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
        value={newtitle}
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Add todo desc"
        onChange={(e) => setDescription(e.target.value)}
        value={newdescription}
      />
      <button className="bg-green-300 font-bold text-white py-3 px-3 w-fit">
        Edit Todo
      </button>
    </form>
  );
}
