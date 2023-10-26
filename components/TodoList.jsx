"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { AiFillCheckSquare, AiOutlineCheckSquare } from "react-icons/ai";

const TodoList = () => {
  const [todosList, setTodosList] = useState([]);

  const getTodos = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/todos`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to load todo");
      }
      const data = await res.json();
      setTodosList(data.todosList);
    } catch (error) {
      console.error(error);
    }
  };

  const completedTask = async (id, completed) => {
    try {
      const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ completed }),
      });
      if (!res.ok) {
        throw new Error("Failed to send data to server");
      }
      getTodos();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

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
            {t.completed ? (
              <AiFillCheckSquare
                size={24}
                onClick={() => completedTask(t._id, false)}
              />
            ) : (
              <AiOutlineCheckSquare
                size={24}
                onClick={() => completedTask(t._id, true)}
              />
            )}
            <RemoveBtn id={t._id} />
            <Link href={`/editTodo/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default TodoList;
