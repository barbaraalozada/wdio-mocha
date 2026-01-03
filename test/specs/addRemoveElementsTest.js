import { assert } from 'chai';

import Browser from '../../src/browser/Browser.js';
import EnvConfig from '../../src/helpers/EnvConfig.js';
import addRemoveElementsData from '../../test/data/addRemoveElementsData.js';
import AddRemoveElementsPage from '../pageObjects/AddRemoveElementsPage.js';
import MainPage from '../pageObjects/MainPage.js';

const smallCount = 3;
const mediumCount = 5;
const largeCount = 10;
const veryLargeCount = 100;
const doubleClickCount = 2;
const middleIndex = 3;

describe('Add/Remove Elements', () => {

  beforeEach(async () => {
    await Browser.navigateTo(EnvConfig.getBaseUrl());
    await MainPage.clickLink(addRemoveElementsData.pageTitle);
  });

  describe('UI validation', () => {
    it('[ARE-UI-001] should open the Add/Remove Elements page', async () => {
      await assert.isTrue(await AddRemoveElementsPage.isPageOpened(), 'Expected Add/Remove Elements page to be opened, but it was not');
    });

    it('[ARE-UI-002] should display the Add button', async () => {
      await assert.isTrue(await AddRemoveElementsPage.isAddButtonDisplayed(), 'Expected Add Element button to be displayed, but it was not');
    });

    it('[ARE-UI-003] should the Add button be enabled', async () => {
      await assert.isTrue(await AddRemoveElementsPage.isAddButtonEnabled(), 'Expected Add Element button to be enabled, but it was not');
    });

    it('[ARE-UI-004] should display correct button texts', async () => {
      const actualAddButtonText = await AddRemoveElementsPage.getAddElementButtonText();
      const expectedAddButtonText = addRemoveElementsData.addElementButtonText;
      await AddRemoveElementsPage.clickAddElementButton();
      const actualDeleteButtonText = await AddRemoveElementsPage.getDeleteButtonText();
      const expectedDeleteButtonText = addRemoveElementsData.deleteButtonText;
      assert.equal(actualAddButtonText, expectedAddButtonText, `Expected Add Element button text to be "${expectedAddButtonText}", but got "${actualAddButtonText}"`);
      assert.equal(actualDeleteButtonText, expectedDeleteButtonText, `Expected Delete button text to be "${expectedDeleteButtonText}", but got "${actualDeleteButtonText}"`);
    });

    it('[ARE-UI-005] should the Delete button be enabled', async () => {
      await AddRemoveElementsPage.clickAddElementButton();
      await assert.isTrue(await AddRemoveElementsPage.isDeleteButtonDisplayed(), 'Expected Delete button to be displayed, but it was not');
      await assert.isTrue(await AddRemoveElementsPage.isDeleteButtonEnabled(), 'Expected Delete button to be enabled, but it was not');
    });
  });

  describe('Button interaction', () => {
    it('[ARE-BI-001] should display the Delete button when the Add button is clicked', async () => {
      await AddRemoveElementsPage.clickAddElementButton();
      await assert.isTrue(await AddRemoveElementsPage.isDeleteButtonDisplayed(), 'Expected Delete button to be displayed after clicking Add Element, but it was not');
    });

    it('[ARE-BI-002] should display the Delete button as many times as the Add button is clicked', async () => {
      await AddRemoveElementsPage.clickAddElementButton(smallCount);
      const actualQuantity = await AddRemoveElementsPage.getDeleteButtonQuantity();
      await assert.equal(actualQuantity, smallCount, `Expected ${smallCount} Delete buttons, but found ${actualQuantity}`);
    });

    it('[ARE-BI-003] should decrease the total of Delete buttons when a Delete button is clicked', async () => {
      await AddRemoveElementsPage.clickAddElementButton(smallCount);
      let actualQuantity = await AddRemoveElementsPage.getDeleteButtonQuantity();
      await assert.equal(actualQuantity, smallCount, `Expected ${smallCount} Delete buttons before deletion, but found ${actualQuantity}`);
      await AddRemoveElementsPage.clickDeleteButton();
      actualQuantity = await AddRemoveElementsPage.getDeleteButtonQuantity();
      await assert.equal(actualQuantity, (smallCount - 1), `Expected ${smallCount - 1} Delete buttons after deletion, but found ${actualQuantity}`);
    });

    it('[ARE-BI-004] should remove all Delete buttons when all of them are clicked', async () => {
      await AddRemoveElementsPage.clickAddElementButton(smallCount);
      await assert.equal(await AddRemoveElementsPage.getDeleteButtonQuantity(), smallCount, `The quantity of delete buttons expected is ${smallCount}`);
      await AddRemoveElementsPage.clickAllDeleteButtons();
      await assert.isTrue(await AddRemoveElementsPage.areNoDeleteButtonsDisplayed(), 'Expected no Delete buttons to be displayed, but some were found');
    });
  });

  describe('Edge cases', () => {
    it('[ARE-EC-001] should not throw error when clicking Delete if it does not exist', async () => {
      await assert.isTrue(await AddRemoveElementsPage.areNoDeleteButtonsDisplayed(), 'Expected no Delete buttons to be displayed, but some were found');
      await AddRemoveElementsPage.clickDeleteButton();
    });

    it('[ARE-EC-002] should handle rapid clicks on Add button', async () => {
      await AddRemoveElementsPage.clickAddElementButton(largeCount);
      const actualQuantity = await AddRemoveElementsPage.getDeleteButtonQuantity();
      await assert.equal(actualQuantity, largeCount, `Expected ${largeCount} Delete buttons after rapid clicks, but found ${actualQuantity}`);
    });

    it('[ARE-EC-003] should handle adding and deleting simultaneously', async () => {
      await AddRemoveElementsPage.clickAddElementButton(mediumCount);
      await AddRemoveElementsPage.clickDeleteButton();
      await AddRemoveElementsPage.clickAddElementButton(smallCount);
      await AddRemoveElementsPage.clickDeleteButton();
      const actualQuantity = await AddRemoveElementsPage.getDeleteButtonQuantity();
      const expected = mediumCount + smallCount - 2;
      await assert.equal(actualQuantity, expected, `Expected ${expected} Delete buttons after mixed operations, but found ${actualQuantity}`);
    });

    it('[ARE-EC-004] should handle adding a large number of elements', async () => {
      await AddRemoveElementsPage.clickAddElementButton(veryLargeCount);
      const actualQuantity = await AddRemoveElementsPage.getDeleteButtonQuantity();
      await assert.equal(actualQuantity, veryLargeCount, `Expected ${veryLargeCount} Delete buttons, but found ${actualQuantity}`);
    });

    it('[ARE-EC-005] should delete specific button from middle of list', async () => {
      await AddRemoveElementsPage.clickAddElementButton(mediumCount);
      await AddRemoveElementsPage.clickDeleteButton(middleIndex);
      const actualQuantity = await AddRemoveElementsPage.getDeleteButtonQuantity();
      await assert.equal(actualQuantity, (mediumCount - 1), `Expected ${mediumCount - 1} Delete buttons after deleting one from middle, but found ${actualQuantity}`);
    });

    it('[ARE-EC-006] should handle double click on Add button', async () => {
      await AddRemoveElementsPage.doubleClickAddButton();
      const actualQuantity = await AddRemoveElementsPage.getDeleteButtonQuantity();
      await assert.equal(actualQuantity, doubleClickCount, `Expected exactly ${doubleClickCount} Delete buttons after double click, but found ${actualQuantity}`);
    });

    it('[ARE-EC-007] should maintain state after browser back and forward', async () => {
      await AddRemoveElementsPage.clickAddElementButton(smallCount);
      let actualQuantity = await AddRemoveElementsPage.getDeleteButtonQuantity();
      await assert.equal(actualQuantity, smallCount, `Expected ${smallCount} Delete buttons before navigation`);
      await Browser.back();
      await Browser.forward();
      await AddRemoveElementsPage.isPageOpened();
      actualQuantity = await AddRemoveElementsPage.getDeleteButtonQuantity();
      await assert.equal(actualQuantity, smallCount, `Expected ${smallCount} Delete buttons to persist after back/forward navigation`);
    });
  });

  describe('Page state', () => {
    it('[ARE-PS-001] should clear the page when it is refreshed', async () => {
      await AddRemoveElementsPage.clickAddElementButton(smallCount);
      await Browser.refresh();
      await assert.isTrue(await AddRemoveElementsPage.areNoDeleteButtonsDisplayed(), 'Expected no Delete buttons to be displayed, but some were found');
    });

    it('[ARE-PS-002] should clear state when navigating away and back', async () => {
      await AddRemoveElementsPage.clickAddElementButton(smallCount);
      let actualQuantity = await AddRemoveElementsPage.getDeleteButtonQuantity();
      await assert.equal(actualQuantity, smallCount, `Expected ${smallCount} Delete buttons before navigation`);
      await Browser.back();
      await MainPage.clickLink(addRemoveElementsData.pageTitle);
      await assert.isTrue(await AddRemoveElementsPage.isPageOpened(), 'Expected to return to Add/Remove Elements page');
      await assert.isTrue(await AddRemoveElementsPage.areNoDeleteButtonsDisplayed(), 'Expected state to be cleared after navigating away and back');
    });
  });
});
