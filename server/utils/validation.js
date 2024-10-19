const Joi = require('joi');

const taskSchema = Joi.object().keys({
	title: Joi.string().required(),
	description: Joi.string().allow(''),
	dueDate: Joi.date().allow(null),
	priority: Joi.string().valid('high', 'medium', 'low').required(),
	status: Joi.string().valid('to_do', 'in_progress', 'completed', 'canceled').required(),
	creatorId: Joi.number().integer().required(),
	responsibleId: Joi.number().integer().allow(null),
});

const registerSchema = Joi.object().keys({
	login: Joi.string().required(),
	password: Joi.string().required(),
	name: Joi.string().required(),
	surname: Joi.string().required(),
	middlename: Joi.string().allow(''),
	managerId: Joi.string().valid('manager', 'user').required(),
});

module.exports = {
	taskSchema,
	registerSchema,
};
