// Example script to run the OpenAPI mock generator

const path = require('path');
const { generateMocks } = require('./index');

async function main() {
	// Use an absolute path or resolve a relative path to your OpenAPI spec
	const openApiSpecPath = path.resolve(__dirname, '../cms/profile.yml');
	// const customConfigPath = path.resolve(__dirname, 'your-mock-config.js'); // Optional: uncomment and set your config file path

	try {
		console.log(`Attempting to generate mocks for: ${openApiSpecPath}`);
		// const mocks = await generateMocks(openApiSpecPath, customConfigPath); // Use this line if you have a config file
		const mocks = await generateMocks(openApiSpecPath); // Use this line if you don't have a config file yet
		console.log('\nGenerated Mocks:');
		console.log(JSON.stringify(mocks, null, 2));
	} catch (error) {
		console.error("\nError generating mocks:", error);
		process.exit(1); // Exit with error code if generation fails
	}
}

main();
