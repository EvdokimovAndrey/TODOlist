import { observer } from "mobx-react-lite";
import React, { useContext, useLayoutEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { NavLink, useNavigate } from 'react-router-dom';
import { login } from "../http/userApi";
import { Context } from "../index";

const LoginPage = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState('');
    const [password, setPassword] = useState('');
    const [redirected, setRedirected] = useState(false);

    useLayoutEffect(() => {
        if (user.isAuth && !redirected) {
            navigate('/');
            setRedirected(true);
        }
    }, [user.isAuth, redirected]);

    const signIn = async () => {
        try {
            let data;
            data = await login(userLogin, password);
            user.setUser(data.user);
            user.setIsAuth(true);
            navigate('/');
            window.location.reload()
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div>
            <Container
                className='d-flex justify-content-center align-items-center'
                style={{ height: window.innerHeight - 500 }}
            >
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Логин
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите логин"
                            value={userLogin}
                            onChange={e => setUserLogin(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>
                            Пароль
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Row className="mt-3">
                        <Col xs={6} className="text-start">
                            Нет аккаунта?
                            <NavLink to="/registration" className="text-decoration-none">
                                Зарегистрируйтесь
                            </NavLink>
                        </Col>
                        <Col xs={6} className="text-end mt-2">
                            <Button
                                variant="success"
                                onClick={signIn}
                            >
                                Войти
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
})

export default LoginPage;