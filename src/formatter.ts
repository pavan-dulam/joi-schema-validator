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
		const field = detail.path.join('.'); // Supports nested fields like "address.street"
		const type = detail.type;

		// Check for field-specific override, e.g., "name.string.min"
		const fieldSpecificKey = `${field}.${type}`;
		let messageTemplate =
			messages[fieldSpecificKey] ||
			messages[type] ||
			`${field} is invalid.`;

		// Replace placeholders with actual values from context
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
