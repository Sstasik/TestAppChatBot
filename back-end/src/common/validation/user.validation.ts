import Joi from 'joi';

export const UserCreateSchema = Joi.object({
	email: Joi.string()
		.email()
		.required()
		.messages({
			'string.base': 'Email must be a string',
			'string.email': 'Email must be a valid email address',
			'any.required': 'Email is required',
		}),
	username: Joi.string()
		.min(3)
		.max(30)
		.required()
		.messages({
			'string.base': 'Username must be a string',
			'string.min': 'Username must be at least 3 characters long',
			'string.max': 'Username must be at most 30 characters long',
			'any.required': 'Username is required',
		}),
	password: Joi.string()
		.min(6)
		.required()
		.messages({
			'string.base': 'Password must be a string',
			'string.min': 'Password must be at least 4 characters long',
			'any.required': 'Password is required',
		}),
});
