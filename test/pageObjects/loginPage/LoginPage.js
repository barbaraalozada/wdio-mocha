import { Button, Input, Label } from '../../../src/elements/index.js';
import EnvConfig from '../../../src/helpers/EnvConfig.js';
import { PreciseTextLocator } from '../../../src/helpers/Locator.js';
import BasePage from '../../../src/page/BasePage.js';

class LoginPage extends BasePage {
  constructor () {
    super(new Label(PreciseTextLocator('Login Page'), 'Login Page Label'), 'Unique element for Login Page');
    this.usernameInput = new Input('input#username', 'Username Input');
    this.passwordInput = new Input('input#password', 'Password Input');
    this.loginButton = new Button('//*[contains(@class, "sign-in")]', 'Login Button');
    this.usernameInputLabel = new Label('label[for="username"]', 'Username Input');
    this.passwordInputLabel = new Label('label[for="password"]', 'Password Input');
    this.flashMessage = new Label('#flash', 'Flash Message');
    this.flashMessageCloseButton = new Button('#flash .close', 'Flash Message Close Button');
  }
  async setUsernameInput (username) {
    await this.usernameInput.setValue(username);
  }

  async setPasswordInput (password) {
    await this.passwordInput.setSecretValue(password);
  }

  async getFlashMessage () {
    return this.flashMessage.getText();
  }

  async getUsernameInputText () {
    return this.usernameInputLabel.getText();
  }

  async getPasswordInputText () {
    return this.passwordInputLabel.getText();
  }

  async getLoginButtonText () {
    return this.loginButton.getText();
  }

  async getPasswordInputType () {
    return this.passwordInput.getAttribute('type');
  }

  async clickLoginButton () {
    await this.loginButton.click();
  }

  async clickFlashMessageCloseButton () {
    if (await this.flashMessageCloseButton.state().isExisting()) {
      await this.flashMessageCloseButton.click();
      await this.flashMessage.state().waitForDisplayed({ reverse: true, timeout: EnvConfig.getDefaultTimeout() });
    }
  }

  async isFlashMessageDisplayed () {
    return this.flashMessage.state().isDisplayed();
  }
}
export default new LoginPage();
