# joi-schema-validator

![npm](https://img.shields.io/npm/v/joi-schema-validator)
![license](https://img.shields.io/npm/l/joi-schema-validator)
![build](https://img.shields.io/github/actions/workflow/status/pavan-dulam/joi-schema-validator/publish.yml)

A world-class Joi validation error formatter for structured, user-friendly error handling in Node.js applications.

## Features

-   **Human-readable error messages** for better debugging.
-   **Customizable error messages** to fit your requirements.
-   **Supports nested object validation**.
-   **Enterprise-ready** validation handling.
-   **TypeScript support** for strict type safety.
-   **Lightweight and efficient**.

## Installation

You can install this package using npm or yarn:

```sh
npm install joi-schema-validator
```

or

```sh
yarn add joi-schema-validator
```

## Usage

### Basic Example

```typescript
import Joi from 'joi';
import { joiSchemaValidator } from 'joi-schema-validator';

const schema = Joi.object({
	name: Joi.string().min(3).required(),
	email: Joi.string().email().required(),
	age: Joi.number().min(18)
});

const validator = joiSchemaValidator(schema);
const { value, error } = validator.validate({
	name: 'Jo',
	email: 'invalid-email'
});

console.log(value); // Outputs validated data
console.log(error); // Outputs formatted error messages
```

### Example Output

```json
[
	{
		"field": "name",
		"type": "string.min",
		"message": "Name must have at least 3 characters."
	},
	{
		"field": "email",
		"type": "string.email",
		"message": "Email must be a valid email address."
	}
]
```

## Custom Error Messages

You can provide custom error messages by passing them as the second argument:

```typescript
const customMessages = {
	'string.min': '{#label} is too short!',
	'string.email': 'Please enter a valid email!'
};

const validator = joiSchemaValidator(schema, customMessages);
const { error } = validator.validate({ name: 'Jo', email: 'invalid-email' });

console.log(error);
```

### Example Output

```json
[
	{ "field": "name", "type": "string.min", "message": "Name is too short!" },
	{
		"field": "email",
		"type": "string.email",
		"message": "Please enter a valid email!"
	}
]
```

## API Reference

### `joiSchemaValidator(schema: Schema, messages?: ErrorMessages)`

Creates a validation function with customized error handling.

#### Parameters:

| Parameter  | Type                       | Description                           |
| ---------- | -------------------------- | ------------------------------------- |
| `schema`   | `Joi.Schema`               | Joi schema definition for validation. |
| `messages` | `ErrorMessages (optional)` | Custom error messages.                |

### `.validate(input: any, options?: Joi.ValidationOptions)`

Validates input data against the schema.

#### Parameters:

| Parameter | Type                               | Description             |
| --------- | ---------------------------------- | ----------------------- |
| `input`   | `any`                              | Data to be validated.   |
| `options` | `Joi.ValidationOptions (optional)` | Joi validation options. |

#### Returns:

```typescript
{
  value: any; // The validated data
  error: ValidationErrorItemFormatted[] | null; // Formatted errors
}
```

## Type Definitions

```typescript
export interface ValidationErrorItemFormatted {
	field: string;
	type: string;
	message: string;
}
```

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to the branch.
5. Submit a pull request.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Issues & Support

For any issues, please report them [here](https://github.com/pavan-dulam/joi-schema-validator/issues).

## Author

Developed by [Pavan Dulam](mailto:pavandulam16@gmail.com).
