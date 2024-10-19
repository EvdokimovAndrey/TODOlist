import LoginPage from "../../pages/LoginPage";
import RegistrationPage from "../../pages/RegistrationPage";
import MainPage from "../../pages/MainPage";

export const routeConfig = {
  protectedRoute: {
    path: '/',
    element: <MainPage />
  },
  loginRoute: {
    path: '/login',
    element: <LoginPage />
  },
  registrationRoute: {
    path: '/registration',
    element: <RegistrationPage />
  }
};