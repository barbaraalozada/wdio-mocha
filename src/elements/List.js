import BaseElement from './BaseElement.js';
import Logger from '../helpers/Logger.js';

/**
 * List Element class
 * Represents ordered (ol) and unordered (ul) list elements
 */
class List extends BaseElement {
    /**
     * @param {string} selector - List selector
     * @param {string} name - List name for logging
     */
    constructor(selector, name = '') {
        super(selector, name || 'List');
    }

    /**
     * Get all list items
     * @returns {Promise<WebdriverIO.ElementArray>}
     */
    async getItems() {
        Logger.debug(`Getting all items from list "${this.name}"`);
        return await this.element.$$('li');
    }

    /**
     * Get count of list items
     * @returns {Promise<number>}
     */
    async getItemCount() {
        Logger.debug(`Getting item count from list "${this.name}"`);
        const items = await this.getItems();
        return items.length;
    }

    /**
     * Get text from all list items
     * @returns {Promise<string[]>}
     */
    async getItemTexts() {
        Logger.debug(`Getting all item texts from list "${this.name}"`);
        const items = await this.getItems();
        const texts = [];
        for (const item of items) {
            texts.push(await item.getText());
        }
        return texts;
    }

    /**
     * Get specific list item by index
     * @param {number} index - Index of item (0-based)
     * @returns {Promise<WebdriverIO.Element>}
     */
    async getItem(index) {
        Logger.debug(`Getting item at index ${index} from list "${this.name}"`);
        const items = await this.getItems();
        if (index >= items.length) {
            throw new Error(`List item index ${index} is out of bounds. List has ${items.length} items.`);
        }
        return items[index];
    }

    /**
     * Get text from specific list item
     * @param {number} index - Index of item (0-based)
     * @returns {Promise<string>}
     */
    async getItemText(index) {
        Logger.debug(`Getting text from item at index ${index} in list "${this.name}"`);
        const item = await this.getItem(index);
        return await item.getText();
    }

    /**
     * Click on specific list item
     * @param {number} index - Index of item (0-based)
     * @returns {Promise<void>}
     */
    async clickItem(index) {
        Logger.info(`Clicking item at index ${index} in list "${this.name}"`);
        const item = await this.getItem(index);
        await item.click();
    }

    /**
     * Find list item by text
     * @param {string} text - Text to search for
     * @param {boolean} exact - Whether to match exact text (default: true)
     * @returns {Promise<number>} Index of item or -1 if not found
     */
    async findItemByText(text, exact = true) {
        Logger.debug(`Finding item with text "${text}" in list "${this.name}"`);
        const itemTexts = await this.getItemTexts();

        if (exact) {
            return itemTexts.indexOf(text);
        } else {
            return itemTexts.findIndex(itemText => itemText.includes(text));
        }
    }

    /**
     * Click list item by text
     * @param {string} text - Text of item to click
     * @param {boolean} exact - Whether to match exact text (default: true)
     * @returns {Promise<void>}
     */
    async clickItemByText(text, exact = true) {
        Logger.info(`Clicking item with text "${text}" in list "${this.name}"`);
        const index = await this.findItemByText(text, exact);
        if (index === -1) {
            throw new Error(`List item with text "${text}" not found in list "${this.name}"`);
        }
        await this.clickItem(index);
    }

    /**
     * Check if list contains item with specific text
     * @param {string} text - Text to search for
     * @param {boolean} exact - Whether to match exact text (default: true)
     * @returns {Promise<boolean>}
     */
    async hasItem(text, exact = true) {
        const index = await this.findItemByText(text, exact);
        return index !== -1;
    }

    /**
     * Check if list is ordered (ol) or unordered (ul)
     * @returns {Promise<'ordered'|'unordered'>}
     */
    async getListType() {
        const tagName = await this.element.getTagName();
        return tagName.toLowerCase() === 'ol' ? 'ordered' : 'unordered';
    }

    /**
     * Get first list item
     * @returns {Promise<WebdriverIO.Element>}
     */
    async getFirstItem() {
        return await this.getItem(0);
    }

    /**
     * Get last list item
     * @returns {Promise<WebdriverIO.Element>}
     */
    async getLastItem() {
        const items = await this.getItems();
        return items[items.length - 1];
    }
}

export default List;
