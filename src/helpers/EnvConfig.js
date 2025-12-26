/**
 * Environment Configuration Helper
 * Access environment variables with fallback values
 */

class EnvConfig {
    /**
     * Get base URL
     * @returns {string} Base URL
     */
    static getBaseUrl() {
        return process.env.BASE_URL || 'https://the-internet.herokuapp.com';
    }

    /**
     * Get test username
     * @returns {string} Username
     * @throws {Error} If TEST_USERNAME environment variable is not set
     */
    static getUsername() {
        const username = process.env.TEST_USERNAME;
        if (!username) {
            throw new Error('TEST_USERNAME environment variable is required');
        }
        return username;
    }

    /**
     * Get test password
     * @returns {string} Password
     * @throws {Error} If TEST_PASSWORD environment variable is not set
     */
    static getPassword() {
        const password = process.env.TEST_PASSWORD;
        if (!password) {
            throw new Error('TEST_PASSWORD environment variable is required');
        }
        return password;
    }

    /**
     * Get browser name
     * @returns {string} Browser name
     */
    static getBrowser() {
        return process.env.BROWSER || 'chrome';
    }

    /**
     * Check if headless mode is enabled
     * @returns {boolean} True if headless
     */
    static isHeadless() {
        return process.env.HEADLESS === 'true';
    }

    /**
     * Get environment name
     * @returns {string} Environment (dev, staging, production)
     */
    static getEnvironment() {
        return process.env.ENVIRONMENT || 'staging';
    }

    /**
     * Get default timeout
     * @returns {number} Timeout in milliseconds
     */
    static getDefaultTimeout() {
        return parseInt(process.env.DEFAULT_TIMEOUT) || 10000;
    }

    /**
     * Get API base URL
     * @returns {string} API base URL
     */
    static getApiBaseUrl() {
        return process.env.API_BASE_URL || 'https://api.example.com';
    }

    /**
     * Get API key
     * @returns {string} API key
     * @throws {Error} If API_KEY environment variable is not set
     */
    static getApiKey() {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            throw new Error('API_KEY environment variable is required');
        }
        return apiKey;
    }

    /**
     * Get API token
     * @returns {string} API token
     * @throws {Error} If API_TOKEN environment variable is not set
     */
    static getApiToken() {
        const apiToken = process.env.API_TOKEN;
        if (!apiToken) {
            throw new Error('API_TOKEN environment variable is required');
        }
        return apiToken;
    }

    /**
     * Check if screenshots should be saved
     * @returns {boolean} True if screenshots should be saved
     */
    static shouldSaveScreenshots() {
        return process.env.SAVE_SCREENSHOTS === 'true';
    }

    /**
     * Get report path
     * @returns {string} Report path
     */
    static getReportPath() {
        return process.env.REPORT_PATH || './reports';
    }
}

export default EnvConfig;
