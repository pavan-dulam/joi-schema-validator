// src/index.ts
import Joi, { Schema, ValidationResult } from 'joi';
import { formatError } from './formatter';
import { ErrorMessages } from './types';
import { defaultErrorMessages } from './joiErrorMessages';

export const humanJoi = (
	schema: Schema,
	messages: ErrorMessages = defaultErrorMessages
) => {
	return {
		validate: (
			input: any,
			options?: Joi.ValidationOptions
		): { value: any; error: { [key: string]: string[] } | null } => {
			const result: ValidationResult = schema.validate(input, options);

			if (result.error) {
				const formattedErrors = formatError(result.error, messages);
				return { value: result.value, error: formattedErrors };
			}

			return { value: result.value, error: null };
		}
	};
};
