import { Label, Button } from '../../../src/elements/index.js';
import { PartialTextLocator } from '../../../src/helpers/Locator.js';
import BasePage from '../../../src/page/BasePage.js';

class SecureArePage extends BasePage {
  constructor () {
    super(new Label(PartialTextLocator('Secure Area'), 'Secure Area Page Label'), 'Unique element Secure Area Page');
    this.logoutButton = new Button('[href="/logout"]', 'Logout Button');
    this.flashMessage = new Label('#flash', 'Flash Message');
  }
  async clickLogoutButton () {
    await this.logoutButton.click();
  }

  async getFlashMessage () {
    return this.flashMessage.getText();
  }
}
export default new SecureArePage();
