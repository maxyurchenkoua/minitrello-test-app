
export const getTasksByStatus = (tasks, taskStatus) => {
  return tasks.filter((task) => task.taskStatus === taskStatus);
};


export const initializeBoard = (tasks) => {
  const boardSections = {};
  // Extract unique status values from tasks
  const uniqueStatusValues = Array.from(new Set(tasks.map(task => task.taskStatus)));

  // Populate boardSections dynamically
  uniqueStatusValues.forEach(taskStatus => {
    boardSections[taskStatus] = getTasksByStatus(tasks, taskStatus);
  });

  return boardSections;
};

export const findBoardSectionContainer = (
  boardSections, id
) => {
  if (id in boardSections) {
    return id;
  }

  const container = Object.keys(boardSections).find((key) =>
    boardSections[key].find((item) => item.id === id)
  );
  return container;
};
