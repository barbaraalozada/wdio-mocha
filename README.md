# WebDriverIO + Mocha Test Automation Framework

A professional test automation framework built with WebDriverIO, Mocha, and JavaScript using ES modules.

> This project base was created using [Claude Code](https://claude.com/claude-code)

## Project Structure

```
wdio-mocha/
├── src/                    # Source code (pages and helpers)
│   ├── page/               # Page Object Model files
│   │   ├── BasePage.js     # Base page with common methods
│   │   └── LoginPage.js    # Login page object example
│   └── helpers/            # Helper utilities
│       ├── Utils.js        # Utility functions
│       └── EnvConfig.js    # Environment configuration helper
├── test/
│   ├── specs/              # Test specification files
│   │   └── exampleTest.js  # Example test cases
│   └── data/               # Test data
│       └── testData.js     # Test data and constants
├── reports/                # Test reports and screenshots
├── wdio.conf.js           # WebDriverIO configuration
├── package.json           # Project dependencies
├── .env                   # Environment variables (not in git)
├── .env.example           # Environment variables template
└── README.md             # This file
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
npm test
```

Run tests in headless mode:
```bash
npm run test:headless
```

Run specific test file:
```bash
npx wdio run wdio.conf.js --spec test/specs/exampleTest.js
```

## Framework Features

### Page Object Model (POM)
- **BasePage**: Contains common methods used across all pages
- **Page Objects**: Each page has its own class with locators and methods
- Promotes code reusability and maintainability

### Project Organization
- **src/**: Source code containing reusable components
  - **page/**: Page object classes (UpperCamelCase naming)
  - **helpers/**: Utility functions and helpers (UpperCamelCase naming)
- **test/**: Test-specific files
  - **specs/**: Test specifications (lowerCamelCase naming)
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
import { expect } from 'chai';
import LoginPage from '../../src/page/LoginPage.js';
import EnvConfig from '../../src/helpers/EnvConfig.js';
import testData from '../data/testData.js';

describe('My Test Suite', () => {

    it('should perform a test action', async () => {
        await LoginPage.open();
        await LoginPage.login(
            EnvConfig.getUsername(),
            EnvConfig.getPassword()
        );

        const message = await LoginPage.getFlashMessage();
        expect(message).to.include(testData.messages.loginSuccess);
    });
});
```

### Creating Page Objects

```javascript
import BasePage from './BasePage.js';

class MyPage extends BasePage {
    get myElement() {
        return $('#element-id');
    }

    async performAction() {
        await this.click(this.myElement);
    }

    open() {
        return super.open('/my-page');
    }
}

export default new MyPage();
```

## Configuration

### WebDriverIO Configuration
Edit [wdio.conf.js](wdio.conf.js) to customize:
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

1. Follow the Page Object Model pattern
2. Keep source code (pages, helpers) in [src/](src/) folder
3. Keep tests and test data in [test/](test/) folder
4. Use UpperCamelCase for class files (BasePage.js, LoginPage.js, Utils.js)
5. Use lowerCamelCase for test files (exampleTest.js, loginTest.js)
6. Use ES module syntax (import/export) - include .js extensions in imports
7. Use descriptive test names
8. Keep tests independent and atomic
9. Use meaningful assertions
10. Store test data separately in [test/data/](test/data/)
11. Keep sensitive data in `.env` file (never commit it)
12. Use EnvConfig helper to access environment variables
13. Implement proper waits (avoid hard waits)
14. Take screenshots on failures
15. Use helper functions for common operations

## Resources

- [WebDriverIO Documentation](https://webdriver.io/)
- [Mocha Documentation](https://mochajs.org/)
- [Chai Assertion Library](https://www.chaijs.com/)

## License

ISC
