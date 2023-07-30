import React from "react";
import "../Home/home.css";
const TodoItem = ({
  title,
  description,
  id,
  updateHandler,
  deleteHandler,
  isCompleted,
}) => {
  return (
    <div className="task-container" key={id}>
      <div className="task-text">
        <p className="task-title">{title}</p>
        <p className="task-desc">{description}</p>
      </div>
      <div className="task-actions">
        <input
          type="checkbox"
          className="checkbox"
          checked={isCompleted}
          onChange={() => updateHandler(id)}
        />
        <button
          className="button task-delete"
          onClick={() => deleteHandler(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
