import { Button, Input, Label } from '../../../src/elements/index.js';
import { PreciseTextLocator } from '../../../src/helpers/Locator.js';
import BasePage from '../../../src/page/BasePage.js';

class LoginPage extends BasePage {
  constructor () {
    super(new Label(PreciseTextLocator('Login Page'), 'Login Page Label'), 'Unique element for Login Page');
    this.usernameInput = new Input('input#username', 'Username Input');
    this.passwordInput = new Input('input#password', 'Password Input');
    this.loginButton = new Button('//*[contains(@class, "sign-in")]', 'Login Button');
    this.flashMessage = new Label('#flash', 'Flash Message');
  }
  async setUsernameInput (username) {
    await this.usernameInput.setValue(username);
  }
  async setPasswordInput (password) {
    await this.passwordInput.setValue(password);
  }
  async clickLoginButton () {
    await this.loginButton.click();
  }

  async getFlashMessage () {
    return this.flashMessage.getText();
  }
}
export default new LoginPage();
