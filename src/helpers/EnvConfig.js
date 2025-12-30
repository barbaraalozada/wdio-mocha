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
     * Get login username
     * @returns {string} Username
     * @throws {Error} If LOGIN_USERNAME environment variable is not set
     */
  static getLoginUsername() {
    const username = process.env.LOGIN_USERNAME;
    if (!username) {
      throw new Error('LOGIN_USERNAME environment variable is required');
    }
    return username;
  }

  /**
     * Get login password
     * @returns {string} Password
     * @throws {Error} If LOGIN_PASSWORD environment variable is not set
     */
  static getLoginPassword() {
    const password = process.env.LOGIN_PASSWORD;
    if (!password) {
      throw new Error('LOGIN_PASSWORD environment variable is required');
    }
    return password;
  }

  /**
     * Get default timeout
     * @returns {number} Timeout in milliseconds
     */
  static getDefaultTimeout() {
    return parseInt(process.env.DEFAULT_TIMEOUT) || 10000;
  }
}

export default EnvConfig;
