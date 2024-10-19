import { observer } from "mobx-react-lite";
import React, { useContext, useState } from 'react';
import { Badge, Button, Table } from 'react-bootstrap';
import { getUserName } from '../helpers/helpers';
import { deleteTask, fetchTasks, updateTask } from '../http/taskApi';
import { Context } from "../index";
import EditTask from './EditTask';

const TaskList = observer(({ tasks }) => {
  const { user, task } = useContext(Context);

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  user.setUser(localStorage.getItem('user'))
  const currentUser = JSON.parse(user.user)

  const users = user.users;

  const handleShowModalEdit = () => setShowModalEdit(true);
  const handleCloseModalEdit = () => setShowModalEdit(false);

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId)
      const updatedTasks = await fetchTasks();
      task.setTasks(updatedTasks);
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const filterTaskFields = (task) => {
        const { title, description, dueDate, priority, status, creatorId, responsibleId } = task;
        return { title, description, dueDate, priority, status, creatorId, responsibleId };
      };
      const filterUpdateTask = filterTaskFields(updatedTask)
      await updateTask(updatedTask.id, filterUpdateTask);
      const updatedTasks = await fetchTasks();
      task.setTasks(updatedTasks);
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);
    }
    handleCloseModalEdit();
  };
  console.log(new Date())
  const handleTaskClick = (task) => {
    setSelectedTask(task);
    handleShowModalEdit();
  };

  return (
    <>
      <EditTask
        show={showModalEdit}
        onClose={handleCloseModalEdit}
        onUpdate={handleUpdateTask}
        selectedTask={selectedTask}
      />
      <Table className="table-striped">
        <thead>
          <tr>
            <th>№</th>
            <th>Заголовок</th>
            <th>Описание</th>
            <th>Дата окончания</th>
            <th>Дата создания</th>
            <th>Дата обновления</th>
            <th>Приоритет</th>
            <th>Статус</th>
            <th>Создатель</th>
            <th>Ответственный</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id}>
              <td>{index + 1}</td>
              <td
                style={{
                  color:
                    task.status === 'completed'
                      ? 'green'
                      : new Date(task.dueDate) < new Date()
                        ? 'red'
                        : 'gray',
                }}
              >
                {task.title}
              </td>
              <td>{task.description}</td>
              <td>{new Date(task.dueDate).toLocaleDateString()}</td>
              <td>{new Date(task.createdAt).toLocaleDateString()}</td>
              <td>{new Date(task.updatedAt).toLocaleDateString()}</td>
              <td>
                <Badge
                  bg={
                    task.priority === 'high'
                      ? 'danger'
                      : task.priority === 'medium'
                        ? 'warning'
                        : 'success'
                  }
                >
                  {task.priority === 'high'
                    ? "Высокий"
                    : task.priority === 'medium'
                      ? "Средний"
                      : "Низкий"
                  }
                </Badge>
              </td>
              <td>
                <Badge
                  bg={
                    task.status === 'to_do'
                      ? 'info'
                      : task.status === 'in_progress'
                        ? 'primary'
                        : task.status === 'completed'
                          ? 'success'
                          : 'secondary'
                  }
                >
                  {task.status === 'to_do'
                    ? 'К выполнению'
                    : task.status === 'in_progress'
                      ? 'Выполняется'
                      : task.status === 'completed'
                        ? 'Выполнена'
                        : 'Отменена'}
                </Badge>
              </td>
              <td>{getUserName(users, task.creatorId)}</td>
              <td>{getUserName(users, task.responsibleId)}</td>
              <td>
                {currentUser.managerId === 'manager' ? (
                  <div className="d-flex flex-column">
                    <Button
                      variant="dark"
                      onClick={() => handleTaskClick(task)}
                      size="sm"
                    >
                      Изменить
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteTask(task.id)}
                      size="sm"
                    >
                      Удалить
                    </Button>
                  </div>
                ) : (
                  <div>Доступны менеджеру</div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
});

export default TaskList;