import React, { useState, useEffect } from "react";
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCorners,
  DragOverlay,
  defaultDropAnimation,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { findBoardSectionContainer, initializeBoard } from "../../utils/board";
import Board from "./Board";
import TaskItem from "../Tasks/TaskItem";

const Boards = ({ tasks }) => {
  const initialBoardSections = initializeBoard(tasks);
  const [boardSections, setBoardSections] = useState(initialBoardSections);

  const [activeTaskId, setActiveTaskId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }) => {
    setActiveTaskId(active.id);
  };

  const handleDragOver = ({ active, over }) => {
    // Find the containers
    const activeContainer = findBoardSectionContainer(boardSections, active.id);
    const overContainer = findBoardSectionContainer(boardSections, over?.id);
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setBoardSections((boardSection) => {
      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = overItems.findIndex((item) => item.id !== over?.id);

      return {
        ...boardSection,
        [activeContainer]: [
          ...boardSection[activeContainer].filter(
            (item) => item.id !== active.id
          ),
        ],
        [overContainer]: [
          ...boardSection[overContainer].slice(0, overIndex),
          boardSections[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(
            overIndex,
            boardSection[overContainer].length
          ),
        ],
      };
    });
  };

  const handleDragEnd = ({ active, over }) => {
    const activeContainer = findBoardSectionContainer(boardSections, active.id);
    const overContainer = findBoardSectionContainer(boardSections, over?.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex(
      (task) => task.id === active.id
    );
    const overIndex = boardSections[overContainer].findIndex(
      (task) => task.id === over?.id
    );

    if (activeIndex !== overIndex) {
      setBoardSections((boardSection) => ({
        ...boardSection,
        [overContainer]: arrayMove(
          boardSection[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveTaskId(null);
  };

  const dropAnimation = {
    ...defaultDropAnimation,
  };

  const getTaskById = (tasks, id) => {
    return tasks.find((task) => task.id === id);
  };

  const task = activeTaskId ? getTaskById(tasks, activeTaskId) : null;

  return (
    <div className="drawer-content">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="drawer-content flex flex-col md:flex-row p-12 mr-6 md:mr-0">
          {Object.keys(boardSections).map((boardSectionKey) => (
            <div
              key={boardSectionKey}
              className="p-6 m-3 bg-slate-300 w-full rounded-lg"
            >
              <Board
                id={boardSectionKey}
                title={boardSectionKey}
                tasks={boardSections[boardSectionKey]}
              />
            </div>
          ))}
          <DragOverlay dropAnimation={dropAnimation}>
            {task ? <TaskItem task={task} /> : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  );
};

export default Boards;
