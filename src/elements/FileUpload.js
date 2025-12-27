import path from 'path';

import Logger from '../helpers/Logger.js';

import BaseElement from './BaseElement.js';

/**
 * FileUpload Element class
 * Represents file input elements for file uploads
 */
class FileUpload extends BaseElement {
  /**
     * @param {string} selector - File input selector
     * @param {string} name - File input name for logging
     */
  constructor(selector, name = '') {
    super(selector, name || 'FileUpload');
  }

  /**
     * Upload a file
     * @param {string} filePath - Absolute or relative path to file
     * @returns {Promise<void>}
     */
  async uploadFile(filePath) {
    Logger.info(`Uploading file "${filePath}" to "${this.name}"`);
    await this.state().waitForExist({ timeout: 5000 });

    // Convert to absolute path if relative
    const absolutePath = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(process.cwd(), filePath);

    const remoteFilePath = await browser.uploadFile(absolutePath);
    await this.element.setValue(remoteFilePath);
  }

  /**
     * Upload multiple files
     * @param {string[]} filePaths - Array of file paths
     * @returns {Promise<void>}
     */
  async uploadMultipleFiles(filePaths) {
    Logger.info(`Uploading ${filePaths.length} files to "${this.name}"`);
    await this.state().waitForExist({ timeout: 5000 });

    const absolutePaths = filePaths.map(filePath =>
      path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath)
    );

    for (const absolutePath of absolutePaths) {
      const remoteFilePath = await browser.uploadFile(absolutePath);
      await this.element.addValue(remoteFilePath);
    }
  }

  /**
     * Get uploaded file name
     * @returns {Promise<string>}
     */
  async getFileName() {
    const value = await this.element.getValue();
    return path.basename(value);
  }

  /**
     * Check if file is uploaded
     * @returns {Promise<boolean>}
     */
  async hasFile() {
    const value = await this.element.getValue();
    return value !== '';
  }

  /**
     * Get accept attribute (allowed file types)
     * @returns {Promise<string>}
     */
  async getAllowedFileTypes() {
    return await this.getAttribute('accept');
  }

  /**
     * Check if multiple files are allowed
     * @returns {Promise<boolean>}
     */
  async allowsMultiple() {
    const multiple = await this.getAttribute('multiple');
    return multiple !== null;
  }
}

export default FileUpload;
