/**
 * Locator Helper
 * Provides utility functions for creating text-based element locators
 */

/**
 * Find element by exact text match
 * @param {string} text - Exact text to match
 * @returns {string} XPath locator
 * @example
 * PreciseTextLocator('Login')
 */
export function PreciseTextLocator(text) {
  return `//*[text()='${text}']`;
}

/**
 * Find element by partial text match
 * @param {string} partialText - Partial text to match
 * @returns {string} XPath locator
 * @example
 * PartialTextLocator('Log')
 */
export function PartialTextLocator(partialText) {
  return `//*[contains(text(),'${partialText}')]`;
}
