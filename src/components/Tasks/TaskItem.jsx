import { useState } from "react";
import { useMutation } from "@apollo/client";
import EditTask from "./EditTask";
import { DELETE_TASK } from "../../utils/mutations";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BiDotsVerticalRounded } from "react-icons/bi";

const TaskItem = ({ task, updateTasks, id }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [deleteTask] = useMutation(DELETE_TASK);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
  };

  const deleteItem = async () => {
    try {
      await deleteTask({
        variables: {
          taskId: task.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
    updateTasks();
  };

  const toggleModal = () => {
    setIsEditing(false);
    updateTasks();
  };

  // const handleTaskEdit = () => {
  //   document.getElementById("edit-task").showModal();
  // };

  const date = new Date(task.publishedAt);
  const localDate = date.toLocaleString();

  return (
    <div key={task.id} ref={setNodeRef} style={style}>
      <div className="mt-2 p-3 shadow rounded-md bg-slate-50">
        <div className="flex flex-row">
          <div>
            <div
              className="mr-2 hover:bg-slate-200 py-6 px-1 rounded-md"
              id={id}
              {...attributes}
              {...listeners}
            >
              <BiDotsVerticalRounded size={20} />
            </div>
          </div>

          <div>
            <div className="mb-2">
              <h3 className="text-sm font-medium text-gray-800">
                {task.title}
              </h3>
              <h3 className="text-xs font-medium text-gray-400">{localDate}</h3>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-xs btn-ghost mr-1 "
            >
              Edit
            </button>
            <button
              className="btn btn-xs btn-ghost"
              onClick={() => deleteItem()}
            >
              Delete
            </button>

            {isEditing && (
              <EditTask
                task={task}
                updateTasks={updateTasks}
                toggleModal={toggleModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
