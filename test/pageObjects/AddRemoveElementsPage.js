import { Label, Button } from '../../src/elements/index.js';
import { PreciseTextLocator } from '../../src/helpers/Locator.js';
import BasePage from '../../src/page/BasePage.js';

class AddRemoveElementsPage extends BasePage {
  constructor () {
    super(new Label(PreciseTextLocator('Add/Remove Elements'), 'Add/Remove Elements Label'), 'Add/Remove Elements Page');
    this.addElementButton = new Button('//button[@onclick="addElement()"]', 'Add Element Button');
    this.deleteButton = (index = 1) => new Button(`//button[@onclick="deleteElement()"][${index}]`, `Delete Button #${index}`);
    this.allDeleteButtons = new Button('//button[@onclick="deleteElement()"]', 'All Delete Buttons');
  }
  async getDeleteButtonQuantity () {
    const buttons = await this.allDeleteButtons.elements;
    return buttons.length;
  }

  async isAddButtonDisplayed () {
    return this.addElementButton.state().waitForDisplayed();
  }

  async clickAddElementButton (times = 1) {
    for (let i = 0; i < times; i++) {
      await this.addElementButton.click();
    }
  }

  async isDeleteButtonDisplayed (index) {
    return this.deleteButton(index).state().waitForDisplayed();
  }

  async clickDeleteButton (index) {
    if (await this.deleteButton(index).state().isExisting()) {
      await this.deleteButton(index).click();
    }
  }

  async clickAllDeleteButtons () {
    const buttons = await this.allDeleteButtons.elements;
    for (let i = buttons.length; i >= 1; i--) {
      await this.deleteButton(i).click();
    }
  }

  async areNoDeleteButtonsDisplayed () {
    return (await this.allDeleteButtons.elements).length === 0;
  };

  async getAddElementButtonText () {
    return this.addElementButton.getText();
  }

  async getDeleteButtonText (index) {
    return this.deleteButton(index).getText();
  }
}
export default new AddRemoveElementsPage();
