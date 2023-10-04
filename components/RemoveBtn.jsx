"use client";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RemoveBtn({ id }) {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const router = useRouter();
  const removeTodo = async () => {
    const res = await fetch(
      `https://next-todo-mongo.vercel.app/api/todos?id=${id}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      router.refresh();
    }
  };
  return (
    <div>
      <button onClick={openModal} className="text-red-400">
        <HiOutlineTrash size={24} />
      </button>
      {modalVisible && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
          id="modal-overlay"
        >
          {/* Modal Container */}
          <div className="bg-white p-8 rounded shadow-md">
            {/* Modal Content */}
            <p className="mb-4">Are you sure you want to delete?</p>
            {/* Buttons */}
            <div className="flex justify-end">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => removeTodo()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
