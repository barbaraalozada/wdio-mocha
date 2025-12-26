import BaseElement from './BaseElement.js';
import Logger from '../helpers/Logger.js';

/**
 * Dropdown Element class
 * Represents select/dropdown elements
 */
class Dropdown extends BaseElement {
    /**
     * @param {string} selector - Dropdown selector
     * @param {string} name - Dropdown name for logging
     */
    constructor(selector, name = '') {
        super(selector, name || 'Dropdown');
    }

    /**
     * Select option by visible text
     * @param {string} text - Visible text of option
     * @returns {Promise<void>}
     */
    async selectByText(text) {
        Logger.info(`Selecting option "${text}" in dropdown "${this.name}"`);
        await this.state().waitForDisplayed({ timeout: 5000 });
        await this.element.selectByVisibleText(text);
    }

    /**
     * Select option by value attribute
     * @param {string} value - Value attribute of option
     * @returns {Promise<void>}
     */
    async selectByValue(value) {
        Logger.info(`Selecting option with value "${value}" in dropdown "${this.name}"`);
        await this.state().waitForDisplayed({ timeout: 5000 });
        await this.element.selectByAttribute('value', value);
    }

    /**
     * Select option by index
     * @param {number} index - Index of option (0-based)
     * @returns {Promise<void>}
     */
    async selectByIndex(index) {
        Logger.info(`Selecting option at index ${index} in dropdown "${this.name}"`);
        await this.state().waitForDisplayed({ timeout: 5000 });
        await this.element.selectByIndex(index);
    }

    /**
     * Get selected option text
     * @returns {Promise<string>}
     */
    async getSelectedText() {
        Logger.debug(`Getting selected text from dropdown "${this.name}"`);
        const selectedOption = await this.element.$('option:checked');
        return await selectedOption.getText();
    }

    /**
     * Get selected option value
     * @returns {Promise<string>}
     */
    async getSelectedValue() {
        Logger.debug(`Getting selected value from dropdown "${this.name}"`);
        return await this.getValue();
    }

    /**
     * Get all option texts
     * @returns {Promise<string[]>}
     */
    async getAllOptions() {
        Logger.debug(`Getting all options from dropdown "${this.name}"`);
        const options = await this.element.$$('option');
        const optionTexts = [];
        for (const option of options) {
            optionTexts.push(await option.getText());
        }
        return optionTexts;
    }

    /**
     * Get all option values
     * @returns {Promise<string[]>}
     */
    async getAllOptionValues() {
        Logger.debug(`Getting all option values from dropdown "${this.name}"`);
        const options = await this.element.$$('option');
        const optionValues = [];
        for (const option of options) {
            optionValues.push(await option.getAttribute('value'));
        }
        return optionValues;
    }

    /**
     * Check if option exists by text
     * @param {string} text - Option text to check
     * @returns {Promise<boolean>}
     */
    async hasOption(text) {
        const options = await this.getAllOptions();
        return options.includes(text);
    }
}

export default Dropdown;
