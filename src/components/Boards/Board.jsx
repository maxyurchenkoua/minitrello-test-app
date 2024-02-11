import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskItem from "../Tasks/TaskItem";

const Board = ({ id, title, tasks, updateTasks }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div>
      <div className="flex flex-row items-center mb-3">
        <h3 className="font-semibold ml-2">{title}</h3>
      </div>
      <SortableContext
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef}>
          {tasks.map((task) => (
            <div key={task.id} sx={{ mb: 2 }}>
              <TaskItem task={task} id={task.id} updateTasks={updateTasks} />
            </div>
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default Board;
