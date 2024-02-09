import { useState, userEffect } from "react";
import { Formik, Form, Field } from "formik";

const TaskItem = ({ task, closeModal }) => {
  // const [selectedTask, setSelectedTask] = useState({
  //   title: "",
  // });

  const initialValues = {
    name: task.title,
  };

  // const saveItem = async (values) => {
  //   try {
  //     await editItem(values, item.id);
  //     closeModal();
  //     handleSuccess("Item is saved");
  //     dispatch(getItemsContent());
  //   } catch (error) {
  //     handleError(error);
  //   }
  // };

  const handleTaskClick = (task) => {
    // setSelectedTask(task);
    document.getElementById("edit_modal").showModal();
  };

  return (
    <div
      key={task.id}
      className="mt-2 p-3 shadow bg-slate-50 rounded-md cursor-pointer"
      onClick={() => handleTaskClick(task)}
    >
      <h3 className="text-sm font-medium text-gray-800">{task.title}</h3>

      {/* Modal dialog */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit task</h3>
          <input
            type="text"
            placeholder="Type here"
            className="input input-sm input-bordered input-primary w-full max-w-xs"
          />
          <p className="py-4">{task.title}</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default TaskItem;
