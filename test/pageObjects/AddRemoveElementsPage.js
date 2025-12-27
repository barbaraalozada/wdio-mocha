import { Label, Button } from '../../src/elements/index.js';
import { PreciseTextLocator } from '../../src/helpers/Locator.js';
import BasePage from '../../src/page/BasePage.js';

class AddRemoveElementsPage extends BasePage {
  constructor () {
    super(new Label(PreciseTextLocator('Add/Remove Elements'), 'Add/Remove Elements Label'), 'Add/Remove Elements Page');
    this.addElementButton = new Button('//button[@onclick="addElement()"]', 'Add Element Button');
    this.deleteButton = new Button('//button[@onclick="deleteElement()"]', 'Delete Button');
  }
  async getDeleteButtonQuantity () {
    const buttons = await this.deleteButton.elements;
    return buttons.length;
  }

  async isAddButtonDisplayed () {
    return this.addElementButton.state().waitForDisplayed();
  }

  async clickAddElementButton () {
    await this.addElementButton.click();
  }
  async isDeleteButtonDisplayed () {
    return this.deleteButton.state().waitForDisplayed();
  }
  async clickDeleteButton () {
    await this.deleteButton.click();
  }

  async isDeleteButtonNotDisplayed () {
    return this.deleteButton.state().waitForDisplayed({ reverse: true });
  }

}
export default new AddRemoveElementsPage();
