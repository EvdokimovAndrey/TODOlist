export const getTasksByDueDate = (tasks) => {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const todayTasks = tasks.filter(
    (task) =>
      task.dueDate &&
      new Date(task.dueDate).getDate() === today.getDate() &&
      new Date(task.dueDate).getMonth() === today.getMonth() &&
      new Date(task.dueDate).getFullYear() === today.getFullYear()
  );
  const nextWeekTasks = tasks.filter(
    (task) =>
      task.dueDate &&
      new Date(task.dueDate) >= today &&
      new Date(task.dueDate) <= nextWeek
  );
  const futureTasks = tasks.filter(
    (task) =>
      task.dueDate && new Date(task.dueDate) > nextWeek
  );

  return [
    { group: 'Сегодня', tasks: todayTasks },
    { group: 'На следующей неделе', tasks: nextWeekTasks },
    { group: 'В будущем', tasks: futureTasks },
  ];
};

export const getTasksByResponsible = (tasks) => {
  let groups = [];
  const responsibleIds = new Set(tasks.map(task => task.responsibleId));

  responsibleIds.forEach(responsibleId => {
    const filteredTasks = tasks.filter(task => task.responsibleId === responsibleId);

    if (filteredTasks.length > 0) {
      groups.push({
        group: responsibleId,
        tasks: filteredTasks
      });
    }
  });

  return groups;
};

export const getSortedTasks = (tasks) => {
  return tasks.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
};

export const getFormattedDueDate = (task) => {
  const dueDate = new Date(task.dueDate);
  const today = new Date();
  return dueDate < today ? (
    <span style={{ color: 'red' }}>{task.dueDate}</span>
  ) : (
    task.dueDate
  );
};

export const getUserName = (users, id) => {
  const requiredUser = users.filter((user) => {
    return user.id === id
  })
  return `${requiredUser[0].name} ${requiredUser[0].surname}`
}

