import BaseElement from './BaseElement.js';
import Logger from '../helpers/Logger.js';

/**
 * Link Element class
 * Represents hyperlink/anchor elements
 */
class Link extends BaseElement {
    /**
     * @param {string} selector - Link selector
     * @param {string} name - Link name for logging
     */
    constructor(selector, name = '') {
        super(selector, name || 'Link');
    }

    /**
     * Click the link
     * @returns {Promise<void>}
     */
    async click() {
        Logger.info(`Clicking link "${this.name}"`);
        await this.state().waitForClickable({ timeout: 5000 });
        await this.element.click();
    }

    /**
     * Get href attribute
     * @returns {Promise<string>}
     */
    async getHref() {
        Logger.debug(`Getting href from link "${this.name}"`);
        return await this.getAttribute('href');
    }

    /**
     * Get target attribute
     * @returns {Promise<string>}
     */
    async getTarget() {
        return await this.getAttribute('target');
    }

    /**
     * Check if link opens in new tab
     * @returns {Promise<boolean>}
     */
    async opensInNewTab() {
        const target = await this.getTarget();
        return target === '_blank';
    }

    /**
     * Get link text
     * @returns {Promise<string>}
     */
    async getLinkText() {
        return await this.getText();
    }

    /**
     * Right click on link
     * @returns {Promise<void>}
     */
    async rightClick() {
        Logger.info(`Right clicking link "${this.name}"`);
        await this.state().waitForClickable({ timeout: 5000 });
        await this.element.click({ button: 'right' });
    }
}

export default Link;
