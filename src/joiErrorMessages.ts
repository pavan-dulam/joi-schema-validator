import { ErrorMessages } from './types';
export const defaultErrorMessages: ErrorMessages = {
	// STRING FIELD ERRORS
	'string.base': 'The value must be a string.',
	'string.empty': 'This field is required and cannot be empty.',
	'string.min': 'The value must have at least {#limit} characters.',
	'string.max': 'The value cannot have more than {#limit} characters.',
	'string.length': 'The value must be exactly {#limit} characters long.',
	'string.pattern.base': 'The value does not match the required format.',
	'string.email': 'A valid email address is required.',
	'string.uri': 'A valid URI is required.',
	'string.uuid': 'A valid UUID is required.',
	'string.alphanum': 'The value must contain only alphanumeric characters.',
	'string.token':
		'The value must contain only alphanumeric and underscore (_) characters.',
	'string.hex': 'The value must be a valid hexadecimal.',
	'string.base64': 'The value must be a valid Base64 string.',
	'string.isoDate': 'The value must be a valid ISO date.',
	'string.dataUri': 'The value must be a valid data URI.',
	'string.trim': 'The value must not contain leading or trailing whitespace.',
	'string.creditCard': 'The value must be a valid credit card number.',
	'string.lowercase': 'The value must be in lowercase.',
	'string.uppercase': 'The value must be in uppercase.',

	// NUMBER FIELD ERRORS
	'number.base': 'The value must be a number.',
	'number.min': 'The value must be greater than or equal to {#limit}.',
	'number.max': 'The value must be less than or equal to {#limit}.',
	'number.less': 'The value must be less than {#limit}.',
	'number.greater': 'The value must be greater than {#limit}.',
	'number.integer': 'The value must be an integer.',
	'number.unsafe': 'The value must be a safe number.',
	'number.positive': 'The value must be a positive number.',
	'number.negative': 'The value must be a negative number.',
	'number.precision': 'The value must have at most {#limit} decimal places.',

	// DATE FIELD ERRORS
	'date.base': 'The value must be a valid date.',
	'date.min': 'The date must be after {#limit}.',
	'date.max': 'The date must be before {#limit}.',
	'date.greater': 'The date must be greater than {#limit}.',
	'date.less': 'The date must be less than {#limit}.',
	'date.iso': 'The value must be a valid ISO date.',

	// ARRAY FIELD ERRORS
	'array.base': 'The value must be an array.',
	'array.min': 'The array must contain at least {#limit} items.',
	'array.max': 'The array must contain at most {#limit} items.',
	'array.length': 'The array must contain exactly {#limit} items.',
	'array.includes': 'The array contains invalid items.',
	'array.includesRequiredUnknowns':
		'The array must contain at least {#unknownMisses} items.',
	'array.includesRequiredKnowns':
		'The array must contain the required items.',
	'array.excludes': 'The array contains items that are not allowed.',

	// OBJECT FIELD ERRORS
	'object.base': 'The value must be an object.',
	'object.min': 'The object must have at least {#limit} keys.',
	'object.max': 'The object must have at most {#limit} keys.',
	'object.length': 'The object must have exactly {#limit} keys.',
	'object.missing': 'The object is missing the required key(s): {#keys}.',
	'object.unknown': 'The object contains unknown keys.',
	'object.and': 'The object must contain all of the following keys: {#keys}.',
	'object.or':
		'The object must contain at least one of the following keys: {#keys}.',
	'object.nand':
		'The object must not contain both of the following keys: {#keys}.',
	'object.xor':
		'The object must contain one and only one of the following keys: {#keys}.',
	'object.with': 'The key "{#peer}" is required when "{#main}" is present.',
	'object.without':
		'The key "{#peer}" is not allowed when "{#main}" is present.',

	// BOOLEAN FIELD ERRORS
	'boolean.base': 'The value must be a boolean (true or false).',

	// BINARY FIELD ERRORS
	'binary.base': 'The value must be a binary buffer.',
	'binary.min': 'The buffer must be at least {#limit} bytes.',
	'binary.max': 'The buffer must be at most {#limit} bytes.',

	// ALTERNATIVES FIELD ERRORS
	'alternatives.types': 'The value must match one of the allowed types.'
};
