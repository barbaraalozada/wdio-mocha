import { Checkbox, Label } from '../../src/elements/index.js';
import { PreciseTextLocator } from '../../src/helpers/Locator.js';
import BasePage from '../../src/page/BasePage.js';

class CheckboxesPage extends BasePage {
  constructor () {
    super(new Label(PreciseTextLocator('Checkboxes'), 'Unique element for Checkboxes page'), 'Checkboxes Page');
    this.checkboxes = (index) => new Checkbox(`(//input[@type="checkbox"])[${index}]`, `Checkbox ${index}`);
  }
  async isCheckboxChecked (index) {
    return this.checkboxes(index).isChecked();
  }

  async isCheckboxDisplayed (index) {
    return this.checkboxes(index).state().isDisplayed();
  }

  async isCheckboxEnabled (index) {
    return this.checkboxes(index).state().isEnabled();
  }

  async checkCheckbox (index) {
    await this.checkboxes(index).check();
  }

  async uncheckCheckbox (index) {
    await this.checkboxes(index).uncheck();
  }

  async toggleCheckbox (index) {
    await this.checkboxes(index).toggle();
  }

  async getCheckboxText (index) {
    return this.checkboxes(index).getNextSiblingText();
  }

}

export default new CheckboxesPage();
