import React, { useState, useEffect } from "react";
import bg from "./assets/bg3.jpg";
import { MdDeleteOutline } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todosList, setTodoList] = useState([]);

  // react state should be immutable -- never modify the existing state object directly
  // const handleAddClick = () => {
  //   //todosList.push(todo); //incorrect => mutating the exixting array => rect won't re-render the component
  //   setTodoList([...todosList, todo]);
  //   setTodo("");
  // };

  // const fetchTodos = async () => {
  //   fetch("http://localhost:3000/api/v1/todo/getAll") // Fetch data from backend
  //     .then((response) => response.json()) // Convert response to JSON
  //     .then((data) => setTodoList(data)) // Store data in state
  //     .catch((error) => console.error("Error fetching todos:", error));
  // };

  const handleMarkCompleted = async (id, completed) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/todo/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, completed }),
      });
      if (!response.ok) {
        throw new Error("Failed to mark as done");
      }
      await fetchTodos();
      console.log(todo);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/todo/getAll");
      const data = await response.json();
      setTodoList(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  //When using .then(), JavaScript automatically passes the result of the previous .then() to the next .then().
  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddClick = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/todo/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: todo }),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      await fetchTodos(); // Fetch only after adding is done
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* </div><div className="flex justify-center items-center h-screen bg-gray-900"> */}
      <div className="bg-pink-50 border border-lime-600 border-opacity-40 p-6 rounded-lg w-96 shadow-xl">
        <h1 className="text-center text-2xl text-red-300 font-semibold mb-4">
          To-Do List
        </h1>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter a task..."
            className="flex-1 p-2 bg-transparent border border-white rounded text-red-300 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-100"
          />
          <button
            onClick={handleAddClick}
            className=" text-3xl text-red-300 p-1 rounded-md transition"
          >
            +
          </button>
        </div>
        <ul className="mt-4 space-y-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {todosList.map((todo) => (
            <li
              key={todo._id}
              className="flex items-center justify-between bg-transparent bg-opacity-20 p-3 rounded shadow"
            >
              <span
                className={`flex-1 ${
                  todo.IsCompleted
                    ? "line-through text-gray-300"
                    : "text-lime-600"
                }`}
              >
                {todo.title}
              </span>
              <input
                key=""
                type="checkbox"
                className="w-4 h-4 accent-lime-600 mr-2"
                checked={todo.IsCompleted}
                onChange={(e) =>
                  handleMarkCompleted(todo._id, e.target.checked)
                }
              />
              <MdDeleteOutline className="text-xl text-red-300 hover:text-red-400" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
