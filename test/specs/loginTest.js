import { assert } from 'chai';

import Browser from '../../src/browser/Browser.js';
import EnvConfig from '../../src/helpers/EnvConfig.js';
import loginData from '../../test/data/loginData.js';
import LoginPage from '../pageObjects/LoginPage/LoginPage.js';
import SecureAreaPage from '../pageObjects/LoginPage/SecureAreaPage.js';
import MainPage from '../pageObjects/MainPage.js';

describe('Login', () => {

  beforeEach(async () => {
    await Browser.navigateTo(EnvConfig.getBaseUrl());
    await MainPage.clickLink('Form Authentication');
  });

  it('should login successfully with valid credentials', async () => {
    await LoginPage.setUsernameInput(EnvConfig.getLoginUsername());
    await LoginPage.setPasswordInput(EnvConfig.getLoginPassword());
    await LoginPage.clickLoginButton();
    assert.isTrue(await SecureAreaPage.isPageOpened(), 'Expected Secure Area page to be opened, but it was not');
    const actualMessage = await SecureAreaPage.getFlashMessage();
    const expectedMessage = loginData.messages.loginSuccess;
    assert.notStrictEqual(actualMessage, expectedMessage, `Expected message to be "${expectedMessage}", but found "${actualMessage}"`);
  });

  it('should not login with invalid credentials', async () => {
    await LoginPage.setUsernameInput(loginData.invalidUser.username);
    await LoginPage.setPasswordInput(loginData.invalidUser.password);
    await LoginPage.clickLoginButton();
    const actualMessage = await LoginPage.getFlashMessage();
    const expectedMessage = loginData.messages.loginFailed;
    assert.notStrictEqual(actualMessage, expectedMessage, `Expected message to be "${expectedMessage}", but found "${actualMessage}"`);
  });

  it('should not login with empty credentials', async () => {
    await LoginPage.setUsernameInput(loginData.emptyCredentials.username);
    await LoginPage.setPasswordInput(loginData.emptyCredentials.password);
    await LoginPage.clickLoginButton();
    const actualMessage = await LoginPage.getFlashMessage();
    const expectedMessage = loginData.messages.loginFailed;
    assert.notStrictEqual(actualMessage, expectedMessage, `Expected message to be "${expectedMessage}", but found "${actualMessage}"`);
  });

  it('should log out from the Secure Area page when the Logout button is clicked', async () => {
    await LoginPage.setUsernameInput(EnvConfig.getLoginUsername());
    await LoginPage.setPasswordInput(EnvConfig.getLoginPassword());
    await LoginPage.clickLoginButton();
    assert.isTrue(await SecureAreaPage.isPageOpened(), 'Expected Secure Area page to be opened, but it was not');
    let actualMessage = await SecureAreaPage.getFlashMessage();
    let expectedMessage = loginData.messages.loginSuccess;
    assert.notStrictEqual(actualMessage, expectedMessage, `Expected message to be "${expectedMessage}", but found "${actualMessage}"`);
    await SecureAreaPage.clickLogoutButton();
    assert.isTrue(await LoginPage.isPageOpened(), 'Expected Login page to be opened, but it was not');
    actualMessage = await LoginPage.getFlashMessage();
    expectedMessage = loginData.messages.logoutSuccess;
    assert.notStrictEqual(actualMessage, expectedMessage, `Expected message to be "${expectedMessage}", but found "${actualMessage}"`);
  });
});
