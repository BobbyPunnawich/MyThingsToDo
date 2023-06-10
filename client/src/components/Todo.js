import React, { useState } from "react";
import "../App.css";

function Todo({ todo, updateTodo, deleteTodo }) {
  const [completed, setCompleted] = useState(todo.completed);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [deadline, setDeadline] = useState(
    new Date(todo.deadline).toISOString().split("T")[0] ||
      new Date().toISOString().split("T")[0]
  );
  const [urgent, setUrgent] = useState(todo.urgent);
  const [editing, setEditing] = useState(false);

  const handleChange = () => {
    setCompleted(!completed);
    updateTodo(todo._id, { completed: !completed });
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const handleUpdate = () => {
    updateTodo(todo._id, { title, description, deadline, urgent });
    setEditing(false);
  };

  const handleDelete = () => {
    deleteTodo(todo._id);
  };

  return (
    <div className={`todo ${completed ? "completed" : ""}`}>
      <input type="checkbox" checked={completed} onChange={handleChange} />
      <div>
        {editing ? (
          <div>
            <input type="text" value={title} onChange={handleTitleChange} />
            <input
              type="text"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Enter your Description"
            />
            <input
              type="date"
              value={deadline}
              onChange={handleDeadlineChange}
            />
          </div>
        ) : (
          <div>
            <p className="todo-title">{title}</p>
            <p className="todo-description">{description}</p>
            <p className="todo-deadline">
              {" "}
              Deadline : {new Date(deadline).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
      <div className="todo-actions">
        <div className="button-group">
          {editing ? (
            <button onClick={handleUpdate}>Save</button>
          ) : (
            <button onClick={() => setEditing(true)}>Edit</button>
          )}
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
