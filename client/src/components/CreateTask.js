import React, { useEffect, useState, useContext } from 'react';
import { Button, Dropdown, DropdownButton, Form, Modal } from 'react-bootstrap';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { getAllUsers } from '../http/userApi';
import { createTask } from '../http/taskApi';

const CreateTask = observer(({ show, onClose, onCreate }) => {
  const { user } = useContext(Context);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllUsers().then(data => { user.setUsers(data) })
  }, []);

  const currentUser = JSON.parse(user.user);
  const users = user.users;

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'low',
    status: 'to_do',
    creatorId: currentUser.id,
    responsibleId: '',
  });

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSelectUser = (userId, userName, userSurname) => {
    setNewTask({ ...newTask, responsibleId: userId });
    setSelectedUser(`${userName} ${userSurname}`);
  };

  const handleSubmit = async () => {
    setError(null);

    if (!newTask.title || !newTask.description || !newTask.dueDate || !newTask.responsibleId) {
      setError('Все поля должны быть заполнены!');
      return;
    }

    try {
      const data = await createTask(newTask);
      onCreate(data);
    } catch (error) {
      console.error("Ошибка при создании задачи:", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Новая задача</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Заголовок:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicDescription">
            <Form.Label>Описание:</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicDueDate">
            <Form.Label>Дата окончания:</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={newTask.dueDate}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPriority">
            <Form.Label>Приоритет:</Form.Label>
            <Form.Select
              name="priority"
              value={newTask.priority}
              onChange={handleInputChange}
            >
              <option value="high">Высокий</option>
              <option value="medium">Средний</option>
              <option value="low">Низкий</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formBasicStatus">
            <Form.Label>Статус:</Form.Label>
            <Form.Select
              name="status"
              value={newTask.status}
              onChange={handleInputChange}
            >
              <option value="to_do">К выполнению</option>
              <option value="in_progress">Выполняется</option>
              <option value="completed">Выполнена</option>
              <option value="canceled">Отменена</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formBasicCreator">
            <Form.Label>Создатель:</Form.Label>
            <Form.Control
              type="text"
              value={`Вы - ${currentUser.name} ${currentUser.surname}`}
            />
            <input type="hidden" name="creatorId" value={currentUser.id} />
          </Form.Group>
          <Form.Group controlId="formBasicResponsible">
            <Form.Label>Ответственный:</Form.Label>
            <DropdownButton
              variant="outline-secondary"
              title={selectedUser ? selectedUser : "Выбрать пользователя"}
              id="dropdown-basic-button"
              required
            >
              {users.map((user) => (
                <Dropdown.Item
                  key={user.id}
                  onClick={() => handleSelectUser(user.id, user.name, user.surname)}
                >
                  {user.name} {user.surname}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Закрыть
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Создать
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateTask;