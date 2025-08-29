import React, { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import bg from "./assets/todoImg.png";
import logo from "./assets/MomentumLogo.jpg";

function TodoPage() {
  const [todo, setTodo] = useState(""); // for input field
  const [todosList, setTodoList] = useState([]); //for todo list
  const [todoDate, setTodoDate] = useState(""); // for todo's date

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
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const handleCalenderClick = async () => {};

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
      setTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      console.log("hi", id);

      const response = await fetch("http://localhost:3000/api/v1/todo/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

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
    <div
      // className="flex items-center justify-center h-screen bg-center bg-cover bg-welcomeBg"
      // style={{ backgroundImage: `url(${bg})` }}
      className="flex items-center h-screen overflow-hidden bg-welcomeBg"
    >
      <div className="w-2/3 ">
        <img
          src={logo}
          alt="Logo"
          className="absolute top-0 w-auto h-25 left-4"
        />
        <img src={bg} className="w-auto h-200" />
      </div>
      {/* </div><div className="flex items-center justify-center h-screen bg-gray-900"> */}
      <div className="flex flex-col h-full p-6 rounded-lg mt-120 w-96">
        {/* <h1 className="mb-4 text-2xl font-medium text-center text-todoBlack font-todoFont">
          To-Do List
        </h1> */}
        <div className="flex items-center flex-shrink-0 space-x-2">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter a task..."
            className="flex-1 p-2 bg-transparent border-b font-extralight placeholder-todoBlack border-todoBlack text-todoBlack focus:outline-none "
          />
          {/* <SlCalender onClick={handleCalenderClick} /> */}
          {/* <DatePicker /> */}
          <button
            onClick={handleAddClick}
            className="p-1 text-3xl transition rounded-md text-todoBlack "
          >
            +
          </button>
        </div>
        <ul className="mt-4 space-y-2 overflow-y-auto max-h-60 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {todosList.map((todo) => (
            <li
              key={todo._id}
              className="flex items-center justify-between p-3 bg-transparent rounded shadow bg-opacity-20 group"
            >
              <span
                className={`flex-1 cursor-pointer ${
                  todo.IsCompleted
                    ? "line-through text-todoBlack"
                    : "text-todoBlack"
                }`}
                onClick={() => handleMarkCompleted(todo._id, !todo.IsCompleted)}
              >
                {todo.title}
              </span>
              {/* <input
                key=""
                type="checkbox"
                className="w-4 h-4 mr-2 accent-todoBlack"
                checked={todo.IsCompleted}
                onChange={(e) =>
                  handleMarkCompleted(todo._id, e.target.checked)
                }
              /> */}
              <MdDeleteOutline
                className="text-xl transition-opacity opacity-0 text-todoBlack hover:cursor-pointer group-hover:opacity-100"
                onClick={() => handleDeleteClick(todo._id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoPage;
