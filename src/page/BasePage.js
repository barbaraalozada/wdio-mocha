import Logger from '../helpers/Logger.js';

/**
 * Base Page Object class
 * Contains common methods that can be used across all page objects
 */
class BasePage {
  constructor (uniqueElement, name) {
    this.uniqueElement = uniqueElement;
    this.name = name;
  }

  /**
 * Get name of the page
 * @returns {string} Name of the page
 */
  getPageName () {
    return this.name;
  }

  /**
   * Get unique element of the page
   * @returns {<T>BaseElement} unique element of the page
   */
  getPageUniqueElement () {
    return this.uniqueElement;
  }

  /**
   * Check if the form is opened, with 'pageLoadTime' timeout
   * @returns {Promise<boolean>} true if opened else false
   */
  async isPageOpened () {
    Logger.info(`Waiting for page "${this.name}" to load`);
    const isOpened = await this.uniqueElement.state().waitForDisplayed({
      timeout: 30000
    });
    Logger.info(`Page "${this.name}" is opened - "${isOpened}"`);
    return isOpened;
  }
  /**
   * Open a URL
   * @param {string} path - The path to open
   */
  open (path) {
    return browser.url(path);
  }

  /**
   * Get page title
   * @returns {string} Page title
   */
  getTitle () {
    return browser.getTitle();
  }

  /**
   * Wait for element to be displayed
   * @param {object} element - WebdriverIO element
   * @param {number} timeout - Timeout in milliseconds
   */
  waitForDisplayed (element, timeout = 5000) {
    element.waitForDisplayed({ timeout });
  }

  /**
   * Wait for element to be clickable
   * @param {object} element - WebdriverIO element
   * @param {number} timeout - Timeout in milliseconds
   */
  waitForClickable (element, timeout = 5000) {
    element.waitForClickable({ timeout });
  }

  /**
   * Click on an element
   * @param {object} element - WebdriverIO element
   */
  click (element) {
    this.waitForClickable(element);
    element.click();
  }

  /**
   * Set value to an input field
   * @param {object} element - WebdriverIO element
   * @param {string} value - Value to set
   */
  setValue (element, value) {
    this.waitForDisplayed(element);
    element.setValue(value);
  }

  /**
   * Get text from an element
   * @param {object} element - WebdriverIO element
   * @returns {string} Element text
   */
  getText (element) {
    this.waitForDisplayed(element);
    return element.getText();
  }
}

export default BasePage;
