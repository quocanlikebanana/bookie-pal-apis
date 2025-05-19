// Handles parsing of the OpenAPI specification

const fs = require('fs').promises;
const yaml = require('js-yaml'); // You might need to install this: npm install js-yaml
const path = require('path');

/**
 * Parses an OpenAPI specification file (JSON or YAML).
 * @param {string} specPath - Absolute or relative path to the OpenAPI spec file.
 * @returns {Promise<object>} - The parsed OpenAPI specification object.
 */
async function parseOpenApiSpec(specPath) {
	const absoluteSpecPath = path.resolve(specPath);
	const fileContent = await fs.readFile(absoluteSpecPath, 'utf8');
	const extension = path.extname(absoluteSpecPath).toLowerCase();

	if (extension === '.json') {
		return JSON.parse(fileContent);
	} else if (extension === '.yaml' || extension === '.yml') {
		return yaml.load(fileContent);
	} else {
		throw new Error(`Unsupported file extension: ${extension}. Please use .json, .yaml, or .yml.`);
	}
}

module.exports = {
	parseOpenApiSpec,
};
