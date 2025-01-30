import { ValidationError } from 'joi';
import { ErrorMessages } from './types';

export interface ValidationErrorItemFormatted {
	field: string;
	type: string;
	message: string;
}

export const formatError = (
	error: ValidationError,
	messages: ErrorMessages
): ValidationErrorItemFormatted[] => {
	return error.details.map((detail) => {
		const field = detail.path.join('.'); // Supports nested fields like settings.theme
		const type = detail.type;

		// Get the error message template or default message
		let messageTemplate = messages[type] || `"${field}" is invalid.`;

		// Avoid duplicate field names in messages
		messageTemplate = messageTemplate.replace(
			new RegExp(`^${field}\\s+`, 'i'),
			''
		);

		// Replace placeholders with actual values
		if (detail.context) {
			Object.entries(detail.context).forEach(([key, value]) => {
				messageTemplate = messageTemplate.replace(
					new RegExp(`{#${key}}`, 'g'),
					value?.toString() || ''
				);
			});
		}

		// Ensure proper sentence case
		messageTemplate =
			messageTemplate.charAt(0).toUpperCase() + messageTemplate.slice(1);

		return {
			field,
			type,
			message: messageTemplate
		};
	});
};
