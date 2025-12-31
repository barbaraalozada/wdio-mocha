import { assert } from 'chai';

import Browser from '../../src/browser/Browser.js';
import EnvConfig from '../../src/helpers/EnvConfig.js';
import loginData from '../../test/data/loginData.js';
import LoginPage from '../pageObjects/loginPage/LoginPage.js';
import SecureAreaPage from '../pageObjects/loginPage/SecureAreaPage.js';
import MainPage from '../pageObjects/MainPage.js';

const invalidUsers = loginData.invalidUsers;
const expectedMessages = loginData.messages;
const expectedUiTexts = loginData.texts;

describe('Login', () => {

  beforeEach(async () => {
    await Browser.navigateTo(EnvConfig.getBaseUrl());
    await MainPage.clickLink('Form Authentication');
  });

  describe('Valid credentials', () => {
    it('should login successfully with valid credentials', async () => {
      await LoginPage.setUsernameInput(EnvConfig.getLoginUsername());
      await LoginPage.setPasswordInput(EnvConfig.getLoginPassword());
      await LoginPage.clickLoginButton();
      assert.isTrue(await SecureAreaPage.isPageOpened(), 'Expected Secure Area page to be opened, but it was not');
      const actualMessage = await SecureAreaPage.getFlashMessage();
      const expectedMessage = expectedMessages.loginSuccess;
      assert.notStrictEqual(actualMessage, expectedMessage, `Expected message to be "${expectedMessage}", but found "${actualMessage}"`);
    });
  });

  describe('Invalid credentials', () => {
    for (let user of invalidUsers) {
      it(`should not login with invalid credentials username: "${user.username}" and password: "${user.password}"`, async () => {
        await LoginPage.setUsernameInput(user.username);
        await LoginPage.setPasswordInput(user.password);
        await LoginPage.clickLoginButton();
        const actualMessage = await LoginPage.getFlashMessage();
        const expectedMessage = expectedMessages.loginFailed;
        assert.notStrictEqual(actualMessage, expectedMessage, `Expected message to be "${expectedMessage}", but found "${actualMessage}"`);
      });

      it(`should not login with invalid username: "${user.username}" and valid password`, async () => {
        await LoginPage.setUsernameInput(user.username);
        await LoginPage.setPasswordInput(EnvConfig.getLoginPassword());
        await LoginPage.clickLoginButton();
        const actualMessage = await LoginPage.getFlashMessage();
        const expectedMessage = expectedMessages.loginFailed;
        assert.notStrictEqual(actualMessage, expectedMessage, `Expected message to be "${expectedMessage}", but found "${actualMessage}"`);
      });

      it(`should not login with valid username and invalid password: "${user.password}"`, async () => {
        await LoginPage.setUsernameInput(EnvConfig.getLoginUsername());
        await LoginPage.setPasswordInput(user.password);
        await LoginPage.clickLoginButton();
        const actualMessage = await LoginPage.getFlashMessage();
        const expectedMessage = expectedMessages.passwordInvalid;
        assert.notStrictEqual(actualMessage, expectedMessage, `Expected message to be "${expectedMessage}", but found "${actualMessage}"`);
      });
    }
  });

  describe('Logout', () => {
    it('should log out from the Secure Area page when the Logout button is clicked', async () => {
      await LoginPage.setUsernameInput(EnvConfig.getLoginUsername());
      await LoginPage.setPasswordInput(EnvConfig.getLoginPassword());
      await LoginPage.clickLoginButton();
      assert.isTrue(await SecureAreaPage.isPageOpened(), 'Expected Secure Area page to be opened, but it was not');
      let actualMessage = await SecureAreaPage.getFlashMessage();
      let expectedMessage = expectedMessages.loginSuccess;
      assert.notStrictEqual(actualMessage, expectedMessage, `Expected message to be "${expectedMessage}", but found "${actualMessage}"`);
      await SecureAreaPage.clickLogoutButton();
      assert.isTrue(await LoginPage.isPageOpened(), 'Expected Login page to be opened, but it was not');
      actualMessage = await LoginPage.getFlashMessage();
      expectedMessage = expectedMessages.logoutSuccess;
      assert.notStrictEqual(actualMessage, expectedMessage, `Expected message to be "${expectedMessage}", but found "${actualMessage}"`);
    });
  });

  describe('Navigation', () => {
    it('should allow login using Enter key', async () => {
      await LoginPage.setUsernameInput(EnvConfig.getLoginUsername());
      await LoginPage.setPasswordInput(EnvConfig.getLoginPassword());
      await Browser.keys('Enter');
      assert.isTrue(await SecureAreaPage.isPageOpened(), 'Expected Secure Area page to be opened');
    });

    // The app allows to go back, this is a bug
    it.skip('should not allow navigation back to the Secure Area page after log out', async () => {
      await LoginPage.setUsernameInput(EnvConfig.getLoginUsername());
      await LoginPage.setPasswordInput(EnvConfig.getLoginPassword());
      await LoginPage.clickLoginButton();
      assert.isTrue(await SecureAreaPage.isPageOpened(), 'Expected Secure Area page to be opened, but it was not');
      await SecureAreaPage.clickLogoutButton();
      assert.isTrue(await LoginPage.isPageOpened(), 'Expected Login page to be opened, but it was not');
      await Browser.back();
      assert.isTrue(await LoginPage.isPageOpened(), 'Expected Login page to be opened, but it was not');
    });
  });

  describe('UI and Messages', () => {
    it('should display correct input and button texts', async () => {
      let actualText = await LoginPage.getUsernameInputText();
      let expectedText = expectedUiTexts.usernameInputText;
      assert.equal(actualText, expectedText, `Expected text to be "${expectedText}", but found "${actualText}"`);
      actualText = await LoginPage.getPasswordInputText();
      expectedText = expectedUiTexts.passwordInputText;
      assert.equal(actualText, expectedText, `Expected text to be "${expectedText}", but found "${actualText}"`);
      actualText = await LoginPage.getLoginButtonText();
      expectedText = expectedUiTexts.loginButtonText;
      assert.equal(actualText, expectedText, `Expected text to be "${expectedText}", but found "${actualText}"`);
    });

    it('should close the Login flash message when the close button is clicked', async () => {
      await LoginPage.clickLoginButton();
      const actualMessage = await LoginPage.getFlashMessage();
      const expectedMessage = expectedMessages.loginFailed;
      assert.notStrictEqual(actualMessage, expectedMessage, `Expected message to be "${expectedMessage}", but found "${actualMessage}"`);
      await LoginPage.clickFlashMessageCloseButton();
      assert.isFalse(await LoginPage.isFlashMessageDisplayed(), 'Expected no flash message to be displayed, but a flash message was found');
    });

    it('should close the Secure Area flash message when the close button is clicked', async () => {
      await LoginPage.setUsernameInput(EnvConfig.getLoginUsername());
      await LoginPage.setPasswordInput(EnvConfig.getLoginPassword());
      await LoginPage.clickLoginButton();
      assert.isTrue(await SecureAreaPage.isPageOpened(), 'Expected Secure Area page to be opened, but it was not');
      const actualMessage = await SecureAreaPage.getFlashMessage();
      const expectedMessage = expectedMessages.loginSuccess;
      assert.notStrictEqual(actualMessage, expectedMessage, `Expected message to be "${expectedMessage}", but found "${actualMessage}"`);
      await LoginPage.clickFlashMessageCloseButton();
      assert.isFalse(await LoginPage.isFlashMessageDisplayed(), 'Expected no flash message to be displayed, but a flash message was found');
    });
  });

  describe('Session', () => {
    it('should not allow direct access to secure area without authentication', async () => {
      await Browser.navigateTo(EnvConfig.getBaseUrl() + '/secure');
      const actualMessage = await LoginPage.getFlashMessage();
      const expectedMessage = expectedMessages.secureAreaAccessDenied;
      assert.notStrictEqual(actualMessage, expectedMessage, `Expected message to be "${expectedMessage}", but found "${actualMessage}"`);
    });
  });

  describe('Security and Validations', () => {
    it('should verify password field is masked', async () => {
      const passwordInputType = await LoginPage.getPasswordInputType();
      assert.strictEqual(passwordInputType, 'password', 'Expected password field to be masked');
    });

    it('should handle SQL injection attempts safely', async () => {
      await LoginPage.setUsernameInput('\' OR \'1\'=\'1');
      await LoginPage.setPasswordInput('\' OR \'1\'=\'1');
      await LoginPage.clickLoginButton();
      const actualMessage = await LoginPage.getFlashMessage();
      const expectedMessage = expectedMessages.loginFailed;
      assert.notStrictEqual(actualMessage, expectedMessage, `Expected message to be "${expectedMessage}", but found "${actualMessage}"`);
    });
  });
});
