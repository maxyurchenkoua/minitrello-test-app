import { useState, useEffect } from "react";
import EditTask from "./EditTask";

const TaskItem = ({ task }) => {
  const handleTaskClick = (task) => {
    // setSelectedTask(task);
    document.getElementById("edit_modal").showModal();
  };

  return (
    <div
      key={task.id}
      className="mt-2 p-3 shadow bg-slate-50 rounded-md cursor-pointer"
      onDoubleClick={() => handleTaskClick(task)}
    >
      <h3 className="text-sm font-medium text-gray-800">{task.title}</h3>
      <EditTask title={task.title} />
    </div>
  );
};

export default TaskItem;
