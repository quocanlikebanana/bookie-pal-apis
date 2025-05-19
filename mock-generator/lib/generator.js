// Handles the generation of mock data

/**
 * Generates mock data for a given schema object.
 * @param {object} schema - The OpenAPI schema object for a specific response or parameter.
 * @param {object} [customLogic] - Custom logic functions from the config file.
 * @param {string} [fieldName] - The name of the field being generated (for custom logic lookup).
 * @returns {*} - The generated mock data.
 */
function generateDataFromSchema(schema, customLogic = {}, fieldName = null) {
	// Check for custom field generator by field name
	if (fieldName && customLogic.fieldName && customLogic.fieldName[fieldName] && typeof customLogic.fieldName[fieldName] === 'function') {
		return customLogic.fieldName[fieldName](schema);
	}

	// Check for custom field generator by format
	if (schema.format && customLogic.format && customLogic.format[schema.format] && typeof customLogic.format[schema.format] === 'function') {
		return customLogic.format[schema.format](schema);
	}

	// Check for custom field generator by type
	if (schema.type && customLogic.type && customLogic.type[schema.type] && typeof customLogic.type[schema.type] === 'function') {
		return customLogic.type[schema.type](schema);
	}

	if (schema.example) {
		return schema.example;
	}

	switch (schema.type) {
		case 'object':
			const obj = {};
			if (schema.properties) {
				for (const propName in schema.properties) {
					obj[propName] = generateDataFromSchema(schema.properties[propName], customLogic, propName); // Pass propName
				}
			}
			return obj;
		case 'array':
			if (schema.items) {
				// Generate a small array by default, e.g., 1-3 items
				const arrLength = (customLogic.globalSettings && typeof customLogic.globalSettings.defaultArraySize === 'number')
					? customLogic.globalSettings.defaultArraySize
					: Math.floor(Math.random() * 3) + 1;
				return Array.from({ length: arrLength }, () => generateDataFromSchema(schema.items, customLogic)); // Do not pass fieldName for array items unless specifically needed
			}
			return [];
		case 'string':
			if (schema.format === 'date-time') return new Date().toISOString();
			if (schema.format === 'date') return new Date().toISOString().split('T')[0];
			if (schema.format === 'email') return 'user@example.com';
			if (schema.format === 'uuid') return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
				const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
			// Add more string format handlers as needed (e.g., byte, binary, password)
			if (schema.enum) {
				return schema.enum[Math.floor(Math.random() * schema.enum.length)];
			}
			if (typeof schema.default !== 'undefined') {
				return schema.default;
			}
			return 'mock string';
		case 'integer':
		case 'number':
			let num = Math.random() * 100;
			if (typeof schema.minimum !== 'undefined') num = Math.max(num, schema.minimum);
			if (typeof schema.maximum !== 'undefined') num = Math.min(num, schema.maximum);
			if (schema.type === 'integer') num = Math.floor(num);
			if (typeof schema.multipleOf !== 'undefined') num = Math.floor(num / schema.multipleOf) * schema.multipleOf; // Simple approach
			if (schema.enum) {
				return schema.enum[Math.floor(Math.random() * schema.enum.length)];
			}
			if (typeof schema.default !== 'undefined') {
				return schema.default;
			}
			return num;
		case 'boolean':
			return Math.random() > 0.5;
		default:
			return null;
	}
}

/**
 * Generates mock responses for all endpoints in an OpenAPI specification.
 * @param {object} openApiSpec - The parsed OpenAPI specification.
 * @param {object} [config] - The loaded configuration for custom logic.
 * @returns {object} - An object mapping endpoint paths to their mock responses.
 */
function generateMockResponses(openApiSpec, config = {}) {
	const mockResponses = {};
	const customLogicForEndpoints = config.endpoints || {};

	if (!openApiSpec.paths) {
		return mockResponses;
	}

	for (const path in openApiSpec.paths) {
		for (const method in openApiSpec.paths[path]) {
			const endpointKey = `${method.toUpperCase()} ${path}`;
			const endpointDef = openApiSpec.paths[path][method];

			// Check for custom handler for this specific endpoint
			if (customLogicForEndpoints[endpointKey] && typeof customLogicForEndpoints[endpointKey] === 'function') {
				mockResponses[endpointKey] = customLogicForEndpoints[endpointKey](endpointDef, openApiSpec);
				continue;
			}

			// Find a successful response (e.g., 200, 201)
			let successResponseSchema;
			let statusCode = '200'; // Default success code

			if (endpointDef.responses) {
				const codes = Object.keys(endpointDef.responses).sort();
				for (const code of codes) {
					if (code.startsWith('2')) { // 2xx responses
						const responseDef = endpointDef.responses[code];
						if (responseDef.content && responseDef.content['application/json'] && responseDef.content['application/json'].schema) {
							successResponseSchema = responseDef.content['application/json'].schema;
							statusCode = code;
							break;
						}
					}
				}
			}

			if (successResponseSchema) {
				mockResponses[endpointKey] = {
					status: parseInt(statusCode),
					body: generateDataFromSchema(successResponseSchema, config.customFieldGenerators),
				};
			} else {
				// Fallback if no suitable schema is found
				mockResponses[endpointKey] = {
					status: parseInt(statusCode),
					body: { message: "Mock response: No schema found for success response." }
				};
			}
		}
	}
	return mockResponses;
}

module.exports = {
	generateDataFromSchema,
	generateMockResponses,
};
