import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import CreateTask from './CreateTask';
import TaskList from './TaskList';

import { getSortedTasks, getTasksByDueDate, getTasksByResponsible, getUserName } from '../helpers/helpers';
import { fetchTasks } from '../http/taskApi';

const TaskTable = observer(() => {
  const { user } = useContext(Context);
  const { task } = useContext(Context);

  user.setUser(localStorage.getItem('user'))
  const currentUser = JSON.parse(user.user)

  const [showModalCreate, setShowModalCreate] = useState(false);
  const [grouping, setGrouping] = useState('none');

  useEffect(() => {
    fetchTasks().then(data => { task.setTasks(data) })
  }, []);
  
  const tasks = task.tasks
  const users = user.users;

  const handleShowModalCreate = () => setShowModalCreate(true);
  const handleCloseModalCreate = () => setShowModalCreate(false);

  const handleCreateTask = async () => {
    const updatedTasks = await fetchTasks();
    task.setTasks(updatedTasks);
    handleCloseModalCreate();


    handleCloseModalCreate();
  };

  const handleGroupingChange = (eventKey) => {
    setGrouping(eventKey);
  };

  const groupedTasks =
    grouping === 'dueDate' ? getTasksByDueDate(tasks)
      : grouping === 'responsible' ? getTasksByResponsible(tasks)
        : [{ group: 'Без группировки', tasks: tasks }];

  return (
    <div>
      <h2 className="mt-3">Список задач</h2>
      {currentUser.managerId === 'manager' ? (
        <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
          <Button
            variant="success"
            onClick={handleShowModalCreate}
            className="mt-3 mb-3"
          >
            Новая задача
          </Button>

          <CreateTask
            show={showModalCreate}
            onClose={handleCloseModalCreate}
            onCreate={handleCreateTask}
          />
          <DropdownButton
            id="dropdown-basic-button"
            title="Группировка"
            onSelect={handleGroupingChange}
            className="mb-3"
            variant="primary"
          >
            <Dropdown.Item eventKey="none">
              Без группировки
            </Dropdown.Item>
            <Dropdown.Item eventKey="dueDate">
              По дате завершения
            </Dropdown.Item>
            <Dropdown.Item eventKey="responsible">
              По ответственным
            </Dropdown.Item>
          </DropdownButton>
        </div>
      ) : (
        <div></div>
      )}
      {groupedTasks.map(obj => (
        <React.Fragment key={obj.group}>
          <h3>
            {
              Number.isInteger(obj.group)
                ? getUserName(users, obj.group)
                : obj.group
            }
          </h3>
          <TaskList
            tasks={getSortedTasks(obj.tasks)}
          />
        </React.Fragment>
      ))}
    </div>
  );
});

export default TaskTable;