import { assert } from 'chai';

import Browser from '../../src/browser/Browser.js';
import EnvConfig from '../../src/helpers/EnvConfig.js';
import AddRemoveElementsPage from '../pageObjects/AddRemoveElementsPage.js';
import MainPage from '../pageObjects/MainPage.js';

describe('Add/Remove Elements Test', () => {

  beforeEach(async () => {
    await Browser.navigateTo(EnvConfig.getBaseUrl());
    await MainPage.clickLink('Add/Remove Elements');
  });

  it('should open the Add/Remove Elements page', async () => {
    await assert.isTrue(await AddRemoveElementsPage.isPageOpened(), 'The Add/Remove Elements page is not opened');
    await assert.isTrue(await AddRemoveElementsPage.isAddButtonDisplayed(), 'The Add button is not displayed');
  });

  it('should display the Delete button when the Add button is clicked', async () => {
    await AddRemoveElementsPage.clickAddElementButton();
    await assert.isTrue(await AddRemoveElementsPage.isDeleteButtonDisplayed(), 'The Delete button is not displayed');
  });

  it.only('should display the Delete button as many times as the Add button is clicked', async () => {
    await AddRemoveElementsPage.clickAddElementButton();
    await AddRemoveElementsPage.clickAddElementButton();
    await AddRemoveElementsPage.clickAddElementButton();
    await assert.equal(await AddRemoveElementsPage.getDeleteButtonQuantity(), 3, 'The quantity of delete buttons is not the expected');
  });
});
