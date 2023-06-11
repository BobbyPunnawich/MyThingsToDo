import React, { useState, useEffect } from "react";
import axios from "axios";
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/todos");
      if (res.status === 200) {
        const sortedTodos = res.data.sort(
          (a, b) => new Date(a.deadline) - new Date(b.deadline)
        );
        setTodos(sortedTodos);
      } else {
        throw new Error("Unable to fetch data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const createTodo = async (title, description, deadline) => {
    try {
      const res = await axios.post("http://localhost:5001/api/todos", {
        title,
        description,
        deadline,
      });
      if (res.status === 200) {
        const newTodo = res.data;
        setTodos([...todos, newTodo]);
      } else {
        throw new Error("Error in creating todo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      const res = await axios.put(
        `http://localhost:5001/api/todos/${id}`,
        updatedTodo
      );
      if (res.status === 200) {
        const updatedTodos = todos.map((todo) =>
          todo._id === id ? res.data : todo
        );
        setTodos(updatedTodos);
      } else {
        throw new Error("Error in updating todo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/todos/${id}`);
      const updatedTodos = todos.filter((todo) => todo._id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`App ${theme}`}>
      <div className="theme-switch">
        <label htmlFor="themeToggle" className="switch">
          <input
            type="checkbox"
            id="themeToggle"
            checked={theme === "dark"}
            onChange={changeTheme}
          />
          <span className="slider round"></span>
        </label>
        <span className="theme-label">
          {theme === "dark" ? " (Dark Mode)" : " (Light Mode)"}
        </span>
      </div>
      <h1>MyThingsToDo</h1>
      <AddTodo createTodo={createTodo} />
      <div className="todo-list">
        {todos.map((todo) => (
          <Todo
            key={todo._id}
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
