import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavLink, useNavigate } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { registration } from "../http/userApi";

const RegistrationPage = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [error, setError] = useState(null);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  useEffect(() => {
    if (user.isAuth) {
      navigate('/');
      window.location.reload()
    }
  }, [user.isAuth]);


  const signUp = async () => {

    setError(null);

    if (!userLogin || !password || !name || !surname) {
      setError('Все поля, кроме отчества, должны быть заполнены!');
      return;
    }
    try {
      let data;
      console.log({ userLogin, password, name, surname, middlename, role })
      data = await registration(userLogin, password, name, surname, middlename, role);

      user.setUser(data.user);
      user.setIsAuth(true);
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <div>
      <Container
        className='d-flex justify-content-center align-items-center'
        style={{ height: window.innerHeight - 100 }}
      >
        <Form>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form.Group className="mb-3">
            <Form.Label>Логин</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите логин"
              value={userLogin}
              onChange={(e) => setUserLogin(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите фамилию"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Отчество</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите отчество"
              value={middlename}
              onChange={(e) => setMiddlename(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="roleSelect">
            <Form.Label>Кто Вы?</Form.Label>
            <Form.Select value={role} onChange={handleRoleChange}>
              <option value="manager">Менеджер</option>
              <option value="user">Пользователь</option>
            </Form.Select>
          </Form.Group>
          <Row className="mt-3">
            <Col xs={6} className="text-start">
              Уже есть аккаунт?
              <NavLink to="/login" className="text-decoration-none">
                Войдите
              </NavLink>
            </Col>
            <Col xs={6} className="text-end mt-2">
              <Button
                variant="success"
                onClick={signUp}
              >
                Зарегистрироваться
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
});

export default RegistrationPage;