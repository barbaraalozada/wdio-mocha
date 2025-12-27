import Logger from '../helpers/Logger.js';

import BaseElement from './BaseElement.js';

/**
 * RadioButton Element class
 * Represents radio button input elements
 */
class RadioButton extends BaseElement {
  /**
     * @param {string} selector - Radio button selector
     * @param {string} name - Radio button name for logging
     */
  constructor(selector, name = '') {
    super(selector, name || 'RadioButton');
  }

  /**
     * Select the radio button
     * @returns {Promise<void>}
     */
  async select() {
    const isSelected = await this.isSelected();
    if (!isSelected) {
      Logger.info(`Selecting radio button "${this.name}"`);
      await this.state().waitForClickable({ timeout: 5000 });
      await this.element.click();
    } else {
      Logger.debug(`Radio button "${this.name}" is already selected`);
    }
  }

  /**
     * Check if radio button is selected
     * @returns {Promise<boolean>}
     */
  async isSelected() {
    return await this.element.isSelected();
  }

  /**
     * Get value attribute
     * @returns {Promise<string>}
     */
  async getValue() {
    return await this.getAttribute('value');
  }

  /**
     * Get name attribute (radio group name)
     * @returns {Promise<string>}
     */
  async getGroupName() {
    return await this.getAttribute('name');
  }
}

export default RadioButton;
