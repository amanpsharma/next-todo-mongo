import EditTodoPage from "@/components/EditTodoPage";
const getTodoById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Faild to get todo");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
export default async function EditTodo({ params }) {
  const { id } = params;
  const { todo } = await getTodoById(id);
  const { title, description } = todo;

  return <EditTodoPage id={id} title={title} description={description} />;
}
