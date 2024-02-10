import EditTask from "./EditTask";

const TaskItem = ({ task, updateTasks }) => {
  const handleTaskClick = (task) => {
    // setSelectedTask(task);
    document.getElementById("edit_modal").showModal();
  };

  const date = new Date(task.publishedAt);
  const localDate = date.toLocaleString();

  return (
    <div
      key={task.id}
      className="mt-2 p-3 shadow bg-slate-50 rounded-md cursor-pointer"
      onDoubleClick={() => handleTaskClick(task)}
    >
      <h3 className="text-sm font-medium text-gray-800">{task.title}</h3>
      <h3 className="text-xs font-medium text-gray-400">{localDate}</h3>
      <EditTask title={task.title} updateTasks={updateTasks} />
    </div>
  );
};

export default TaskItem;
