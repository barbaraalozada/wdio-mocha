import Logger from '../helpers/Logger.js';

/**
 * Browser class
 * Contains common methods for browser management
 */
class Browser {
  /**
     * Navigate to a URL
     * @param {string} url - URL to navigate to
     * @returns {Promise<void>}
     */
  static async navigateTo (url) {
    Logger.info(`Navigating to URL: ${url}`);
    await browser.url(url);
  }

  /**
     * Get current URL
     * @returns {Promise<string>}
     */
  static async getUrl () {
    const url = await browser.getUrl();
    Logger.debug(`Current URL: ${url}`);
    return url;
  }

  /**
     * Get page title
     * @returns {Promise<string>}
     */
  static async getTitle () {
    const title = await browser.getTitle();
    Logger.debug(`Page title: ${title}`);
    return title;
  }

  /**
     * Refresh the page
     * @returns {Promise<void>}
     */
  static async refresh () {
    Logger.info('Refreshing page');
    await browser.refresh();
  }

  /**
     * Navigate back in browser history
     * @returns {Promise<void>}
     */
  static async back () {
    Logger.info('Navigating back');
    await browser.back();
  }

  /**
     * Navigate forward in browser history
     * @returns {Promise<void>}
     */
  static async forward () {
    Logger.info('Navigating forward');
    await browser.forward();
  }

  /**
     * Maximize browser window
     * @returns {Promise<void>}
     */
  static async maximizeWindow () {
    Logger.info('Maximizing window');
    await browser.maximizeWindow();
  }

  /**
     * Set browser window size
     * @param {number} width - Window width
     * @param {number} height - Window height
     * @returns {Promise<void>}
     */
  static async setWindowSize (width, height) {
    Logger.info(`Setting window size to ${width}x${height}`);
    await browser.setWindowSize(width, height);
  }

  /**
     * Get browser window size
     * @returns {Promise<{width: number, height: number}>}
     */
  static async getWindowSize () {
    const size = await browser.getWindowSize();
    Logger.debug(`Window size: ${size.width}x${size.height}`);
    return size;
  }

  /**
     * Execute JavaScript in the browser
     * @param {string|Function} script - JavaScript code to execute
     * @param  {...any} args - Arguments to pass to the script
     * @returns {Promise<any>}
     */
  static async execute (script, ...args) {
    Logger.debug('Executing JavaScript in browser');
    return await browser.execute(script, ...args);
  }

  /**
     * Wait for a specific amount of time
     * @param {number} milliseconds - Time to wait in milliseconds
     * @returns {Promise<void>}
     */
  static async pause (milliseconds) {
    Logger.debug(`Pausing for ${milliseconds}ms`);
    await browser.pause(milliseconds);
  }

  /**
     * Switch to a specific window/tab
     * @param {string} handle - Window handle
     * @returns {Promise<void>}
     */
  static async switchToWindow (handle) {
    Logger.info(`Switching to window: ${handle}`);
    await browser.switchToWindow(handle);
  }

  /**
     * Get all window handles
     * @returns {Promise<string[]>}
     */
  static async getWindowHandles () {
    const handles = await browser.getWindowHandles();
    Logger.debug(`Total windows: ${handles.length}`);
    return handles;
  }

  /**
     * Close current window/tab
     * @returns {Promise<void>}
     */
  static async closeWindow () {
    Logger.info('Closing current window');
    await browser.closeWindow();
  }

  /**
     * Create a new window/tab
     * @param {string} type - Type of window ('tab' or 'window')
     * @returns {Promise<void>}
     */
  static async newWindow (type = 'tab') {
    Logger.info(`Creating new ${type}`);
    await browser.newWindow('about:blank', { windowFeatures: type });
  }

  /**
     * Switch to frame
     * @param {number|string|WebdriverIO.Element} frame - Frame index, name, or element
     * @returns {Promise<void>}
     */
  static async switchToFrame (frame) {
    Logger.info('Switching to frame');
    await browser.switchToFrame(frame);
  }

  /**
     * Switch to parent frame
     * @returns {Promise<void>}
     */
  static async switchToParentFrame () {
    Logger.info('Switching to parent frame');
    await browser.switchToParentFrame();
  }

  /**
     * Take a screenshot
     * @param {string} filename - Optional filename for the screenshot
     * @returns {Promise<string>} Base64 encoded screenshot
     */
  static async takeScreenshot (filename = null) {
    Logger.info(filename ? `Taking screenshot: ${filename}` : 'Taking screenshot');
    const screenshot = await browser.saveScreenshot(filename || `./screenshots/screenshot-${Date.now()}.png`);
    return screenshot;
  }

  /**
     * Delete all cookies
     * @returns {Promise<void>}
     */
  static async deleteAllCookies () {
    Logger.info('Deleting all cookies');
    await browser.deleteAllCookies();
  }

  /**
     * Get all cookies
     * @returns {Promise<object[]>}
     */
  static async getCookies () {
    const cookies = await browser.getCookies();
    Logger.debug(`Total cookies: ${cookies.length}`);
    return cookies;
  }

  /**
     * Set a cookie
     * @param {object} cookie - Cookie object
     * @returns {Promise<void>}
     */
  static async setCookie (cookie) {
    Logger.info(`Setting cookie: ${cookie.name}`);
    await browser.setCookie(cookie);
  }

  /**
     * Accept alert
     * @returns {Promise<void>}
     */
  static async acceptAlert () {
    Logger.info('Accepting alert');
    await browser.acceptAlert();
  }

  /**
     * Dismiss alert
     * @returns {Promise<void>}
     */
  static async dismissAlert () {
    Logger.info('Dismissing alert');
    await browser.dismissAlert();
  }

  /**
     * Get alert text
     * @returns {Promise<string>}
     */
  static async getAlertText () {
    const text = await browser.getAlertText();
    Logger.debug(`Alert text: ${text}`);
    return text;
  }

  /**
     * Send text to alert
     * @param {string} text - Text to send
     * @returns {Promise<void>}
     */
  static async sendAlertText (text) {
    Logger.info(`Sending text to alert: ${text}`);
    await browser.sendAlertText(text);
  }

  /**
     * Scroll to specific coordinates
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @returns {Promise<void>}
     */
  static async scroll (x, y) {
    Logger.debug(`Scrolling to coordinates: (${x}, ${y})`);
    await browser.execute((x, y) => window.scrollTo(x, y), x, y);
  }

  /**
     * Get browser logs
     * @param {string} type - Log type (e.g., 'browser', 'driver')
     * @returns {Promise<object[]>}
     */
  static async getLogs (type = 'browser') {
    Logger.debug(`Getting ${type} logs`);
    return await browser.getLogs(type);
  }

  /**
     * Wait until condition is met
     * @param {Function} condition - Condition function
     * @param {object} options - Wait options (timeout, interval)
     * @returns {Promise<boolean>}
     */
  static async waitUntil (condition, options = {}) {
    Logger.debug('Waiting until condition is met');
    await browser.waitUntil(condition, {
      timeout: options.timeout || 5000,
      interval: options.interval || 500,
      timeoutMsg: options.timeoutMsg || 'Condition was not met in time'
    });
    return true;
  }
}

export default Browser;
