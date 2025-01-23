import { ValidationError } from 'joi';
import { ErrorMessages } from './types';

export const formatError = (
	error: ValidationError,
	messages: ErrorMessages
): { [key: string]: string[] } => {
	const formattedErrors: { [key: string]: string[] } = {};

	error.details.forEach((detail) => {
		const key = detail.path.join('.'); // Handle nested paths
		const messageTemplate =
			messages[detail.type] || '{{#label}} is invalid.'; // Fallback message
		let message = messageTemplate;

		// Replace placeholders like {{#label}} and {{#limit}}
		for (const contextKey in detail.context) {
			message = message.replace(
				`{{#${contextKey}}}`,
				detail.context[contextKey]?.toString() || ''
			);
		}

		if (!formattedErrors[key]) {
			formattedErrors[key] = [];
		}
		formattedErrors[key].push(message);
	});

	return formattedErrors;
};
