import Logger from '../helpers/Logger.js';

import BaseElement from './BaseElement.js';

/**
 * Checkbox Element class
 * Represents checkbox input elements
 */
class Checkbox extends BaseElement {
  /**
     * @param {string} selector - Checkbox selector
     * @param {string} name - Checkbox name for logging
     */
  constructor(selector, name = '') {
    super(selector, name || 'Checkbox');
  }

  /**
     * Check the checkbox
     * @returns {Promise<void>}
     */
  async check() {
    const isChecked = await this.isChecked();
    if (!isChecked) {
      Logger.info(`Checking checkbox "${this.name}"`);
      await this.state().waitForClickable({ timeout: 5000 });
      await this.element.click();
    } else {
      Logger.debug(`Checkbox "${this.name}" is already checked`);
    }
  }

  /**
     * Uncheck the checkbox
     * @returns {Promise<void>}
     */
  async uncheck() {
    const isChecked = await this.isChecked();
    if (isChecked) {
      Logger.info(`Unchecking checkbox "${this.name}"`);
      await this.state().waitForClickable({ timeout: 5000 });
      await this.element.click();
    } else {
      Logger.debug(`Checkbox "${this.name}" is already unchecked`);
    }
  }

  /**
     * Toggle checkbox state
     * @returns {Promise<void>}
     */
  async toggle() {
    Logger.info(`Toggling checkbox "${this.name}"`);
    await this.state().waitForClickable({ timeout: 5000 });
    await this.element.click();
  }

  /**
     * Check if checkbox is checked
     * @returns {Promise<boolean>}
     */
  async isChecked() {
    return await this.element.isSelected();
  }

  /**
     * Set checkbox to specific state
     * @param {boolean} shouldBeChecked - Desired state
     * @returns {Promise<void>}
     */
  async setState(shouldBeChecked) {
    if (shouldBeChecked) {
      await this.check();
    } else {
      await this.uncheck();
    }
  }
}

export default Checkbox;
