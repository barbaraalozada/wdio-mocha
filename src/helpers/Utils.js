/**
 * Utility Helper Functions
 * Common helper functions used across tests
 */

class Utils {
  /**
     * Generate random string
     * @param {number} length - Length of string
     * @returns {string} Random string
     */
  static generateRandomString(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
     * Generate random email
     * @returns {string} Random email address
     */
  static generateRandomEmail() {
    return `test_${this.generateRandomString(8)}@test.com`;
  }

  /**
     * Wait for a specific time
     * @param {number} ms - Milliseconds to wait
     */
  static async wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
     * Get current timestamp
     * @returns {string} Current timestamp
     */
  static getTimestamp() {
    return new Date().toISOString();
  }

  /**
     * Format date to specific format
     * @param {Date} date - Date object
     * @returns {string} Formatted date (YYYY-MM-DD)
     */
  static formatDate(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
     * Take screenshot
     * @param {string} filename - Screenshot filename
     */
  static async takeScreenshot(filename) {
    const timestamp = Date.now();
    await browser.saveScreenshot(`./reports/${filename}_${timestamp}.png`);
  }
}

export default Utils;
