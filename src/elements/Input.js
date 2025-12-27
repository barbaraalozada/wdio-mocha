import Logger from '../helpers/Logger.js';

import BaseElement from './BaseElement.js';

/**
 * Input Element class
 * Represents input fields with text entry functionality
 */
class Input extends BaseElement {
  /**
     * @param {string} selector - Input selector
     * @param {string} name - Input name for logging
     */
  constructor(selector, name = '') {
    super(selector, name || 'Input');
  }

  /**
     * Set value in input field
     * @param {string} value - Value to set
     * @returns {Promise<void>}
     */
  async setValue(value) {
    Logger.info(`Setting value "${value}" in input "${this.name}"`);
    await this.state().waitForDisplayed({ timeout: 5000 });
    await this.element.setValue(value);
  }

  /**
     * Add value to existing input value
     * @param {string} value - Value to add
     * @returns {Promise<void>}
     */
  async addValue(value) {
    Logger.info(`Adding value "${value}" to input "${this.name}"`);
    await this.state().waitForDisplayed({ timeout: 5000 });
    await this.element.addValue(value);
  }

  /**
     * Clear input field
     * @returns {Promise<void>}
     */
  async clear() {
    Logger.info(`Clearing input "${this.name}"`);
    await this.state().waitForDisplayed({ timeout: 5000 });
    await this.element.clearValue();
  }

  /**
     * Get current value of input
     * @returns {Promise<string>}
     */
  async getValue() {
    Logger.debug(`Getting value from input "${this.name}"`);
    return await this.element.getValue();
  }

  /**
     * Type value slowly (character by character)
     * @param {string} value - Value to type
     * @param {number} delay - Delay between keystrokes in ms
     * @returns {Promise<void>}
     */
  async type(value, delay = 100) {
    Logger.info(`Typing value in input "${this.name}"`);
    await this.clear();
    for (const char of value) {
      await this.addValue(char);
      await browser.pause(delay);
    }
  }

  /**
     * Check if input is read-only
     * @returns {Promise<boolean>}
     */
  async isReadOnly() {
    const readonly = await this.getAttribute('readonly');
    return readonly !== null;
  }

  /**
     * Get placeholder text
     * @returns {Promise<string>}
     */
  async getPlaceholder() {
    return await this.getAttribute('placeholder');
  }
}

export default Input;
