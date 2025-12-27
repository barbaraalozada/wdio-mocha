import Logger from '../helpers/Logger.js';

import BaseElement from './BaseElement.js';

/**
 * Button Element class
 * Represents button elements with click functionality
 */
class Button extends BaseElement {
  /**
     * @param {string} selector - Button selector
     * @param {string} name - Button name for logging
     */
  constructor(selector, name = '') {
    super(selector, name || 'Button');
  }

  /**
     * Click the button
     * @param {object} options - Click options
     * @returns {Promise<void>}
     */
  async click(options = {}) {
    Logger.info(`Clicking button "${this.name}"`);
    await this.state().waitForClickable({ timeout: 5000 });
    await this.element.click(options);
  }

  /**
     * Double click the button
     * @returns {Promise<void>}
     */
  async doubleClick() {
    Logger.info(`Double clicking button "${this.name}"`);
    await this.state().waitForClickable({ timeout: 5000 });
    await this.element.doubleClick();
  }

  /**
     * Check if button is enabled
     * @returns {Promise<boolean>}
     */
  async isEnabled() {
    return await this.state().isEnabled();
  }

  /**
     * Check if button is disabled
     * @returns {Promise<boolean>}
     */
  async isDisabled() {
    const enabled = await this.isEnabled();
    return !enabled;
  }

  /**
     * Wait for button to be enabled
     * @param {number} timeout - Timeout in milliseconds
     * @returns {Promise<void>}
     */
  async waitForEnabled(timeout = 5000) {
    Logger.debug(`Waiting for button "${this.name}" to be enabled`);
    await this.element.waitForEnabled({ timeout });
  }
}

export default Button;
