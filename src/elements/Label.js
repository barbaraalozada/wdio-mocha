import BaseElement from './BaseElement.js';
import Logger from '../helpers/Logger.js';

/**
 * Label Element class
 * Represents label elements
 */
class Label extends BaseElement {
    /**
     * @param {string} selector - Label selector
     * @param {string} name - Label name for logging
     */
    constructor(selector, name = '') {
        super(selector, name || 'Label');
    }

    /**
     * Get label text
     * @returns {Promise<string>}
     */
    async getText() {
        Logger.debug(`Getting text from label "${this.name}"`);
        await this.state().waitForDisplayed({ timeout: 5000 });
        return await this.element.getText();
    }

    /**
     * Get the 'for' attribute (associated input id)
     * @returns {Promise<string>}
     */
    async getFor() {
        Logger.debug(`Getting 'for' attribute from label "${this.name}"`);
        return await this.getAttribute('for');
    }

    /**
     * Click the label
     * @returns {Promise<void>}
     */
    async click() {
        Logger.info(`Clicking label "${this.name}"`);
        await this.state().waitForClickable({ timeout: 5000 });
        await this.element.click();
    }

    /**
     * Get associated input element
     * @returns {Promise<WebdriverIO.Element>}
     */
    async getAssociatedInput() {
        const forId = await this.getFor();
        if (forId) {
            return $(`#${forId}`);
        }
        // If no 'for' attribute, look for nested input
        return await this.element.$('input');
    }

    /**
     * Check if label has required indicator
     * @param {string} indicator - Text or symbol indicating required field (default: '*')
     * @returns {Promise<boolean>}
     */
    async isRequired(indicator = '*') {
        const text = await this.getText();
        return text.includes(indicator);
    }

    /**
     * Get label by checking if it contains specific text
     * @param {string} containsText - Text to search for
     * @returns {Promise<boolean>}
     */
    async containsText(containsText) {
        const text = await this.getText();
        return text.includes(containsText);
    }
}

export default Label;
