"use client";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }) {
  const router = useRouter();
  const removeTodo = async () => {
    const confirmd = confirm("Are you sure");
    if (confirmd) {
      const res = await fetch(
        `https://next-todo-mongo.vercel.app/api/todos?id=${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        router.refresh();
      }
    }
  };
  return (
    <button onClick={removeTodo} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
}
