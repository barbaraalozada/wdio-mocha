import Logger from '../helpers/Logger.js';

import BaseElement from './BaseElement.js';

/**
 * TextArea Element class
 * Represents textarea elements for multi-line text input
 */
class TextArea extends BaseElement {
  /**
     * @param {string} selector - TextArea selector
     * @param {string} name - TextArea name for logging
     */
  constructor(selector, name = '') {
    super(selector, name || 'TextArea');
  }

  /**
     * Set value in textarea
     * @param {string} value - Value to set
     * @returns {Promise<void>}
     */
  async setValue(value) {
    Logger.info(`Setting value in textarea "${this.name}"`);
    await this.state().waitForDisplayed({ timeout: 5000 });
    await this.element.setValue(value);
  }

  /**
     * Add value to existing textarea value
     * @param {string} value - Value to add
     * @returns {Promise<void>}
     */
  async addValue(value) {
    Logger.info(`Adding value to textarea "${this.name}"`);
    await this.state().waitForDisplayed({ timeout: 5000 });
    await this.element.addValue(value);
  }

  /**
     * Clear textarea
     * @returns {Promise<void>}
     */
  async clear() {
    Logger.info(`Clearing textarea "${this.name}"`);
    await this.state().waitForDisplayed({ timeout: 5000 });
    await this.element.clearValue();
  }

  /**
     * Get current value of textarea
     * @returns {Promise<string>}
     */
  async getValue() {
    Logger.debug(`Getting value from textarea "${this.name}"`);
    return await this.element.getValue();
  }

  /**
     * Get number of rows
     * @returns {Promise<string>}
     */
  async getRows() {
    return await this.getAttribute('rows');
  }

  /**
     * Get number of columns
     * @returns {Promise<string>}
     */
  async getCols() {
    return await this.getAttribute('cols');
  }

  /**
     * Get max length
     * @returns {Promise<string>}
     */
  async getMaxLength() {
    return await this.getAttribute('maxlength');
  }

  /**
     * Get placeholder text
     * @returns {Promise<string>}
     */
  async getPlaceholder() {
    return await this.getAttribute('placeholder');
  }

  /**
     * Check if textarea is read-only
     * @returns {Promise<boolean>}
     */
  async isReadOnly() {
    const readonly = await this.getAttribute('readonly');
    return readonly !== null;
  }

  /**
     * Get character count
     * @returns {Promise<number>}
     */
  async getCharacterCount() {
    const value = await this.getValue();
    return value.length;
  }
}

export default TextArea;
