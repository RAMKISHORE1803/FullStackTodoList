import { useState } from "react";
import "../index.css";

export function CreateTodo({ onAddTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTodo = () => {
    fetch("http://localhost:3000/todo", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(async function (res) {
        const json = await res.json();
        //alert("To do Added");
        onAddTodo();
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
      });
  };

  return (
    <div>
      <input
        className="border rounded px-4 py-2 valid:bg-green-100 valid:border-green-500 invalid:bg-red-100 invalid:border-red-500"
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <br />
      <input
        className="border rounded px-4 py-2 valid:bg-green-100 valid:border-green-500 invalid:bg-red-100 invalid:border-red-500"
        type="text"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <br />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleAddTodo}
      >
        Add todo
      </button>
    </div>
  );
}
