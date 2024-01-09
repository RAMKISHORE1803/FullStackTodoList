export function Todos({ todos, onAddTodo }) {
  return (
    <div>
      {todos && todos.length > 0 ? (
        todos.map((todo) => (
          <div
            key={todo._id} // Add a unique key prop here, assuming _id is a unique identifier
            className="border rounded px-4 py-2 valid:bg-green-100 valid:border-green-500 invalid:bg-red-100 invalid:border-red-500"
          >
            <h1>{todo.title}</h1>
            <h2>{todo.description}</h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={async () => {
                const id = todo._id;
                try {
                  await fetch(`http://localhost:3000/completed`, {
                    method: "PUT",
                    body: JSON.stringify({ id }),
                    headers: {
                      "Content-type": "application/json",
                    },
                  });
                  onAddTodo();
                } catch (error) {
                  console.error("Error marking todo as completed:", error);
                }
              }}
            >
              {todo.completed ? "Completed" : "Mark as completed"}
            </button>
          </div>
        ))
      ) : (
        <p>No todos available.</p>
      )}
    </div>
  );
}
