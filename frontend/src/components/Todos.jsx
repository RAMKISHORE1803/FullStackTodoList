export function Todos({ todos, onAddTodo }) {
  return (
    <div>
      {todos.map(function (todo) {
        return (
          <div className="border rounded px-4 py-2 valid:bg-green-100 valid:border-green-500 invalid:bg-red-100 invalid:border-red-500">
            <h1>{todo.title}</h1>
            <h2>{todo.description}</h2>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                const id = todo._id;
                fetch("http://localhost:3000/completed", {
                  method: "PUT",
                  body: JSON.stringify({ id: id }),
                  headers: {
                    "Content-type": "application/json",
                  },
                });
                onAddTodo();
              }}
            >
              {todo.completed == true ? "Completed" : "Mark as completed"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
