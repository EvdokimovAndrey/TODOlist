const { Task } = require('../models/models');
const { taskSchema } = require('../utils/validation');
const ApiError = require('../error/ApiError');

class taskController {
	async getAllTasks(req, res, next) {
		try {
			const tasks = await Task.findAll();
			res.json(tasks);
		} catch (error) {
			next(ApiError.badRequest(error));
		}
	}

	async getTaskById(req, res, next) {
		try {
			const taskId = req.params.taskId;
			const task = await Task.findByPk(taskId);
			if (!task) {
				ApiError.badRequest('Задача не найдена');
			}
			res.json(task);
		} catch (error) {
			ApiError.badRequest(error);
		}
	}

	async createTask(req, res, next) {
		try {
			const taskData = await taskSchema.validateAsync(req.body);
			const createdTask = await Task.create(taskData);
			res.status(201).json(createdTask);
		} catch (error) {
			next(ApiError.badRequest(error));
		}
	}

	async updateTask(req, res, next) {
		try {
			const taskId = req.params.taskId;
			const updatedTaskData = await taskSchema.validateAsync(req.body);
			const updatedTask = await Task.update(updatedTaskData, {
				where: { id: taskId },
				returning: true,
			});
			res.json(updatedTask[1][0]);
		} catch (error) {
			next(ApiError.badRequest(error));
		}
	}

	async deleteTask(req, res, next) {
		try {
			const taskId = req.params.taskId;
			await Task.destroy({ where: { id: taskId } });
			res.status(204).send();
		} catch (error) {
			next(ApiError.badRequest(error));
		}
	}
}

module.exports = new taskController();