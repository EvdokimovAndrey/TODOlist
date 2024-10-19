import { $host } from "./index";

export const fetchTasks = async () => {
    const { data } = await $host.get('api/task');
    return data;
};

export const createTask = async (newTask) => {
    const response = await $host.post('api/task/createTask', newTask);
    return response.data;
};

export const updateTask = async (taskId, updatedTask) => {
    try {
        const response = await $host.put(`api/task/${taskId}`, updatedTask);
        return response.data;
    } catch (error) {
        console.error('Ошибка при обновлении задачи:', error);
        throw error;
    }
};

export const deleteTask = async (taskId) => {
    try {
        await $host.delete(`api/task/${taskId}`);
        return true;
    } catch (error) {
        console.error("Ошибка при удалении задачи:", error);
        throw error;
    }
}