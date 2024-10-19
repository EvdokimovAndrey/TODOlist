import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (login, password, name, surname, middlename, managerId) => {
    const { data } = await $host.post('api/user/registration', { login, password, name, surname, middlename, managerId })
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return { user: data.user, token: jwtDecode(data.token) }
}

export const login = async (login, password) => {
    const { data } = await $host.post('api/user/login', { login, password })
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user));
    return { user: data.user, token: jwtDecode(data.token) }
}

export const getAllUsers = async () => {
    const { data } = await $host.get('api/user/getAllUsers')
    return data
}

export const getUserById = async () => {
    const { data } = await $host.get('api/user/getUserById')
    return data
}

export const check = async (token) => {
    const { data } = await $authHost.post('api/user/auth', { token })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}