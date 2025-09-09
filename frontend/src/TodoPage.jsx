import React, { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { RxTimer } from "react-icons/rx";
import bg from "./assets/todoImg.png";
import logo from "./assets/MomentumLogo.jpg";
import { useNavigate } from "react-router-dom";

function TodoPage() {
  const navigate = useNavigate();

  const [todo, setTodo] = useState(""); // for input field
  const [todosList, setTodoList] = useState([]); //for todo list
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const handleMarkCompleted = async (id, completed) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/v1/todo/update`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, completed }),
      });
      if (response.status === 403 || response.status === 401) {
        localStorage.removeItem("token");
        alert("Session expired. Please log in again.");
        navigate("/login");
        return;
      }
      if (!response.ok) {
        throw new Error("Failed to mark as done");
      }
      await fetchTodos();
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/v1/todo/getAll`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 403 || response.status === 401) {
        localStorage.removeItem("token");
        alert("Session expired. Please log in again.");
        navigate("/login");
        return;
      }
      const data = await response.json();

      // sort so incomplete first, completed last
      const sortedTodos = data.sort((a, b) => {
        if (a.IsCompleted === b.IsCompleted) return 0;
        return a.IsCompleted ? 1 : -1; // completed goes down
      });

      setTodoList(sortedTodos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddClick = async () => {
    if (!todo.trim()) return; // avoid empty todos
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/v1/todo/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: todo }),
      });
      if (response.status === 403 || response.status === 401) {
        localStorage.removeItem("token");
        alert("Session expired. Please log in again.");
        navigate("/login");
        return;
      }
      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      await fetchTodos(); // refresh list
      setTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/v1/todo/delete`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.status === 403 || response.status === 401) {
        localStorage.removeItem("token");
        alert("Session expired. Please log in again.");
        navigate("/login");
        return;
      }
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }
      await fetchTodos();
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen overflow-hidden lg:flex-row lg:items-center bg-welcomeBg">
      {/* Top-right timer icon */}
      <div
        onClick={() => navigate("/Focus")}
        className="absolute z-50 flex items-center justify-center w-8 h-8 border rounded-md cursor-pointer pointer-events-auto group top-2 right-4 sm:top-4 sm:right-4 lg:top-12 lg:right-20 hover:bg-todoBlack border-todoBlack"
      >
        <RxTimer className="text-xl transition text-todoBlack group-hover:text-white" />
        <span className="absolute hidden px-2 py-1 font-mono text-xs -translate-x-1/2 text-todoBlack -bottom-8 left-1/2 whitespace-nowrap group-hover:block">
          Focus mode
        </span>
      </div>

      {/* Left side image */}
      <div className="relative flex items-center justify-center w-full h-40 lg:w-2/3 sm:h-48 md:h-60 lg:h-full">
        <img
          src={logo}
          alt="Logo"
          className="absolute z-0 w-auto h-12 pointer-events-none top-2 sm:top-4 lg:top-0 left-2 sm:left-4 sm:h-16 md:h-20 lg:h-25"
        />
        <img
          src={bg}
          className="object-contain w-auto h-24 pointer-events-none sm:h-32 md:h-40 lg:h-200"
          alt="Todo illustration"
        />
      </div>

      {/* Todo section */}
      <div className="z-10 flex flex-col w-full h-full max-w-md p-4 mx-auto mt-4 pointer-events-auto lg:h-full sm:p-6 lg:w-96 lg:max-w-none lg:mx-0 lg:mt-120">
        <h1 className="mb-4 text-xl font-medium text-center sm:text-2xl lg:hidden text-todoBlack font-todoFont">
          To-Do List
        </h1>

        {/* Input + button */}
        <div className="flex items-center flex-shrink-0 space-x-2">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter a task..."
            className="z-10 flex-1 p-2 text-sm bg-transparent border-b pointer-events-auto sm:text-base font-extralight placeholder-todoBlack border-todoBlack text-todoBlack focus:outline-none"
          />
          <button
            onClick={handleAddClick}
            className="z-10 text-2xl transition cursor-pointer pointer-events-auto sm:w-10 sm:h-10 sm:text-3xl text-todoBlack hover:border-todoBlack hover:text-4xl"
          >
            +
          </button>
        </div>

        {/* Todo list */}
        <ul className="z-10 flex-1 mt-4 space-y-2 overflow-y-auto pointer-events-auto lg:max-h-60 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {todosList.map((todo) => (
            <li
              key={todo._id}
              className="flex items-center justify-between p-2 bg-transparent rounded shadow sm:p-3 bg-opacity-20 group"
            >
              <span
                className={`flex-1 cursor-pointer text-sm sm:text-base ${
                  todo.IsCompleted
                    ? "line-through opacity-70 text-todoBlack"
                    : "text-todoBlack"
                }`}
                onClick={() => handleMarkCompleted(todo._id, !todo.IsCompleted)}
              >
                {todo.title}
              </span>
              <MdDeleteOutline
                className="z-10 text-lg transition-opacity opacity-0 pointer-events-auto sm:text-xl text-todoBlack hover:cursor-pointer group-hover:opacity-100"
                onClick={() => handleDeleteClick(todo._id)}
              />
            </li>
          ))}
        </ul>

        <div className="h-4 lg:hidden"></div>
      </div>
    </div>
  );
}

export default TodoPage;
