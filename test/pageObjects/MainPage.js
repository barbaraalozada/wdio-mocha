import { Label } from '../../src/elements/index.js';
import { PreciseTextLocator } from '../../src/helpers/Locator.js';
import BasePage from '../../src/page/BasePage.js';

class MainPage extends BasePage {
  constructor () {
    super(new Label(PreciseTextLocator('Welcome to the-internet'), 'The Internet Label'), 'The Internet Page');
    this.link = (linkName) => new Label(PreciseTextLocator(linkName), `${linkName} Link`);
  }
  async clickLink (linkName) {
    await this.link(linkName).click();
  }
};

export default new MainPage();
