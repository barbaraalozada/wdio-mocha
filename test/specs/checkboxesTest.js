import { assert } from 'chai';

import Browser from '../../src/browser/Browser.js';
import EnvConfig from '../../src/helpers/EnvConfig.js';
import checkboxesData from '../../test/data/checkboxesData.js';
import CheckboxesPage from '../../test/pageObjects/CheckboxesPage.js';
import MainPage from '../pageObjects/MainPage.js';

describe('Checkboxes', () => {

  beforeEach(async () => {
    await Browser.navigateTo(EnvConfig.getBaseUrl());
    await MainPage.clickLink('Checkboxes');
  });

  describe('UX/UI', () => {
    it('should display both checkboxes as visible', async () => {
      assert.isTrue(await CheckboxesPage.isCheckboxDisplayed(1), 'Expected checkbox 1 to be displayed');
      assert.isTrue(await CheckboxesPage.isCheckboxDisplayed(2), 'Expected checkbox 2 to be displayed');
    });

    it('should display both checkboxes as enabled/clickable', async () => {
      assert.isTrue(await CheckboxesPage.isCheckboxEnabled(1), 'Expected checkbox 1 to be enabled');
      assert.isTrue(await CheckboxesPage.isCheckboxEnabled(2), 'Expected checkbox 2 to be enabled');
    });
    it('should verify checkbox labels text', async () => {
      const actualCheckbox1Text = await CheckboxesPage.getCheckboxText(1);
      const expectedCheckbox1Text = checkboxesData.texts.checkbox1;
      assert.equal(actualCheckbox1Text, expectedCheckbox1Text, `Expected Checkbox 1 text to be "${expectedCheckbox1Text}", but got "${actualCheckbox1Text}"`);
      const actualCheckbox2Text = await CheckboxesPage.getCheckboxText(2);
      const expectedCheckbox2Text = checkboxesData.texts.checkbox2;
      assert.equal(actualCheckbox2Text, expectedCheckbox2Text, `Expected Checkbox 1 text to be "${expectedCheckbox2Text}", but got "${actualCheckbox2Text}"`);
    });

    describe('Initial state', () => {
      it('should display checkbox 1 unchecked and checkbox 2 checked by default', async () => {
        assert.isTrue(await CheckboxesPage.isPageOpened(), 'Expected Checkboxes page to be opened, but it was not');
        assert.isFalse(await CheckboxesPage.isCheckboxChecked(1), 'Expected checkbox 1 to not be checked, but it was checked');
        assert.isTrue(await CheckboxesPage.isCheckboxChecked(2), 'Expected checkbox 2 to be checked, but it was not');
      });
    });

    describe('Interaction with the checkboxes', () => {

      it('should check and uncheck checkbox 1 successfully', async () => {
        assert.isFalse(await CheckboxesPage.isCheckboxChecked(1), 'Expected checkbox 1 to not be checked, but it was checked');
        await CheckboxesPage.checkCheckbox(1);
        assert.isTrue(await CheckboxesPage.isCheckboxChecked(1), 'Expected checkbox 1 to be checked, but it was not');
        await CheckboxesPage.uncheckCheckbox(1);
        assert.isFalse(await CheckboxesPage.isCheckboxChecked(1), 'Expected checkbox 1 to not be checked, but it was checked');
      });

      it('should uncheck and check checkbox 2 successfully', async () => {
        assert.isTrue(await CheckboxesPage.isCheckboxChecked(2), 'Expected checkbox 2 to be checked, but it was not');
        await CheckboxesPage.uncheckCheckbox(2);
        assert.isFalse(await CheckboxesPage.isCheckboxChecked(2), 'Expected checkbox 2 to not be checked, but it was checked');
        await CheckboxesPage.checkCheckbox(2);
        assert.isTrue(await CheckboxesPage.isCheckboxChecked(2), 'Expected checkbox 2 to be checked, but it was not');
      });

      it('should check checkbox 1 and uncheck checkbox 2 successfully', async () => {
        assert.isFalse(await CheckboxesPage.isCheckboxChecked(1), 'Expected checkbox 1 to not be checked, but it was checked');
        assert.isTrue(await CheckboxesPage.isCheckboxChecked(2), 'Expected checkbox 2 to be checked, but it was not');
        await CheckboxesPage.checkCheckbox(1);
        await CheckboxesPage.uncheckCheckbox(2);
        assert.isTrue(await CheckboxesPage.isCheckboxChecked(1), 'Expected checkbox 1 to be checked, but it was not');
        assert.isFalse(await CheckboxesPage.isCheckboxChecked(2), 'Expected checkbox 2 to not be checked, but it was checked');
      });

      it('should check and uncheck checkbox 1 without affecting checkbox 2', async () => {
        assert.isFalse(await CheckboxesPage.isCheckboxChecked(1), 'Expected checkbox 1 to not be checked, but it was checked');
        assert.isTrue(await CheckboxesPage.isCheckboxChecked(2), 'Expected checkbox 2 to be checked, but it was not');
        await CheckboxesPage.checkCheckbox(1);
        assert.isTrue(await CheckboxesPage.isCheckboxChecked(1), 'Expected checkbox 1 to be checked, but it was not');
        assert.isTrue(await CheckboxesPage.isCheckboxChecked(2), 'Expected checkbox 2 to be checked, but it was not');
        await CheckboxesPage.uncheckCheckbox(1);
        assert.isFalse(await CheckboxesPage.isCheckboxChecked(1), 'Expected checkbox 1 to not be checked, but it was checked');
        assert.isTrue(await CheckboxesPage.isCheckboxChecked(2), 'Expected checkbox 2 to be checked, but it was not');
      });

      it('should uncheck and check checkbox 2 without affecting checkbox 1', async () => {
        assert.isFalse(await CheckboxesPage.isCheckboxChecked(1), 'Expected checkbox 1 to not be checked, but it was checked');
        assert.isTrue(await CheckboxesPage.isCheckboxChecked(2), 'Expected checkbox 2 to be checked, but it was not');
        await CheckboxesPage.uncheckCheckbox(2);
        assert.isFalse(await CheckboxesPage.isCheckboxChecked(1), 'Expected checkbox 1 to not be checked, but it was checked');
        assert.isFalse(await CheckboxesPage.isCheckboxChecked(2), 'Expected checkbox 2 to not be checked, but it was checked');
        await CheckboxesPage.checkCheckbox(2);
        assert.isFalse(await CheckboxesPage.isCheckboxChecked(1), 'Expected checkbox 1 to not be checked, but it was checked');
        assert.isTrue(await CheckboxesPage.isCheckboxChecked(2), 'Expected checkbox 2 to be checked, but it was not');
      });

      it('should alternate state correctly after multiple consecutive clicks on checkbox 1', async () => {
        let expectedState = false;
        for (let i = 0; i < 5; i++) {
          await CheckboxesPage.toggleCheckbox(1);
          expectedState = !expectedState;
          const actualState = await CheckboxesPage.isCheckboxChecked(1);
          assert.equal(actualState, expectedState, `Expected checkbox 1 to be ${expectedState ? 'checked' : 'unchecked'} after click ${i + 1}`);
        }
      });

      it('should alternate state correctly after multiple consecutive clicks on checkbox 2', async () => {
        let expectedState = true;
        for (let i = 0; i < 5; i++) {
          await CheckboxesPage.toggleCheckbox(2);
          expectedState = !expectedState;
          const actualState = await CheckboxesPage.isCheckboxChecked(2);
          assert.equal(actualState, expectedState, `Expected checkbox 1 to be ${expectedState ? 'checked' : 'unchecked'} after click ${i + 1}`);
        }
      });
    });
  });
});
