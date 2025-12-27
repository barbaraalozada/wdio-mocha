import Logger from '../helpers/Logger.js';

import BaseElement from './BaseElement.js';

/**
 * Image Element class
 * Represents image elements
 */
class Image extends BaseElement {
  /**
     * @param {string} selector - Image selector
     * @param {string} name - Image name for logging
     */
  constructor(selector, name = '') {
    super(selector, name || 'Image');
  }

  /**
     * Get image source URL
     * @returns {Promise<string>}
     */
  async getSrc() {
    Logger.debug(`Getting src from image "${this.name}"`);
    return await this.getAttribute('src');
  }

  /**
     * Get alt text
     * @returns {Promise<string>}
     */
  async getAltText() {
    return await this.getAttribute('alt');
  }

  /**
     * Get title attribute
     * @returns {Promise<string>}
     */
  async getTitle() {
    return await this.getAttribute('title');
  }

  /**
     * Check if image is loaded
     * @returns {Promise<boolean>}
     */
  async isLoaded() {
    const complete = await this.element.execute((el) => el.complete);
    const naturalHeight = await this.element.execute((el) => el.naturalHeight);
    return complete && naturalHeight > 0;
  }

  /**
     * Get image dimensions
     * @returns {Promise<{width: number, height: number}>}
     */
  async getDimensions() {
    const width = await this.element.execute((el) => el.naturalWidth);
    const height = await this.element.execute((el) => el.naturalHeight);
    return { width, height };
  }

  /**
     * Click on image
     * @returns {Promise<void>}
     */
  async click() {
    Logger.info(`Clicking image "${this.name}"`);
    await this.state().waitForClickable({ timeout: 5000 });
    await this.element.click();
  }

  /**
     * Wait for image to load
     * @param {number} timeout - Timeout in milliseconds
     * @returns {Promise<void>}
     */
  async waitForLoad(timeout = 10000) {
    Logger.debug(`Waiting for image "${this.name}" to load`);
    await browser.waitUntil(
      async () => await this.isLoaded(),
      {
        timeout,
        timeoutMsg: `Image "${this.name}" did not load within ${timeout}ms`
      }
    );
  }
}

export default Image;
