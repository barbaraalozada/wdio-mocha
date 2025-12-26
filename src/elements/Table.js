import BaseElement from './BaseElement.js';
import Logger from '../helpers/Logger.js';

/**
 * Table Element class
 * Represents table elements with row and cell operations
 */
class Table extends BaseElement {
    /**
     * @param {string} selector - Table selector
     * @param {string} name - Table name for logging
     */
    constructor(selector, name = '') {
        super(selector, name || 'Table');
    }

    /**
     * Get all table headers
     * @returns {Promise<string[]>}
     */
    async getHeaders() {
        Logger.debug(`Getting headers from table "${this.name}"`);
        const headers = await this.element.$$('th');
        const headerTexts = [];
        for (const header of headers) {
            headerTexts.push(await header.getText());
        }
        return headerTexts;
    }

    /**
     * Get all rows (excluding header)
     * @returns {Promise<WebdriverIO.ElementArray>}
     */
    async getRows() {
        return await this.element.$$('tbody tr');
    }

    /**
     * Get row count (excluding header)
     * @returns {Promise<number>}
     */
    async getRowCount() {
        const rows = await this.getRows();
        return rows.length;
    }

    /**
     * Get row by index
     * @param {number} index - Row index (0-based)
     * @returns {Promise<WebdriverIO.Element>}
     */
    async getRow(index) {
        const rows = await this.getRows();
        if (index >= rows.length) {
            throw new Error(`Row index ${index} is out of bounds. Table has ${rows.length} rows.`);
        }
        return rows[index];
    }

    /**
     * Get cell value by row and column index
     * @param {number} rowIndex - Row index (0-based)
     * @param {number} colIndex - Column index (0-based)
     * @returns {Promise<string>}
     */
    async getCellValue(rowIndex, colIndex) {
        Logger.debug(`Getting cell value at row ${rowIndex}, col ${colIndex} from table "${this.name}"`);
        const row = await this.getRow(rowIndex);
        const cells = await row.$$('td');
        if (colIndex >= cells.length) {
            throw new Error(`Column index ${colIndex} is out of bounds. Row has ${cells.length} cells.`);
        }
        return await cells[colIndex].getText();
    }

    /**
     * Get all values from a specific column
     * @param {number} colIndex - Column index (0-based)
     * @returns {Promise<string[]>}
     */
    async getColumnValues(colIndex) {
        Logger.debug(`Getting all values from column ${colIndex} in table "${this.name}"`);
        const rows = await this.getRows();
        const columnValues = [];
        for (const row of rows) {
            const cells = await row.$$('td');
            if (colIndex < cells.length) {
                columnValues.push(await cells[colIndex].getText());
            }
        }
        return columnValues;
    }

    /**
     * Get all row data as array of objects
     * @returns {Promise<object[]>}
     */
    async getAllData() {
        Logger.debug(`Getting all data from table "${this.name}"`);
        const headers = await this.getHeaders();
        const rows = await this.getRows();
        const data = [];

        for (const row of rows) {
            const cells = await row.$$('td');
            const rowData = {};
            for (let i = 0; i < headers.length && i < cells.length; i++) {
                rowData[headers[i]] = await cells[i].getText();
            }
            data.push(rowData);
        }
        return data;
    }

    /**
     * Find row by cell value
     * @param {number} colIndex - Column index to search
     * @param {string} value - Value to find
     * @returns {Promise<number>} Row index or -1 if not found
     */
    async findRowByValue(colIndex, value) {
        Logger.debug(`Finding row with value "${value}" in column ${colIndex} in table "${this.name}"`);
        const columnValues = await this.getColumnValues(colIndex);
        return columnValues.indexOf(value);
    }

    /**
     * Click on a cell
     * @param {number} rowIndex - Row index (0-based)
     * @param {number} colIndex - Column index (0-based)
     * @returns {Promise<void>}
     */
    async clickCell(rowIndex, colIndex) {
        Logger.info(`Clicking cell at row ${rowIndex}, col ${colIndex} in table "${this.name}"`);
        const row = await this.getRow(rowIndex);
        const cells = await row.$$('td');
        await cells[colIndex].click();
    }
}

export default Table;
