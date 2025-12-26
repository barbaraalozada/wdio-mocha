import BaseElement from './BaseElement.js';
import Logger from '../helpers/Logger.js';

/**
 * Frame Element class
 * Represents iframe and frame elements with context switching
 */
class Frame extends BaseElement {
    /**
     * @param {string} selector - Frame selector
     * @param {string} name - Frame name for logging
     */
    constructor(selector, name = '') {
        super(selector, name || 'Frame');
        this.isInFrame = false;
    }

    /**
     * Switch to this frame
     * @returns {Promise<void>}
     */
    async switchTo() {
        Logger.info(`Switching to frame "${this.name}"`);
        await this.state().waitForExist({ timeout: 5000 });
        await browser.switchToFrame(this.element);
        this.isInFrame = true;
    }

    /**
     * Switch back to parent frame or main content
     * @returns {Promise<void>}
     */
    async switchToParent() {
        Logger.info(`Switching to parent from frame "${this.name}"`);
        await browser.switchToParentFrame();
        this.isInFrame = false;
    }

    /**
     * Switch back to default content (main page)
     * @returns {Promise<void>}
     */
    async switchToDefault() {
        Logger.info(`Switching to default content from frame "${this.name}"`);
        await browser.switchToFrame(null);
        this.isInFrame = false;
    }

    /**
     * Execute action within frame and then switch back
     * @param {Function} callback - Async function to execute within frame
     * @returns {Promise<any>} Result from callback
     */
    async executeInFrame(callback) {
        Logger.info(`Executing action in frame "${this.name}"`);
        try {
            await this.switchTo();
            const result = await callback();
            return result;
        } finally {
            await this.switchToParent();
        }
    }

    /**
     * Get frame source URL
     * @returns {Promise<string>}
     */
    async getSrc() {
        Logger.debug(`Getting src from frame "${this.name}"`);
        return await this.getAttribute('src');
    }

    /**
     * Get frame name attribute
     * @returns {Promise<string>}
     */
    async getFrameName() {
        return await this.getAttribute('name');
    }

    /**
     * Get frame title
     * @returns {Promise<string>}
     */
    async getFrameTitle() {
        return await this.executeInFrame(async () => {
            return await browser.getTitle();
        });
    }

    /**
     * Check if frame is loaded
     * @returns {Promise<boolean>}
     */
    async isLoaded() {
        try {
            await this.state().waitForExist({ timeout: 5000 });
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Wait for frame to load
     * @param {number} timeout - Timeout in milliseconds
     * @returns {Promise<void>}
     */
    async waitForLoad(timeout = 10000) {
        Logger.debug(`Waiting for frame "${this.name}" to load`);
        await this.state().waitForExist({ timeout });
    }

    /**
     * Get element within frame
     * @param {string} selector - Selector of element within frame
     * @returns {Promise<WebdriverIO.Element>}
     */
    async getElementInFrame(selector) {
        return await this.executeInFrame(async () => {
            return await $(selector);
        });
    }

    /**
     * Click element within frame
     * @param {string} selector - Selector of element to click
     * @returns {Promise<void>}
     */
    async clickElementInFrame(selector) {
        Logger.info(`Clicking element "${selector}" in frame "${this.name}"`);
        await this.executeInFrame(async () => {
            const element = await $(selector);
            await element.waitForClickable({ timeout: 5000 });
            await element.click();
        });
    }

    /**
     * Set value in input element within frame
     * @param {string} selector - Selector of input element
     * @param {string} value - Value to set
     * @returns {Promise<void>}
     */
    async setValueInFrame(selector, value) {
        Logger.info(`Setting value in element "${selector}" in frame "${this.name}"`);
        await this.executeInFrame(async () => {
            const element = await $(selector);
            await element.waitForDisplayed({ timeout: 5000 });
            await element.setValue(value);
        });
    }

    /**
     * Get text from element within frame
     * @param {string} selector - Selector of element
     * @returns {Promise<string>}
     */
    async getTextInFrame(selector) {
        Logger.debug(`Getting text from element "${selector}" in frame "${this.name}"`);
        return await this.executeInFrame(async () => {
            const element = await $(selector);
            await element.waitForDisplayed({ timeout: 5000 });
            return await element.getText();
        });
    }

    /**
     * Check if currently inside this frame
     * @returns {boolean}
     */
    isCurrentlyInFrame() {
        return this.isInFrame;
    }
}

export default Frame;
