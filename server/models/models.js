const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	surname: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	middlename: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	login: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	managerId: {
		type: DataTypes.ENUM('manager', 'user'),
		allowNull: false,
		defaultValue: 'user',
	},
});

const Task = sequelize.define('Task', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: true,
	},
	dueDate: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
	},
	updatedAt: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
	},
	priority: {
		type: DataTypes.ENUM('high', 'medium', 'low'),
		allowNull: false,
		defaultValue: 'medium',
	},
	status: {
		type: DataTypes.ENUM('to_do', 'in_progress', 'completed', 'canceled'),
		allowNull: false,
		defaultValue: 'to_do',
	},
	creatorId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'Users',
			key: 'id',
		},
	},
	responsibleId: {
		type: DataTypes.INTEGER,
		allowNull: true,
		references: {
			model: 'Users',
			key: 'id',
		},
	},
});

User.hasMany(Task);

module.exports = { Task, User };
