import React, { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import bg from "./assets/todoImg.png";
import logo from "./assets/MomentumLogo.jpg";
import { useNavigate } from "react-router-dom";

function TodoPage() {
  const navigate = useNavigate();

  const [todo, setTodo] = useState(""); // for input field
  const [todosList, setTodoList] = useState([]); //for todo list
  const [todoDate, setTodoDate] = useState(""); // for todo's date

  const handleMarkCompleted = async (id, completed) => {
    try {
      const token = localStorage.getItem("token");

      // const response = await fetch("http://localhost:3000/api/v1/todo/update", {
      const response = await fetch("/api/v1/todo/update", {
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

  const handleCalenderClick = async () => {};

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      // const response = await fetch("http://localhost:3000/api/v1/todo/getAll", {
      const response = await fetch("/api/v1/todo/getAll", {
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
      const token = localStorage.getItem("token");

      // const response = await fetch("http://localhost:3000/api/v1/todo/add", {
      const response = await fetch("/api/v1/todo/add", {
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

      await fetchTodos(); // Fetch only after adding is done
      setTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const token = localStorage.getItem("token");

      // const response = await fetch("http://localhost:3000/api/v1/todo/delete", {
      const response = await fetch("/api/v1/todo/delete", {
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
      const result = await response.json();
      console.log("Todo deleted:", result);
      // return result;
      await fetchTodos();
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <div className="flex flex-col items-center h-screen overflow-hidden lg:flex-row lg:items-center bg-welcomeBg">
      {/* Left side - Image section with responsive layout */}
      <div className="relative flex items-center justify-center w-full h-40 lg:w-2/3 sm:h-48 md:h-60 lg:h-full">
        <img
          src={logo}
          alt="Logo"
          className="absolute w-auto h-12 top-2 sm:top-4 lg:top-0 left-2 sm:left-4 sm:h-16 md:h-20 lg:h-25"
        />
        <img
          src={bg}
          className="object-contain w-auto h-24 sm:h-32 md:h-40 lg:h-200"
          alt="Todo illustration"
        />
      </div>

      {/* Right side - Todo section with responsive layout */}
      <div className="flex flex-col w-full h-full max-w-md p-4 mx-auto mt-4 lg:h-full sm:p-6 lg:w-96 lg:max-w-none lg:mx-0 lg:mt-120">
        {/* Optional heading for mobile */}
        <h1 className="mb-4 text-xl font-medium text-center sm:text-2xl lg:hidden text-todoBlack font-todoFont">
          To-Do List
        </h1>

        {/* Input section with responsive sizing */}
        <div className="flex items-center flex-shrink-0 space-x-2">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter a task..."
            className="flex-1 p-2 text-sm bg-transparent border-b sm:text-base font-extralight placeholder-todoBlack border-todoBlack text-todoBlack focus:outline-none"
          />
          <button
            onClick={handleAddClick}
            className="p-1 text-2xl transition rounded-md cursor-pointer sm:text-3xl text-todoBlack hover:bg-opacity-20"
          >
            +
          </button>
        </div>

        {/* Todo list with responsive sizing */}
        <ul className="flex-1 mt-4 space-y-2 overflow-y-auto lg:max-h-60 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {todosList.map((todo) => (
            <li
              key={todo._id}
              className="flex items-center justify-between p-2 bg-transparent rounded shadow sm:p-3 bg-opacity-20 group"
            >
              <span
                className={`flex-1 cursor-pointer text-sm sm:text-base ${
                  todo.IsCompleted
                    ? "line-through text-todoBlack"
                    : "text-todoBlack"
                }`}
                onClick={() => handleMarkCompleted(todo._id, !todo.IsCompleted)}
              >
                {todo.title}
              </span>
              <MdDeleteOutline
                className="text-lg transition-opacity opacity-0 opacity-100 sm:text-xl lg:opacity-0 sm:opacity-0 text-todoBlack hover:cursor-pointer group-hover:opacity-100"
                onClick={() => handleDeleteClick(todo._id)}
              />
            </li>
          ))}
        </ul>

        {/* Mobile-specific spacing */}
        <div className="h-4 lg:hidden"></div>
      </div>
    </div>
  );
}

export default TodoPage;
