import { expect } from 'chai';
import LoginPage from '../../src/page/LoginPage.js';
import EnvConfig from '../../src/helpers/EnvConfig.js';
import testData from '../data/testData.js';

describe('Example Test Suite', () => {

    it('should have the correct page title', async () => {
        await browser.url(EnvConfig.getBaseUrl());
        const title = await browser.getTitle();
        expect(title).to.equal('The Internet');
    });

    it('should display welcome message', async () => {
        await browser.url(EnvConfig.getBaseUrl());
        const heading = await $('h1');
        await heading.waitForDisplayed();
        const text = await heading.getText();
        expect(text).to.equal('Welcome to the-internet');
    });
});

describe('Login Test Suite', () => {

    beforeEach(async () => {
        await browser.url(`${EnvConfig.getBaseUrl()}${testData.urls.loginPage}`);
    });

    it('should login with valid credentials', async () => {
        await LoginPage.login(
            EnvConfig.getUsername(),
            EnvConfig.getPassword()
        );

        // Wait for flash message
        await LoginPage.flashMessage.waitForDisplayed();
        const flashMessage = await LoginPage.getFlashMessage();

        expect(flashMessage).to.include(testData.messages.loginSuccess);
    });

    it('should show error with invalid credentials', async () => {
        await LoginPage.login(
            testData.invalidUser.username,
            testData.invalidUser.password
        );

        // Wait for flash message
        await LoginPage.flashMessage.waitForDisplayed();
        const flashMessage = await LoginPage.getFlashMessage();

        expect(flashMessage).to.include(testData.messages.loginFailed);
    });
});
