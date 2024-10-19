const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');
const { User } = require('../models/models');
const { registerSchema } = require('../utils/validation');

const generateJwt = (id) => {
	return jwt.sign(
		{ id },
		process.env.SECRET_KEY,
		{ expiresIn: '24h' }
	)
}

class userController {
	async registraton(req, res, next) {
		try {
			const {
				login,
				password,
				name,
				surname,
				middlename,
				managerId
			} = await registerSchema.validateAsync(req.body);
			const hashedPassword = await bcrypt.hash(password, 5);
			const user = await User.create({
				login,
				password: hashedPassword,
				name,
				surname,
				middlename,
				managerId,
			});
			const token = generateJwt(user.id, user.email, user.role)
			return res.json({ token: token, user: user })
		} catch (error) {
			next(error);
		}
	}

	async login(req, res, next) {
		try {
			const { login, password } = req.body;
			const user = await User.findOne({ where: { login } });
			if (!user) {
				return next(ApiError.badRequest('Пользователь не найден'));
			}
			const isValidPassword = await bcrypt.compare(password, user.password);
			if (!isValidPassword) {
				return next(ApiError.badRequest('Неверный пароль'));
			}
			const token = generateJwt(user.id);
			return res.json({ token: token, user: user })
		} catch (error) {
			next(error);
		}
	}

	async check(req, res, next) {
		const token = generateJwt(req.user.id);
		return res.json({ token })
	}

	async getAllUsers(req, res, next) {
		try {
			const users = await User.findAll();
			res.json(users);
		} catch (error) {
			next(error);
		}
	}

	async getUserById(req, res, next) {
		try {
			const userId = req.params.id;
			const user = await User.findByPk(userId);
			if (!user) {
				return next(ApiError.badRequest('Пользователь не найден'));
			}
			res.json(user);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new userController();