import Logger from '../helpers/Logger.js';

/**
 * Base Element class
 * Contains common methods for all element types
 */
class BaseElement {
  /**
     * @param {string} selector - Element selector
     * @param {string} name - Element name for logging
     */
  constructor (selector, name = '') {
    this.selector = selector;
    this.name = name || selector;
  }

  /**
     * Get the element
     * @returns {WebdriverIO.Element}
     */
  get element () {
    return $(this.selector);
  }

  /**
     * Get all elements matching the selector
     * @returns {Promise<WebdriverIO.ElementArray>}
     */
  get elements () {
    return $$(this.selector);
  }

  /**
     * Get element state utilities
     * @returns {object} State utilities
     */
  state () {
    return {
      /**
             * Wait for element to be displayed
             * @param {object} options - Wait options
             * @returns {Promise<boolean>}
             */
      waitForDisplayed: async (options = {}) => {
        Logger.debug(`Waiting for element "${this.name}" to be displayed`);
        await this.element.waitForDisplayed(options);
        return true;
      },

      /**
             * Wait for element to be clickable
             * @param {object} options - Wait options
             * @returns {Promise<boolean>}
             */
      waitForClickable: async (options = {}) => {
        Logger.debug(`Waiting for element "${this.name}" to be clickable`);
        await this.element.waitForClickable(options);
        return true;
      },

      /**
             * Wait for element to exist
             * @param {object} options - Wait options
             * @returns {Promise<boolean>}
             */
      waitForExist: async (options = {}) => {
        Logger.debug(`Waiting for element "${this.name}" to exist`);
        await this.element.waitForExist(options);
        return true;
      },

      /**
             * Check if element is displayed
             * @returns {Promise<boolean>}
             */
      isDisplayed: async () => {
        return await this.element.isDisplayed();
      },

      /**
             * Check if element exists
             * @returns {Promise<boolean>}
             */
      isExisting: async () => {
        return await this.element.isExisting();
      },

      /**
             * Check if element is enabled
             * @returns {Promise<boolean>}
             */
      isEnabled: async () => {
        return await this.element.isEnabled();
      },

      /**
             * Check if element is clickable
             * @returns {Promise<boolean>}
             */
      isClickable: async () => {
        return await this.element.isClickable();
      }
    };
  }

  /**
     * Get text content of element
     * @returns {Promise<string>}
     */
  async getText () {
    Logger.debug(`Getting text from element "${this.name}"`);
    await this.state().waitForDisplayed();
    return await this.element.getText();
  }

  /**
     * Get text content of the next sibling text node
     * Useful for elements like checkboxes where the label is a text node
     * @returns {Promise<string>}
     */
  async getNextSiblingText () {
    Logger.debug(`Getting next sibling text from element "${this.name}"`);
    try {
      const text = await browser.execute((selector) => {
        const element = document.evaluate(selector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
          || document.querySelector(selector);
        if (!element) return '';
        const nextNode = element.nextSibling;
        return nextNode ? nextNode.textContent.trim() : '';
      }, this.selector);
      return text;
    } catch (error) {
      Logger.error(`Failed to get next sibling text for "${this.name}": ${error.message}`);
      return '';
    }
  }

  /**
     * Get attribute value
     * @param {string} attributeName - Attribute name
     * @returns {Promise<string>}
     */
  async getAttribute (attributeName) {
    Logger.debug(`Getting attribute "${attributeName}" from element "${this.name}"`);
    return await this.element.getAttribute(attributeName);
  }

  /**
     * Scroll element into view
     * @returns {Promise<void>}
     */
  async scrollIntoView () {
    Logger.debug(`Scrolling element "${this.name}" into view`);
    await this.element.scrollIntoView();
  }

  /**
     * Move mouse to element
     * @returns {Promise<void>}
     */
  async moveTo () {
    Logger.debug(`Moving to element "${this.name}"`);
    await this.element.moveTo();
  }

  /**
     * Get CSS property value
     * @param {string} propertyName - CSS property name
     * @returns {Promise<string>}
     */
  async getCSSProperty (propertyName) {
    const property = await this.element.getCSSProperty(propertyName);
    return property.value;
  }
}

export default BaseElement;
