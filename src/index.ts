import { Schema, ValidationOptions, ValidationError } from 'joi';
import { formatError } from './formatter';
import { ErrorMessages } from './types';
import { defaultErrorMessages } from './joiErrorMessages';
import { Request, Response, NextFunction } from 'express';

/**
 * Enhanced Type Safety for Validation Results
 * This interface ensures that validation results are strongly typed.
 */
export interface ValidationResult<T> {
	value: T;
	error?: ReturnType<typeof formatError> | null;
}

/**
 * Merge custom error messages with default error messages.
 * Custom messages override defaults if provided.
 *
 * This supports:
 * - Global error message overrides.
 * - Field-level error message overrides (e.g., "name.string.min").
 */
function mergeMessages(custom?: ErrorMessages): ErrorMessages {
	return custom
		? { ...defaultErrorMessages, ...custom }
		: defaultErrorMessages;
}

/**
 * validate
 * Synchronous validation function.
 *
 * Field-Level Error Message Overrides & Custom Error Formatting Options:
 * The error messages are formatted using the provided (or default) error messages.
 * You can supply field-specific messages in the custom messages object. For instance:
 *   { 'name.string.min': 'Name must have at least {#limit} characters.' }
 *
 * @param schema - Joi schema definition.
 * @param input - Data to validate.
 * @param options - Optional Joi validation options.
 * @param messages - Custom error message overrides.
 * @returns ValidationResult<T>
 */
export function validate<T>(
	schema: Schema,
	input: any,
	messages?: ErrorMessages,
	options?: ValidationOptions
): ValidationResult<T> {
	const mergedMessages = mergeMessages(messages);
	const { error, value } = schema.validate(input, {
		...options,
		abortEarly: false
	});

	return {
		value,
		error: error ? formatError(error, mergedMessages) : null
	};
}

/**
 * validateAsync
 * Async Validation Support:
 * Handles asynchronous Joi validation, which is useful when validations involve async operations,
 * such as database lookups or external API calls.
 *
 * @param schema - Joi schema definition.
 * @param input - Data to validate.
 * @param options - Optional Joi validation options.
 * @param messages - Custom error message overrides.
 * @returns Promise resolving to ValidationResult<T>
 */
export async function validateAsync<T>(
	schema: Schema,
	input: any,
	messages?: ErrorMessages,
	options?: ValidationOptions
): Promise<ValidationResult<T>> {
	const mergedMessages = mergeMessages(messages);
	try {
		const value = await schema.validateAsync(input, {
			...options,
			abortEarly: false
		});
		return { value, error: null };
	} catch (err) {
		const error = (err as ValidationError) || null;
		return {
			value: input,
			error: formatError(error as ValidationError, mergedMessages)
		};
	}
}

/**
 * validateMiddleware
 * Express Middleware for Validation:
 * Returns an Express middleware that validates req.body against the provided schema.
 * If validation fails, it sends a 400 response with formatted errors.
 *
 * @param schema - Joi schema definition.
 * @param messages - Custom error message overrides.
 * @returns Express middleware function.
 */
export function validateMiddleware(schema: Schema, messages?: ErrorMessages) {
	const mergedMessages = mergeMessages(messages);
	return (req: Request, res: Response, next: NextFunction) => {
		const { error } = validate(schema, req.body, mergedMessages);
		if (error) {
			return res.status(400).json({ success: false, errors: error });
		}
		next();
	};
}
