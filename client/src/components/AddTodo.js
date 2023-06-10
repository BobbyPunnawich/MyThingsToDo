import React, { useState } from "react";

function AddTodo({ createTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("no description");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title) {
      createTodo(title, description, deadline);
      setTitle("");
      setDescription("no description");
      setDeadline("");
    }
  };

  return (
    <div className="add-todo">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title :</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your task"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="deadline">Deadline :</label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
        <div className="AddTask">
          <button type="submit">Add Task</button>
        </div>
      </form>
    </div>
  );
}

export default AddTodo;
