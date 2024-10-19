import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton, Form, Modal } from 'react-bootstrap';
import { getAllUsers } from '../http/userApi';
import { Context } from "../index";

const EditTask = observer(({ show, onClose, onUpdate, selectedTask }) => {
  const { user } = useContext(Context);
  const [updatedTask, setUpdatedTask] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setUpdatedTask(selectedTask || {});
  }, [selectedTask]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectUser = (userId, userName, userSurname) => {
    setUpdatedTask((prev) => ({ ...prev, responsibleId: userId }));
    setSelectedUser(`${userName} ${userSurname}`);
  };

  useEffect(() => {
    getAllUsers().then(data => { user.setUsers(data) });
  }, []);

  const users = user.users;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Изменить задачу</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Заголовок:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={updatedTask.title || ""}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicDescription">
            <Form.Label>Описание:</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={updatedTask.description || ""}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicDueDate">
            <Form.Label>Дата окончания:</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={updatedTask.dueDate || ""}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPriority">
            <Form.Label>Приоритет:</Form.Label>
            <Form.Select
              name="priority"
              value={updatedTask.priority || ""}
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
              value={updatedTask.status || ""}
              onChange={handleInputChange}
            >
              <option value="to_do">К выполнению</option>
              <option value="in_progress">Выполняется</option>
              <option value="completed">Выполнена</option>
              <option value="canceled">Отменена</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formBasicResponsible">
            <Form.Label>Ответственный:</Form.Label>
            <DropdownButton
              variant="outline-secondary"
              title={selectedUser ? selectedUser : "Выбрать пользователя"}
              id="dropdown-basic-button"
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
        <Button variant="primary" onClick={() => {
          console.log("Сохранить вызвано с:", updatedTask, updatedTask.id);
          onUpdate(updatedTask);
        }}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default EditTask;
