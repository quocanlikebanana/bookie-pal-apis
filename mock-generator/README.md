# OpenAPI Mock Generator

This library reads an OpenAPI specification and generates mock JSON data responses for each endpoint.
It supports custom logic configuration through a settings file.

## Usage

\`\`\`javascript
const { generateMocks } = require('./index'); // Adjust path as necessary

async function main() {
const openApiSpecPath = 'path/to/your/openapi.json'; // or .yml
const customConfigPath = 'path/to/your/mock-config.js'; // optional

try {
const mocks = await generateMocks(openApiSpecPath, customConfigPath);
console.log(JSON.stringify(mocks, null, 2));
} catch (error) {
console.error("Error generating mocks:", error);
}
}

main();
\`\`\`

## Configuration

The library supports a `mock-config.js` file (you can name it differently and pass its path) to customize mock generation. This file should be a Node.js module exporting an object with the following optional properties:

```javascript
module.exports = {
  // 1. Custom logic for specific endpoints
  // Key: "METHOD /path/template", e.g., "GET /users/{id}"
  // Value: A function that receives (endpointDefinition, openApiSpec) and returns a complete mock response object.
  endpoints: {
    "GET /users/{id}": (endpointDefinition, openApiSpec) => {
      // endpointDefinition is the OpenAPI definition for this specific endpoint
      // openApiSpec is the full parsed OpenAPI spec
      return {
        status: 200,
        headers: { "X-Custom-Header": "MyValue" }, // Optional headers
        body: {
          id: `user-${Math.random().toString(36).substring(7)}`,
          name: "Custom Generated User Name",
          email: "custom.user@example.com",
          // You can use parts of the generator or write fully custom logic
        },
      };
    },
    "POST /items": () => {
      return {
        status: 201,
        body: {
          itemId: `item_${Date.now()}`,
          message: "Item created with specific custom logic",
        },
      };
    },
  },

  // 2. Custom generators for specific schema field names, formats, or types
  // These are used by the default data generator if no endpoint-specific override exists.
  customFieldGenerators: {
    // 2a. fieldName: Override generation for any field with a specific name.
    // Key: The exact field name (string)
    // Value: A function that receives the schema for that field and returns the mock value.
    fieldName: {
      username: (schema) => "hardcoded_username",
      transactionId: (schema) => `txn_${new Date().getTime()}`,
    },

    // 2b. format: Override generation for any field with a specific format (e.g., "email", "uuid", "date-time", or custom formats).
    // Key: The format string (e.g., "email", "custom-phone-number")
    // Value: A function that receives the schema for that field and returns the mock value.
    format: {
      email: (schema) =>
        `test-${Math.random().toString(36).substring(2, 7)}@example.dev`,
      "custom-internal-id": (schema) => {
        const prefix =
          schema.description && schema.description.includes("user")
            ? "USR"
            : "GEN";
        return `${prefix}_${Math.floor(10000 + Math.random() * 90000)}`;
      },
    },

    // 2c. type: Override generation for any field of a specific OpenAPI type (e.g., "string", "integer", "boolean").
    // This is a broader override and should be used carefully.
    // Key: The OpenAPI type string (e.g., "string", "number")
    // Value: A function that receives the schema for that field and returns the mock value.
    type: {
      // "string": (schema) => "[[Globally Overridden String]]",
      boolean: (schema) => Math.random() > 0.75, // Make booleans true 25% of the time
    },
  },

  // 3. Global settings for the mock generator
  globalSettings: {
    // defaultArraySize: Control the number of items generated for arrays when not specified by minItems/maxItems.
    // If not set, a random size between 1 and 3 is usually used.
    defaultArraySize: 2,
  },
};
```

### How Configuration is Applied:

1.  **Endpoint Specificity**: If a handler is defined in `endpoints` for a specific `METHOD /path`, that function is solely responsible for generating the entire response (status, headers, body) for that endpoint. `customFieldGenerators` are NOT automatically applied within an `endpoints` custom function unless you explicitly call `generateDataFromSchema` from within it.
2.  **Custom Field Generators**: If no specific `endpoints` handler matches, the library generates data based on the OpenAPI schema. During this process:
    - It first checks `customFieldGenerators.fieldName`.
    - If no match, it checks `customFieldGenerators.format`.
    - If no match, it checks `customFieldGenerators.type`.
    - If still no match, it uses its internal default logic for the schema type.
3.  **Global Settings**: These apply generally unless overridden by more specific schema constraints (like `minItems` on an array).
