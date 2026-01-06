import { assert } from 'chai';

import Browser from '../../src/browser/Browser.js';
import EnvConfig from '../../src/helpers/EnvConfig.js';
import checkboxesData from '../../test/data/checkboxesData.js';
import CheckboxesPage from '../../test/pageObjects/CheckboxesPage.js';
import MainPage from '../pageObjects/MainPage.js';

const pageTitle = checkboxesData.pageTitle;
const count = 5;

describe('Checkboxes', () => {

  beforeEach(async () => {
    await Browser.navigateTo(EnvConfig.getBaseUrl());
    await MainPage.clickLink(pageTitle);
  });

  describe('UI validation', () => {
    it(`[CB-UI-001] should open the ${pageTitle} page`, async () => {
      await assert.isTrue(await CheckboxesPage.isPageOpened(), `Expected ${pageTitle} page to be opened, but it was not`);
    });

    it('[CB-UI-002] should display both checkboxes as visible', async () => {
      assert.isTrue(await CheckboxesPage.isCheckboxDisplayed(1), 'Expected checkbox 1 to be displayed, but it was not');
      assert.isTrue(await CheckboxesPage.isCheckboxDisplayed(2), 'Expected checkbox 2 to be displayed, but it was not');
    });

    it('[CB-UI-003] should display both checkboxes as enabled', async () => {
      assert.isTrue(await CheckboxesPage.isCheckboxEnabled(1), 'Expected checkbox 1 to be enabled, but it was not');
      assert.isTrue(await CheckboxesPage.isCheckboxEnabled(2), 'Expected checkbox 2 to be enabled, but it was not');
    });

    it('[CB-UI-004] should verify checkbox labels text', async () => {
      const actualCheckbox1Text = await CheckboxesPage.getCheckboxText(1);
      const expectedCheckbox1Text = checkboxesData.texts.checkbox1;
      assert.equal(actualCheckbox1Text, expectedCheckbox1Text, `Expected Checkbox 1 text to be "${expectedCheckbox1Text}", but got "${actualCheckbox1Text}"`);
      const actualCheckbox2Text = await CheckboxesPage.getCheckboxText(2);
      const expectedCheckbox2Text = checkboxesData.texts.checkbox2;
      assert.equal(actualCheckbox2Text, expectedCheckbox2Text, `Expected Checkbox 2 text to be "${expectedCheckbox2Text}", but got "${actualCheckbox2Text}"`);
    });

    it('[CB-UI-005] should display checkbox 1 unchecked and checkbox 2 checked by default', async () => {
      assert.isTrue(await CheckboxesPage.isPageOpened(), 'Expected Checkboxes page to be opened, but it was not');
      assert.isFalse(await CheckboxesPage.isCheckboxChecked(1), 'Expected checkbox 1 to not be checked, but it was checked');
      assert.isTrue(await CheckboxesPage.isCheckboxChecked(2), 'Expected checkbox 2 to be checked, but it was not');
    });
  });

  describe('Checkboxes interaction', () => {

    it('[CB-CI-001] should check and uncheck checkbox 1 successfully', async () => {
      assert.isFalse(await CheckboxesPage.isCheckboxChecked(1), 'Expected checkbox 1 to not be checked, but it was checked');
      await CheckboxesPage.checkCheckbox(1);
      assert.isTrue(await CheckboxesPage.isCheckboxChecked(1), 'Expected checkbox 1 to be checked, but it was not');
      await CheckboxesPage.uncheckCheckbox(1);
      assert.isFalse(await CheckboxesPage.isCheckboxChecked(1), 'Expected checkbox 1 to not be checked, but it was checked');
    });

    it('[CB-CI-002] should uncheck and check checkbox 2 successfully', async () => {
      assert.isTrue(await CheckboxesPage.isCheckboxChecked(2), 'Expected checkbox 2 to be checked, but it was not');
      await CheckboxesPage.uncheckCheckbox(2);
      assert.isFalse(await CheckboxesPage.isCheckboxChecked(2), 'Expected checkbox 2 to not be checked, but it was checked');
      await CheckboxesPage.checkCheckbox(2);
      assert.isTrue(await CheckboxesPage.isCheckboxChecked(2), 'Expected checkbox 2 to be checked, but it was not');
    });

    it('[CB-CI-003] should check checkbox 1 and uncheck checkbox 2 successfully', async () => {
      assert.isFalse(await CheckboxesPage.isCheckboxChecked(1), 'Expected checkbox 1 to not be checked, but it was checked');
      assert.isTrue(await CheckboxesPage.isCheckboxChecked(2), 'Expected checkbox 2 to be checked, but it was not');
      await CheckboxesPage.checkCheckbox(1);
      await CheckboxesPage.uncheckCheckbox(2);
      assert.isTrue(await CheckboxesPage.isCheckboxChecked(1), 'Expected checkbox 1 to be checked, but it was not');
      assert.isFalse(await CheckboxesPage.isCheckboxChecked(2), 'Expected checkbox 2 to not be checked, but it was checked');
    });
  });

  describe('Edge cases', () => {

    it('[CB-EC-001] should check and uncheck checkbox 1 without affecting checkbox 2', async () => {
      assert.isFalse(await CheckboxesPage.isCheckboxChecked(1), 'Expected checkbox 1 to not be checked, but it was checked');
      assert.isTrue(await CheckboxesPage.isCheckboxChecked(2), 'Expected checkbox 2 to be checked, but it was not');
      await CheckboxesPage.checkCheckbox(1);
      assert.isTrue(await CheckboxesPage.isCheckboxChecked(1), 'Expected checkbox 1 to be checked, but it was not');
      assert.isTrue(await CheckboxesPage.isCheckboxChecked(2), 'Expected checkbox 2 to be checked, but it was not');
      await CheckboxesPage.uncheckCheckbox(1);
      assert.isFalse(await CheckboxesPage.isCheckboxChecked(1), 'Expected checkbox 1 to not be checked, but it was checked');
      assert.isTrue(await CheckboxesPage.isCheckboxChecked(2), 'Expected checkbox 2 to be checked, but it was not');
    });

    it('[CB-EC-002] should uncheck and check checkbox 2 without affecting checkbox 1', async () => {
      assert.isFalse(await CheckboxesPage.isCheckboxChecked(1), 'Expected checkbox 1 to not be checked, but it was checked');
      assert.isTrue(await CheckboxesPage.isCheckboxChecked(2), 'Expected checkbox 2 to be checked, but it was not');
      await CheckboxesPage.uncheckCheckbox(2);
      assert.isFalse(await CheckboxesPage.isCheckboxChecked(1), 'Expected checkbox 1 to not be checked, but it was checked');
      assert.isFalse(await CheckboxesPage.isCheckboxChecked(2), 'Expected checkbox 2 to not be checked, but it was checked');
      await CheckboxesPage.checkCheckbox(2);
      assert.isFalse(await CheckboxesPage.isCheckboxChecked(1), 'Expected checkbox 1 to not be checked, but it was checked');
      assert.isTrue(await CheckboxesPage.isCheckboxChecked(2), 'Expected checkbox 2 to be checked, but it was not');
    });

    it('[CB-EC-003] should alternate state correctly after multiple consecutive clicks on checkbox 1', async () => {
      let expectedState = false;
      for (let i = 0; i < count; i++) {
        await CheckboxesPage.toggleCheckbox(1);
        expectedState = !expectedState;
        const actualState = await CheckboxesPage.isCheckboxChecked(1);
        assert.equal(actualState, expectedState, `Expected checkbox 1 to be ${expectedState ? 'checked' : 'unchecked'} after click ${i + 1}`);
      }
    });

    it('[CB-EC-004] should alternate state correctly after multiple consecutive clicks on checkbox 2', async () => {
      let expectedState = true;
      for (let i = 0; i < count; i++) {
        await CheckboxesPage.toggleCheckbox(2);
        expectedState = !expectedState;
        const actualState = await CheckboxesPage.isCheckboxChecked(2);
        assert.equal(actualState, expectedState, `Expected checkbox 2 to be ${expectedState ? 'checked' : 'unchecked'} after click ${i + 1}`);
      }
    });

    it('[CB-EC-005] should maintain state after page refresh', async () => {
      await CheckboxesPage.checkCheckbox(1);
      await CheckboxesPage.uncheckCheckbox(2);
      assert.isTrue(await CheckboxesPage.isCheckboxChecked(1), 'Expected checkbox 1 to be checked before refresh, but it was not');
      assert.isFalse(await CheckboxesPage.isCheckboxChecked(2), 'Expected checkbox 2 to be unchecked before refresh, but it was checked');
      await Browser.refresh();
      await CheckboxesPage.isPageOpened();
      let stateAfterRefresh = await CheckboxesPage.isCheckboxChecked(1);
      assert.isFalse(stateAfterRefresh, 'Expected checkbox 1 to reset to unchecked after refresh, but it was checked');
      stateAfterRefresh = await CheckboxesPage.isCheckboxChecked(2);
      assert.isTrue(stateAfterRefresh, 'Expected checkbox 2 to reset to checked after refresh, but it was not');
    });
  });
});
