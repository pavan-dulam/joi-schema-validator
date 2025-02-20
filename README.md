# **joi-schema-validator**

![npm](https://img.shields.io/npm/v/joi-schema-validator)
![license](https://img.shields.io/npm/l/joi-schema-validator)
![build](https://img.shields.io/github/actions/workflow/status/pavan-dulam/joi-schema-validator/publish.yml)
![downloads](https://img.shields.io/npm/d18m/joi-schema-validator)

**joi-schema-validator** is a structured and user-friendly error handler for **Joi validation** in Node.js applications. It simplifies error messages and supports synchronous, asynchronous, and middleware-based validation.

---

## **Key Features**

-   **Synchronous Validation (`validate`)**: Validate input and return **structured** error messages.
-   **Asynchronous Validation (`validateAsync`)**: Support for **database lookups** or **external API validation**.
-   **Express Middleware (`validateMiddleware`)**: Automatically validate incoming requests.
-   **Custom Error Messages**: Define **global** or **field-specific** messages.
-   **Enhanced Type Safety**: Strongly typed validation results.
-   **Supports Nested Objects**: Handles deeply nested field errors.
-   **Enterprise-Ready**: Lightweight and high-performance.

---

## **Installation**

Install via npm or yarn:

```sh
npm install joi-schema-validator
```

or

```sh
yarn add joi-schema-validator
```

---

## **Usage**

Import the required functions:

```typescript
import {
	validate,
	validateAsync,
	validateMiddleware
} from 'joi-schema-validator';
```

---

# **1. Synchronous Validation (`validate`)**

### **Example:**

```typescript
import Joi from 'joi';
import { validate } from 'joi-schema-validator';

const schema = Joi.object({
	name: Joi.string().min(3).required().label('Name'),
	age: Joi.number().min(18).required().label('Age'),
	email: Joi.string().email().required().label('Email'),
	address: Joi.string().optional().label('Address')
});

const customMessages = {
	'string.min': '{#label} must have at least {#limit} characters.',
	'name.string.min':
		'Name should be at least {#limit} characters long. Please provide a valid name.'
};

const result = validate(
	schema,
	{ name: 'Jo', age: 16, email: 'invalid', address: '' },
	customMessages
);

console.log(result);
```

### **Output Response**

```json
{
	"value": {
		"name": "Jo",
		"age": 16,
		"email": "invalid",
		"address": ""
	},
	"error": [
		{
			"field": "name",
			"type": "string.min",
			"message": "Name should be at least 3 characters long. Please provide a valid name."
		},
		{
			"field": "age",
			"type": "number.min",
			"message": "Age must be greater than or equal to 18."
		},
		{
			"field": "email",
			"type": "string.email",
			"message": "Email must be a valid email address."
		}
	]
}
```

---

# **2. Asynchronous Validation (`validateAsync`)**

### **Example:**

```typescript
import Joi from 'joi';
import { validateAsync } from 'joi-schema-validator';

const schema = Joi.object({
	username: Joi.string()
		.min(3)
		.required()
		.external(async (value) => {
			const existingUsers = ['existingUser', 'user123'];
			if (existingUsers.includes(value)) {
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
	console.log(result);
}

runAsyncValidation();
```

### **Output Response**

```json
{
	"errors": [
		{
			"field": "username",
			"type": "external",
			"message": "Username already exists."
		}
	]
}
```

---

# **3. Express Middleware (`validateMiddleware`)**

### **Example:**

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

### **Example Request**

```json
POST /user
Content-Type: application/json

{
  "name": "Jo",
  "email": "invalidEmail"
}
```

### **Output Response (HTTP 400 Bad Request)**

```json
{
	"errors": [
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
}
```

---

# 4. Custom Error Messages

**joi-schema-validator** allows you to provide your own error message templates that override (or extend) the default messages. You can specify:

1. **Global Overrides:**  
   These custom messages apply to every validation error of a given type. For example, setting a custom message for `'string.min'` will change the message for any string that fails the minimum length validation.

2. **Field-Level Overrides:**  
   These are specific to a particular field. For instance, you can provide a custom message for the `'name'` field when it fails a minimum length check using the key `'name.string.min'`.

3. **Fallback Behavior:**  
   If no custom message is provided for a particular error, the default message (from `defaultErrorMessages`) is used. If neither is available, the error message defaults to `"<field> is invalid."`.

### **How to Define Custom Error Messages**

Custom messages are passed as an `ErrorMessages` object. The keys in this object are either:

-   **Global error type keys**, e.g.:
    ```js
    {
      'string.min': '{#label} must have at least {#limit} characters.'
    }
    ```
-   **Field-specific keys**, e.g.:
    ```js
    {
      'name.string.min': 'Name should be at least {#limit} characters long. Please provide a valid name.'
    }
    ```

_Placeholders_ like `{#label}` and `{#limit}` will be replaced with values from the Joi validation context (e.g., the field label or the limit specified in the schema).

### **Usage in Different APIs**

#### **1. Synchronous Validation**

When using the `validate` function, pass the custom messages as the third parameter:

```typescript
import Joi from 'joi';
import { validate } from 'joi-schema-validator';

const schema = Joi.object({
	name: Joi.string().min(3).required().label('Name'),
	age: Joi.number().min(18).required().label('Age'),
	email: Joi.string().email().required().label('Email')
});

// Define custom error messages
const customMessages = {
	// Global override for all string.min errors
	'string.min': '{#label} must have at least {#limit} characters.',
	// Field-specific override for the "name" field
	'name.string.min':
		'Name should be at least {#limit} characters long. Please provide a valid name.'
};

const result = validate(
	schema,
	{ name: 'Jo', age: 16, email: 'invalid' },
	customMessages
);
if (result.error) {
	console.log('Formatted Errors:', result.formattedErrors);
} else {
	console.log('Validated Data:', result.value);
}
```

**Output Response:**

-   For `name` failing the min check, you’ll see the custom field-specific message.
-   For other errors (like `age` and `email`), you’ll see the global custom message or default messages if no override exists.

```json
{
	"value": {
		"name": "Jo",
		"age": 16,
		"email": "invalid",
		"address": ""
	},
	"error": [
		{
			"field": "name",
			"type": "string.min",
			"message": "Name should be at least 3 characters long. Please provide a valid name."
		},
		{
			"field": "age",
			"type": "number.min",
			"message": "Age must be greater than or equal to 18."
		},
		{
			"field": "email",
			"type": "string.email",
			"message": "Email must be a valid email address."
		}
	]
}
```

#### **2. Asynchronous Validation**

The usage is similar when using `validateAsync`:

```typescript
import Joi from 'joi';
import { validateAsync } from 'joi-schema-validator';

const schema = Joi.object({
	username: Joi.string()
		.min(3)
		.required()
		.external(async (value) => {
			const existingUsers = ['existingUser'];
			if (existingUsers.includes(value)) {
				throw new Error('Username already exists.');
			}
			return value;
		}),
	email: Joi.string().email().required()
});

const customMessages = {
	'string.min': '{#label} must have at least {#limit} characters.',
	'username.string.min':
		'Username should be at least {#limit} characters long. Please choose a longer username.'
};

async function runAsyncValidation() {
	const result = await validateAsync(
		schema,
		{ username: 'ex', email: 'test@example.com' },
		customMessages
	);
	if (result.error) {
		console.log('Async Formatted Errors:', result.formattedErrors);
	} else {
		console.log('Async Validated Data:', result.value);
	}
}

runAsyncValidation();
```

**Output Response:**

-   If the username fails the min check, the field-specific message is used.
-   Other errors use the global message or fallback to the default.

```json
{
	"value": {
		"username": "ex",
		"email": "test@example.com"
	},
	"error": [
		{
			"field": "username",
			"type": "external",
			"message": "Username already exists."
		}
	]
}
```

#### **3. Express Middleware for Validation**

When using the Express middleware, simply pass the custom messages to the middleware function:

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

const customMessages = {
	'string.min': '{#label} must have at least {#limit} characters.',
	'name.string.min': 'Name should be at least {#limit} characters long.'
};

app.post(
	'/user',
	validateMiddleware(userSchema, customMessages),
	(req, res) => {
		res.json({ success: true, data: req.body });
	}
);

app.listen(3000, () => console.log('Server running on port 3000'));
```

**Output Response if Validation Fails:**  
If a POST request to `/user` contains invalid data, the middleware will respond with aN e JSOrror payload like:

```json
{
	"success": false,
	"errors": [
		{
			"field": "name",
			"type": "string.min",
			"message": "Name should be at least 3 characters long."
		},
		{
			"field": "email",
			"type": "string.email",
			"message": "Email must be a valid email address."
		}
	]
}
```

---

## **API Reference**

### **1. `validate(schema, input, messages?, options?)`**

-   **Validates input synchronously** against a Joi schema.
-   **Returns** a `ValidationResult<T>`.
-   **Example:**
    ```typescript
    const result = validate(schema, input, customMessages, {
    	abortEarly: false
    });
    ```

### **2. `validateAsync(schema, input, messages?, options?)`**

-   **Validates input asynchronously**, useful for database or external API checks.
-   **Returns** a `Promise<ValidationResult<T>>`.
-   **Example:**
    ```typescript
    const result = await validateAsync(schema, input);
    ```

### **3. `validateMiddleware(schema, messages?)`**

-   **Express middleware** that validates `req.body`.
-   **If validation fails, returns a `400` response.**
-   **Example:**
    ```typescript
    app.post('/route', validateMiddleware(schema), handler);
    ```

---

## **Type Definitions**

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

---

## **License**

This project is licensed under the **MIT License**.

## **Issues & Support**

For issues, report them [here](https://github.com/pavan-dulam/joi-schema-validator/issues).

---

## **Author**

Developed by **[Pavan Dulam](mailto:pavandulam16@gmail.com)**.
