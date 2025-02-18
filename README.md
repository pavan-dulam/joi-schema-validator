# joi-schema-validator

![npm](https://img.shields.io/npm/v/joi-schema-validator)
![license](https://img.shields.io/npm/l/joi-schema-validator)
![build](https://img.shields.io/github/actions/workflow/status/pavan-dulam/joi-schema-validator/publish.yml)
![downloads](https://img.shields.io/npm/d18m/joi-schema-validator)

A world-class Joi validation error formatter for structured, user-friendly error handling in Node.js applications.

## Features

-   **Synchronous Validation** with custom error formatting and field-level error message overrides.
-   **Async Validation Support** (`validateAsync`): Validate data asynchronously (ideal for checks like database lookups or external API calls).
-   **Express Middleware for Validation** (`validateMiddleware`): Easily integrate validation into Express routes.
-   **Custom Error Formatting Options:** Merge custom error messages with default messages. Field-specific overrides (e.g., `name.string.min`) allow granular control.
-   **Enhanced Type Safety:** Validation results are strongly typed via `ValidationResult<T>`.
-   **Supports Nested Object Validation.**
-   **Enterprise-ready & Lightweight.**

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

This version exposes three main functions that you can import individually for a smoother experience:

```typescript
import {
	validate,
	validateAsync,
	validateMiddleware
} from 'joi-schema-validator';
```

### Synchronous Validation

```typescript
import Joi from 'joi';
import { validate } from 'joi-schema-validator';

const schema = Joi.object({
	name: Joi.string().min(3).required().label('Name'),
	age: Joi.number().min(18).required().label('Age'),
	email: Joi.string().email().required().label('Email'),
	address: Joi.string().optional().label('Address')
});

// Custom messages: global override and field-specific override for "name"
const customMessages = {
	// Global override for string.min errors
	'string.min': '{#label} must have at least {#limit} characters.',
	// Field-specific override for name (applies only to the "name" field)
	'name.string.min':
		'Name should be at least {#limit} characters long. Please provide a valid name.'
};

const result = validate(
	schema,
	{ name: 'Jo', age: 16, email: 'invalid', address: '' },
	customMessages
);
if (result.error) {
	console.log('Formatted Errors:', result.formattedErrors);
} else {
	console.log('Validated Data:', result.value);
}
```

### Asynchronous Validation

The `validateAsync` function is particularly useful for real-life scenarios, such as ensuring a username or email is unique in your database. It returns a promise that resolves to a strongly-typed `ValidationResult<T>`.

```typescript
import Joi from 'joi';
import { validateAsync } from 'joi-schema-validator';

const schema = Joi.object({
	username: Joi.string()
		.min(3)
		.required()
		.external(async (value) => {
			// Simulate an asynchronous uniqueness check (e.g., querying a database)
			const existingUsernames = ['existingUser', 'user123'];
			if (existingUsernames.includes(value)) {
				throw new Error('Username already exists.');
			}
			return value;
		}),
	email: Joi.string().email().required()
});

async function runAsyncValidation() {
	const result = await validateAsync(schema, {
		username: 'existingUser',
		email: 'test@example.com'
	});
	if (result.error) {
		console.log('Async Formatted Errors:', result.formattedErrors);
	} else {
		console.log('Async Validated Data:', result.value);
	}
}

runAsyncValidation();
```

### Express Middleware for Validation

The `validateMiddleware` function allows you to easily protect your Express routes by validating incoming request bodies. If validation fails, the middleware responds with a 400 status and the formatted errors.

```typescript
import express from 'express';
import Joi from 'joi';
import { validateMiddleware } from 'joi-schema-validator';

const app = express();
app.use(express.json());

const userSchema = Joi.object({
	name: Joi.string().min(3).required().label('Name'),
	email: Joi.string().email().required().label('Email')
});

app.post('/user', validateMiddleware(userSchema), (req, res) => {
	res.json({ success: true, data: req.body });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

## API Reference

### `validate(schema: Schema, input: any, options?: Joi.ValidationOptions, messages?: ErrorMessages)`

-   **Description:** Synchronously validates input against a Joi schema. Returns a `ValidationResult<T>` that includes the validated data, any errors, and formatted error messages.
-   **Returns:**
    ```typescript
    {
      value: T;
      error: ValidationError | null;
      formattedErrors?: ValidationErrorItemFormatted[];
    }
    ```

### `validateAsync(schema: Schema, input: any, options?: Joi.ValidationOptions, messages?: ErrorMessages)`

-   **Description:** Asynchronously validates input. Useful for validations involving async operations (e.g., uniqueness checks).
-   **Returns:** A promise that resolves to `ValidationResult<T>`.

### `validateMiddleware(schema: Schema, messages?: ErrorMessages)`

-   **Description:** Returns an Express middleware function that validates `req.body` against the provided schema. If validation fails, it responds with a 400 status and error details.
-   **Usage:** Attach to Express routes to automatically validate incoming data.

## Type Definitions

```typescript
export interface ValidationErrorItemFormatted {
	field: string;
	type: string;
	message: string;
}

export interface ErrorMessages {
	[key: string]: string;
}

export interface ValidationResult<T> {
	value: T;
	error: ValidationError | null;
	formattedErrors?: ValidationErrorItemFormatted[];
}
```

## Release Notes

See [GitHub Releases](https://github.com/pavan-dulam/joi-schema-validator/releases/latest) for detailed release notes

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
