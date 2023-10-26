"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-slate-800 px-8 py-3">
      <Link className="text-white font-bold" href={"/"}>
        Todo mongoo DB
      </Link>
      <Link className="text-white font-bold" href={"/patient/patientList"}>
        Patient mongoo DB
      </Link>
      {window.location.href.indexOf("patient") > 1 ? (
        <Link className="bg-white p-2" href={"/patient"}>
          Add Patient
        </Link>
      ) : (
        <Link className="bg-white p-2" href={"/appTodo"}>
          Add Todo
        </Link>
      )}
    </nav>
  );
}
