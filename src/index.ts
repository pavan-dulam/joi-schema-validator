import Joi, { Schema } from 'joi';
import { formatError } from './formatter';
import { ErrorMessages } from './types';
import { defaultErrorMessages } from './joiErrorMessages';

export const joiSchemaValidator = (
	schema: Schema,
	messages?: ErrorMessages
) => {
	return {
		validate: (input: any, options?: Joi.ValidationOptions) => {
			const { error, value } = schema.validate(input, {
				...options,
				abortEarly: false
			});
			return {
				value,
				error: error
					? formatError(error, messages || defaultErrorMessages)
					: null
			};
		}
	};
};
