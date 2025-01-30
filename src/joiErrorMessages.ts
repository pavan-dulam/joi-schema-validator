import { ErrorMessages } from './types';

export const defaultErrorMessages: ErrorMessages = {
	// STRING FIELD ERRORS
	'string.base': '{#label} must be a string.',
	'string.empty': '{#label} is required and cannot be empty.',
	'string.min': '{#label} must have at least {#limit} characters.',
	'string.max': '{#label} cannot have more than {#limit} characters.',
	'string.length': '{#label} must be exactly {#limit} characters long.',
	'string.pattern.base': '{#label} does not match the required format.',
	'string.email': '{#label} must be a valid email address.',
	'string.uri': '{#label} must be a valid URI.',
	'string.uuid': '{#label} must be a valid UUID.',
	'string.alphanum': '{#label} must contain only alphanumeric characters.',
	'string.token':
		'{#label} must contain only alphanumeric and underscore (_) characters.',
	'string.hex': '{#label} must be a valid hexadecimal.',
	'string.base64': '{#label} must be a valid Base64 string.',
	'string.isoDate': '{#label} must be a valid ISO date.',
	'string.dataUri': '{#label} must be a valid data URI.',
	'string.trim': '{#label} must not contain leading or trailing whitespace.',
	'string.creditCard': '{#label} must be a valid credit card number.',
	'string.lowercase': '{#label} must be in lowercase.',
	'string.uppercase': '{#label} must be in uppercase.',

	// NUMBER FIELD ERRORS
	'number.base': '{#label} must be a number.',
	'number.min': '{#label} must be greater than or equal to {#limit}.',
	'number.max': '{#label} must be less than or equal to {#limit}.',
	'number.less': '{#label} must be less than {#limit}.',
	'number.greater': '{#label} must be greater than {#limit}.',
	'number.integer': '{#label} must be an integer.',
	'number.unsafe': '{#label} must be a safe number.',
	'number.positive': '{#label} must be a positive number.',
	'number.negative': '{#label} must be a negative number.',
	'number.precision': '{#label} must have at most {#limit} decimal places.',

	// DATE FIELD ERRORS
	'date.base': '{#label} must be a valid date.',
	'date.min': '{#label} must be after {#limit}.',
	'date.max': '{#label} must be before {#limit}.',
	'date.greater': '{#label} must be greater than {#limit}.',
	'date.less': '{#label} must be less than {#limit}.',
	'date.iso': '{#label} must be a valid ISO date.',

	// ARRAY FIELD ERRORS
	'array.base': '{#label} must be an array.',
	'array.min': '{#label} must contain at least {#limit} items.',
	'array.max': '{#label} must contain at most {#limit} items.',
	'array.length': '{#label} must contain exactly {#limit} items.',
	'array.includes': '{#label} contains invalid items.',
	'array.includesRequiredUnknowns':
		'{#label} must contain at least {#unknownMisses} required items.',
	'array.includesRequiredKnowns': '{#label} must contain all required items.',
	'array.excludes': '{#label} contains items that are not allowed.',

	// OBJECT FIELD ERRORS
	'object.base': '{#label} must be an object.',
	'object.min': '{#label} must have at least {#limit} keys.',
	'object.max': '{#label} must have at most {#limit} keys.',
	'object.length': '{#label} must have exactly {#limit} keys.',
	'object.missing': '{#label} is missing the required key(s): {#keys}.',
	'object.unknown': '{#label} contains unknown keys.',
	'object.and': '{#label} must contain all of the following keys: {#keys}.',
	'object.or':
		'{#label} must contain at least one of the following keys: {#keys}.',
	'object.nand':
		'{#label} must not contain both of the following keys: {#keys}.',
	'object.xor':
		'{#label} must contain exactly one of the following keys: {#keys}.',
	'object.with': '{#label} requires "{#peer}" when "{#main}" is present.',
	'object.without':
		'{#label} cannot have "{#peer}" when "{#main}" is present.',

	// BOOLEAN FIELD ERRORS
	'boolean.base': '{#label} must be a boolean (true or false).',

	// BINARY FIELD ERRORS
	'binary.base': '{#label} must be a binary buffer.',
	'binary.min': '{#label} must be at least {#limit} bytes.',
	'binary.max': '{#label} must be at most {#limit} bytes.',

	// ALTERNATIVES FIELD ERRORS
	'alternatives.types': '{#label} must match one of the allowed types.'
};
