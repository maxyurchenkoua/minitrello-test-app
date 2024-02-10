import React from "react";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskItem from "../Tasks/TaskItem";
import SortableTaskItem from "../Tasks/SortableTaskItem";
import { BiPlus } from "react-icons/bi";
import AddTask from "../Tasks/AddTask";

const Board = ({ id, title, tasks }) => {
  const { setNodeRef } = useDroppable({ id });

  // Sort tasks based on publishedAt
  const sortedTasks = tasks.slice().sort((a, b) => {
    return new Date(b.publishedAt) - new Date(a.publishedAt);
  });

  const handleTaskClick = () => {
    document.getElementById("add-task").showModal();
  };

  return (
    <div>
      <div className="flex flex-row items-center mb-3">
        <button
          className="btn btn-circle btn-sm btn-primary"
          onClick={() => handleTaskClick()}
        >
          <BiPlus size={22} />
        </button>
        <h3 className="font-semibold ml-2">{title}</h3>
      </div>
      <SortableContext
        id={id}
        // items={tasks}
        items={sortedTasks}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef}>
          {tasks.map((task) => (
            <div key={task.id} sx={{ mb: 2 }}>
              <SortableTaskItem id={task.id}>
                <TaskItem task={task} />
              </SortableTaskItem>
            </div>
          ))}
        </div>
      </SortableContext>
      <AddTask boardId={id} />
    </div>
  );
};

export default Board;
