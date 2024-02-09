
export const getTasksByStatus = (tasks, status) => {
  return tasks.filter((task) => task.status === status);
};

export const initializeBoard = (tasks) => {
  const boardSections = {};
  // Extract unique status values from tasks
  const uniqueStatusValues = Array.from(new Set(tasks.map(task => task.status)));

  // Populate boardSections dynamically
  uniqueStatusValues.forEach(status => {
    boardSections[status] = getTasksByStatus(tasks, status);
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
