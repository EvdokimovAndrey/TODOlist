import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "..";
import { observer } from 'mobx-react-lite'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const NavBar = observer(() => {
	const { user } = useContext(Context);
	user.setUser(localStorage.getItem('user'))
	const navigate = useNavigate();
	const currentUser = JSON.parse(user.user)

	const logOut = () => {
		user.setUser({});
		user.setIsAuth(false);
		localStorage.removeItem('token');
		navigate('/login');
	}

	return (
		<Navbar className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href="/main">TODO list</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end">
					{user.isAuth
						? <Navbar className='ml-auto' style={{ color: 'white' }}>
							<Navbar.Text style={{ marginRight: '15px' }}>
								{currentUser.name} {currentUser.surname}
							</Navbar.Text>
							<Button
								variant='secondary'
								onClick={() => logOut()}
							>
								Выйти
							</Button>
						</Navbar>
						: <div>Пройдите авторизацию</div>
					}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
})

export default NavBar;