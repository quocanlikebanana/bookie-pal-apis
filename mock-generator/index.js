// Main entry point for the OpenAPI mock generator library

const { parseOpenApiSpec } = require('./lib/parser');
const { loadConfig } = require('./lib/config');
const { generateMockResponses } = require('./lib/generator');

/**
 * Generates mock responses based on an OpenAPI specification.
 * @param {string} openApiSpecPath - Path to the OpenAPI specification file.
 * @param {string} [configPath] - Optional path to a configuration file for custom logic.
 * @returns {Promise<object>} - An object mapping endpoint paths to their mock responses.
 */
async function generateMocks(openApiSpecPath, configPath) {
	if (!openApiSpecPath) {
		throw new Error('OpenAPI specification path is required.');
	}

	try {
		console.log(`Parsing OpenAPI spec from: ${openApiSpecPath}`);
		const spec = await parseOpenApiSpec(openApiSpecPath);

		let config = {};
		if (configPath) {
			console.log(`Loading custom config from: ${configPath}`);
			config = await loadConfig(configPath);
		}

		console.log('Generating mock responses...');
		const mocks = generateMockResponses(spec, config);
		console.log('Mock generation complete.');
		return mocks;
	} catch (error) {
		console.error('Error during mock generation process:', error);
		throw error; // Re-throw the error to be handled by the caller
	}
}

module.exports = {
	generateMocks,
};
