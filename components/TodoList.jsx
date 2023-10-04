import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
const getTodos = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/todos", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Faild to load todo");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
export default async function TodoList() {
  const { todosList } = await getTodos();
  return (
    <>
      {todosList.map((t) => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>
          <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`/editTodo/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
