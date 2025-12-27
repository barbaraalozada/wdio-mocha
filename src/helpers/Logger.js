/**
 * Logger Helper
 * Provides logging functionality for info, warn, and error messages
 */

class Logger {
  /**
     * Log info message
     * @param {string} message - Info message to log
     */
  static info(message) {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
  }

  /**
     * Log warning message
     * @param {string} message - Warning message to log
     */
  static warn(message) {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`);
  }

  /**
     * Log error message
     * @param {string} message - Error message to log
     * @param {Error} [error] - Optional error object for stack trace
     */
  static error(message, error = null) {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
    if (error && error.stack) {
      console.error(error.stack);
    }
  }

  /**
     * Log debug message
     * @param {string} message - Debug message to log
     */
  static debug(message) {
    if (process.env.DEBUG === 'true') {
      console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`);
    }
  }

  /**
     * Log step message (for test steps)
     * @param {string} message - Step message to log
     */
  static step(message) {
    console.log(`[STEP] ${new Date().toISOString()} - ${message}`);
  }
}

export default Logger;
