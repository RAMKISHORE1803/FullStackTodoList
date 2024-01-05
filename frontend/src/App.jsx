import { useState, useEffect } from "react";
import { CreateTodo } from "./components/CreateTodo";
import { Todos } from "./components/Todos";

function App() {
  const [todos, setTodos] = useState([]);
  const fetchTodos = async () => {
    try {
      const res = await fetch("http://localhost:3000/todos");
      const json = await res.json();
      setTodos(json.todos);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    try {
      await fetchTodos();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div>
        <CreateTodo onAddTodo={addTodo} />
        <Todos todos={todos} onAddTodo={addTodo} />
      </div>
    </>
  );
}

export default App;
