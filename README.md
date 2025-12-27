# WebDriverIO + Mocha Test Automation Framework

A professional test automation framework built with WebDriverIO, Mocha, and JavaScript using ES modules.

> This project base was created using [Claude Code](https://claude.com/claude-code)

## Project Structure

```
wdio-mocha/
├── src/                          # Source code (elements, pages, and helpers)
│   ├── browser/                  # Browser management
│   │   └── Browser.js            # Browser utilities
│   ├── config/                   # Configuration files
│   │   └── wdio.conf.js          # WebDriverIO configuration
│   ├── elements/                 # Reusable UI element classes
│   │   ├── BaseElement.js        # Base element with common methods
│   │   ├── Button.js             # Button element
│   │   ├── Input.js              # Input element
│   │   ├── Label.js              # Label element
│   │   ├── Link.js               # Link element
│   │   ├── Checkbox.js           # Checkbox element
│   │   ├── Dropdown.js           # Dropdown element
│   │   ├── RadioButton.js        # Radio button element
│   │   ├── TextArea.js           # Text area element
│   │   ├── FileUpload.js         # File upload element
│   │   ├── Table.js              # Table element
│   │   ├── List.js               # List element
│   │   ├── Frame.js              # Frame element
│   │   ├── Image.js              # Image element
│   │   └── index.js              # Element exports
│   ├── page/                     # Page Object Model files
│   │   └── BasePage.js           # Base page with common methods
│   └── helpers/                  # Helper utilities
│       ├── Utils.js              # Utility functions
│       ├── EnvConfig.js          # Environment configuration helper
│       ├── Logger.js             # Logging utility
│       └── Locator.js            # Locator strategies
├── test/
│   ├── specs/                    # Test specification files
│   │   └── addRemoveElementsTest.js  # Example test
│   ├── pageObjects/              # Page object instances
│   │   ├── AddRemoveElementsPage.js  # Add/Remove Elements page
│   │   └── MainPage.js           # Main page
│   └── data/                     # Test data
│       └── testData.js           # Test data and constants
├── allure-results/               # Allure test results
├── allure-report/                # Generated Allure reports
├── package.json                  # Project dependencies
├── eslint.config.js              # ESLint configuration
├── jsconfig.json                 # JavaScript configuration
├── .env                          # Environment variables (not in git)
├── .env.example                  # Environment variables template
└── README.md                     # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Chrome browser

## Installation

1. Install all dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your actual values
# The .env file contains sensitive data and is gitignored
```

## Running Tests

Run all tests:
```bash
npm run all
```

Run tests in headless mode:
```bash
npm run all:headless
```

Run specific test (Add/Remove Elements):
```bash
npm run add:remove:elements
```

Run specific test file:
```bash
npx wdio run src/config/wdio.conf.js --spec test/specs/addRemoveElementsTest.js
```

Run ESLint:
```bash
npm run lint
```

Fix ESLint issues:
```bash
npm run lint:fix
```

Generate and open Allure report:
```bash
npm run allure:report
```

## Framework Features

### Page Object Model (POM)
- **BasePage**: Contains common methods used across all pages
- **Page Objects**: Each page has its own class with locators and methods
- Promotes code reusability and maintainability

### Project Organization
- **src/**: Source code containing reusable components
  - **browser/**: Browser management utilities
  - **elements/**: Reusable UI element classes following Element Object Model
  - **page/**: Base page classes (UpperCamelCase naming)
  - **helpers/**: Utility functions and helpers (UpperCamelCase naming)
- **test/**: Test-specific files
  - **specs/**: Test specifications (lowerCamelCase naming)
  - **pageObjects/**: Page object instances (UpperCamelCase naming)
  - **data/**: Test data and configuration (lowerCamelCase naming)

### Key Capabilities
- Chrome browser automation
- Mocha test framework with BDD syntax
- Chai assertion library
- Environment variable management with dotenv
- Secure handling of sensitive data
- Screenshot capture functionality
- Configurable timeouts and retries
- Detailed test reporting

## Tools and Technologies

### Testing Framework
- **WebDriverIO v9** - Browser automation framework
- **Mocha** - Test framework with BDD syntax
- **Chai v6** - Assertion library for test validation

### Code Quality
- **ESLint v9** - JavaScript linter for code quality and consistency

### Reporting
- **Allure Report** - Advanced test reporting with rich visualizations
  - Detailed test execution history
  - Screenshots on failure
  - Test categorization and trends
  - Generate reports: `allure generate allure-results --clean && allure open`
- **Spec Reporter** - Console output for test results

### Module System
- **ES Modules** - Modern JavaScript module system with import/export syntax

### Browser Drivers
- **ChromeDriver** - Automated Chrome browser driver

## Writing Tests

### Basic Test Structure

```javascript
import { assert } from 'chai';
import Browser from '../../src/browser/Browser.js';
import EnvConfig from '../../src/helpers/EnvConfig.js';
import AddRemoveElementsPage from '../pageObjects/AddRemoveElementsPage.js';
import MainPage from '../pageObjects/MainPage.js';

describe('My Test Suite', () => {

    beforeEach(async () => {
        await Browser.navigateTo(EnvConfig.getBaseUrl());
        await MainPage.clickLink('Add/Remove Elements');
    });

    it('should perform a test action', async () => {
        await assert.isTrue(
            await AddRemoveElementsPage.isPageOpened(),
            'The Add/Remove Elements page is not opened'
        );
    });
});
```

### Creating Page Objects

```javascript
import { Label, Button } from '../../src/elements/index.js';
import { PreciseTextLocator } from '../../src/helpers/Locator.js';
import BasePage from '../../src/page/BasePage.js';

class MyPage extends BasePage {
    constructor() {
        super(
            new Label(PreciseTextLocator('Page Title'), 'Page Title Label'),
            'My Page'
        );
        this.myButton = new Button('//button[@id="my-button"]', 'My Button');
    }

    async clickMyButton() {
        await this.myButton.click();
    }

    async isButtonDisplayed() {
        return this.myButton.state().waitForDisplayed();
    }
}

export default new MyPage();
```

## Configuration

### WebDriverIO Configuration
Edit [wdio.conf.js](src/config/wdio.conf.js) to customize:
- Browser capabilities
- Base URL
- Timeouts
- Reporters
- Hooks

### Environment Variables
Edit [.env](.env) to configure:
- `BASE_URL` - Application URL to test
- `TEST_USERNAME` - Test user credentials
- `TEST_PASSWORD` - Test user password
- `HEADLESS` - Run browser in headless mode
- `DEFAULT_TIMEOUT` - Default wait timeout
- `ENVIRONMENT` - Test environment (dev, staging, production)
- `API_KEY` - API credentials (if needed)
- And more (see [.env.example](.env.example))

### Using Environment Variables in Tests

```javascript
import EnvConfig from '../../src/helpers/EnvConfig.js';

// Access environment variables
const baseUrl = EnvConfig.getBaseUrl();
const username = EnvConfig.getUsername();
const password = EnvConfig.getPassword();
```

## Best Practices

1. Follow the Page Object Model and Element Object Model patterns
2. Keep source code (elements, pages, helpers) in [src/](src/) folder
3. Keep tests, page objects, and test data in [test/](test/) folder
4. Use UpperCamelCase for class files (BasePage.js, Button.js, Utils.js)
5. Use lowerCamelCase for test files (addRemoveElementsTest.js)
6. Use ES module syntax (import/export) - include .js extensions in imports
7. Use descriptive test names
8. Keep tests independent and atomic
9. Use meaningful assertions with Chai
10. Store test data separately in [test/data/](test/data/)
11. Keep sensitive data in `.env` file (never commit it)
12. Use EnvConfig helper to access environment variables
13. Implement proper waits (avoid hard waits)
14. Take screenshots on failures (automatically configured)
15. Use helper functions and reusable element classes for common operations
16. Use the Logger helper for consistent logging
17. Use Locator strategies for flexible element location

## Resources

- [WebDriverIO Documentation](https://webdriver.io/)
- [Mocha Documentation](https://mochajs.org/)
- [Chai Assertion Library](https://www.chaijs.com/)
- [Allure Report Documentation](https://docs.qameta.io/allure/)
