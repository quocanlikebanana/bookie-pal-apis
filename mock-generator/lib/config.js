// Handles loading and processing of the configuration file for custom logic.

const fs = require('fs').promises;
const path = require('path');

/**
 * Loads and validates the custom configuration file.
 * The configuration file should be a Node.js module (e.g., a .js file).
 * @param {string} configPath - Absolute or relative path to the configuration file.
 * @returns {Promise<object>} - The loaded configuration object.
 */
async function loadConfig(configPath) {
	if (!configPath) {
		return {}; // No custom config provided
	}

	const absoluteConfigPath = path.resolve(configPath);
	try {
		await fs.access(absoluteConfigPath); // Check if file exists
	} catch (error) {
		console.warn(`Configuration file not found at ${absoluteConfigPath}. Proceeding without custom configuration.`);
		return {};
	}

	try {
		const configModule = require(absoluteConfigPath); // Dynamically require the config module

		// Validate basic structure
		if (typeof configModule !== 'object' || configModule === null) {
			console.warn(`Config file at ${absoluteConfigPath} did not export an object. Proceeding without custom configuration.`);
			return {};
		}

		if (configModule.endpoints && typeof configModule.endpoints !== 'object') {
			console.warn(`Invalid 'endpoints' configuration in ${absoluteConfigPath}. It should be an object. Ignoring 'endpoints' config.`);
			delete configModule.endpoints;
		}

		if (configModule.customFieldGenerators && typeof configModule.customFieldGenerators !== 'object') {
			console.warn(`Invalid 'customFieldGenerators' configuration in ${absoluteConfigPath}. It should be an object. Ignoring 'customFieldGenerators' config.`);
			delete configModule.customFieldGenerators;
		}

		// Further validation for customFieldGenerators sub-properties
		if (configModule.customFieldGenerators) {
			const { fieldName, format, type } = configModule.customFieldGenerators;
			if (fieldName && typeof fieldName !== 'object') {
				console.warn(`Invalid 'customFieldGenerators.fieldName' in ${absoluteConfigPath}. It should be an object. Ignoring.`);
				delete configModule.customFieldGenerators.fieldName;
			}
			if (format && typeof format !== 'object') {
				console.warn(`Invalid 'customFieldGenerators.format' in ${absoluteConfigPath}. It should be an object. Ignoring.`);
				delete configModule.customFieldGenerators.format;
			}
			if (type && typeof type !== 'object') {
				console.warn(`Invalid 'customFieldGenerators.type' in ${absoluteConfigPath}. It should be an object. Ignoring.`);
				delete configModule.customFieldGenerators.type;
			}
		}

		if (configModule.globalSettings && typeof configModule.globalSettings !== 'object') {
			console.warn(`Invalid 'globalSettings' configuration in ${absoluteConfigPath}. It should be an object. Ignoring 'globalSettings' config.`);
			delete configModule.globalSettings;
		}

		return configModule || {};
	} catch (error) {
		console.error(`Error loading configuration from ${absoluteConfigPath}:`, error);
		throw new Error(`Failed to load configuration file: ${configPath}`);
	}
}

module.exports = {
	loadConfig,
};

/*
Example structure for a mock-config.js:

module.exports = {
  // Custom logic for specific endpoints
  // Key: "METHOD /path/template", e.g., "GET /users/{id}"
  endpoints: {
	"GET /users/{id}": (endpointDefinition, openApiSpec) => {
	  // endpointDefinition is the OpenAPI definition for this specific endpoint
	  // openApiSpec is the full parsed OpenAPI spec
	  return {
		status: 200,
		body: {
		  id: "custom-id-123",
		  name: "Custom User Name",
		  email: "custom@example.com",
		  // You can use parts of the generator or write fully custom logic
		}
	  };
	},
	"POST /items": () => {
	  return {
		status: 201,
		headers: {
		  "X-Custom-Header": "CreatedValue"
		},
		body: {
		  itemId: \`item_\${Date.now()}\`,
		  message: "Item created with custom logic"
		}
	  }
	}
  },

  // Custom generators for specific schema field names or formats
  // These can be used by the default data generator
  customFieldGenerators: {
	// Example: always return a specific string for any field named 'username'
	fieldName: {
	  "username": () => "testuser123"
	},
	// Example: custom generator for a specific format
	format: {
	  "custom-phone-number": () => \`+1-\${Math.floor(100 + Math.random() * 900)}-\${Math.floor(100 + Math.random() * 900)}-\${Math.floor(1000 + Math.random() * 9000)}\`
	},
	// Example: custom generator for a specific type (less common to override globally like this)
	// type: {
	//   "string": () => "globally overridden string"
	// }
  },

  // Global settings (if any)
  // globalSettings: {
  //   defaultArraySize: 5,
  // }
};

*/
