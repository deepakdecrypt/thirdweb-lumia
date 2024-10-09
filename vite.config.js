// Import the necessary modules
const { defineConfig } = require('vite');
const { nodePolyfills } = require('vite-plugin-node-polyfills');
const react = require('@vitejs/plugin-react');

// Export the configuration using `defineConfig`
module.exports = defineConfig({
    plugins: [react(), nodePolyfills()]
});