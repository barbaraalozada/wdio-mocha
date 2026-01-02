import { assert } from 'chai';

import Browser from '../../src/browser/Browser.js';
import EnvConfig from '../../src/helpers/EnvConfig.js';
import addRemoveElementsData from '../../test/data/addRemoveElementsData.js';
import AddRemoveElementsPage from '../pageObjects/AddRemoveElementsPage.js';
import MainPage from '../pageObjects/MainPage.js';

const times = 3;

describe('Add/Remove Elements', () => {

  beforeEach(async () => {
    await Browser.navigateTo(EnvConfig.getBaseUrl());
    await MainPage.clickLink('Add/Remove Elements');
  });

  it('should open the Add/Remove Elements page', async () => {
    await assert.isTrue(await AddRemoveElementsPage.isPageOpened(), 'Expected Add/Remove Elements page to be opened, but it was not');
    await assert.isTrue(await AddRemoveElementsPage.isAddButtonDisplayed(), 'Expected Add Element button to be displayed, but it was not');
  });

  it('should display the Delete button when the Add button is clicked', async () => {
    await AddRemoveElementsPage.clickAddElementButton();
    await assert.isTrue(await AddRemoveElementsPage.isDeleteButtonDisplayed(), 'Expected Delete button to be displayed after clicking Add Element, but it was not');
  });

  it('should display the Delete button as many times as the Add button is clicked', async () => {
    await AddRemoveElementsPage.clickAddElementButton(times);
    const actualQuantity = await AddRemoveElementsPage.getDeleteButtonQuantity();
    await assert.equal(actualQuantity, times, `Expected ${times} Delete buttons, but found ${actualQuantity}`);
  });

  it('should decrease the total of Delete buttons when a Delete button is clicked', async () => {
    await AddRemoveElementsPage.clickAddElementButton(times);
    let actualQuantity = await AddRemoveElementsPage.getDeleteButtonQuantity();
    await assert.equal(actualQuantity, times, `Expected ${times} Delete buttons before deletion, but found ${actualQuantity}`);
    await AddRemoveElementsPage.clickDeleteButton();
    actualQuantity = await AddRemoveElementsPage.getDeleteButtonQuantity();
    await assert.equal(actualQuantity, (times - 1), `Expected ${times - 1} Delete buttons after deletion, but found ${actualQuantity}`);
  });

  it('should remove all Delete buttons when all of them are clicked', async () => {
    await AddRemoveElementsPage.clickAddElementButton(times);
    await assert.equal(await AddRemoveElementsPage.getDeleteButtonQuantity(), times, `The quantity of delete buttons expected is ${times}`);
    await AddRemoveElementsPage.clickAllDeleteButtons();
    await assert.isTrue(await AddRemoveElementsPage.areNoDeleteButtonsDisplayed(), 'Expected no Delete buttons to be displayed, but some were found');
  });

  it('should not throw error when clicking Delete if it does not exist', async () => {
    await assert.isTrue(await AddRemoveElementsPage.areNoDeleteButtonsDisplayed(), 'Expected no Delete buttons to be displayed, but some were found');
    await AddRemoveElementsPage.clickDeleteButton();
  });

  it('should clear the page when it is refreshed', async () => {
    await AddRemoveElementsPage.clickAddElementButton(times);
    await Browser.refresh();
    assert.isTrue(await AddRemoveElementsPage.areNoDeleteButtonsDisplayed(), 'Expected no Delete buttons to be displayed, but some were found');
  });

  it('should display correct button texts', async () => {
    const actualAddButtonText = await AddRemoveElementsPage.getAddElementButtonText();
    const expectedAddButtonText = addRemoveElementsData.addElementButtonText;
    await AddRemoveElementsPage.clickAddElementButton();
    const actualDeleteButtonText = await AddRemoveElementsPage.getDeleteButtonText();
    const expectedDeleteButtonText = addRemoveElementsData.deleteButtonText;
    assert.equal(actualAddButtonText, expectedAddButtonText, `Expected Add Element button text to be "${actualAddButtonText}", but got "${expectedAddButtonText}"`);
    assert.equal(actualDeleteButtonText, expectedDeleteButtonText, `Expected Delete button text to be "${actualDeleteButtonText}", but got "${expectedDeleteButtonText}"`);
  });
});
