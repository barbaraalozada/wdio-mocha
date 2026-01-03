# WebDriverIO + Mocha Test Automation Project

A test automation portfolio project demonstrating QA engineering practices with WebDriverIO, Mocha, and Allure reporting.

> Project base created with [Claude Code](ht**************************de). Tests and implementation built by me.

---

## 👨‍💻 About This Project

This portfolio project demonstrates my test automation skills using industry-standard tools and practices. Key highlights:

- **Test Implementation**: I built all test cases and page objects
- **Design Patterns**: Applied Page Object Model for maintainability
- **Modern JavaScript**: Used ES Modules and async/await patterns
- **Test Reporting**: Configured Allure for comprehensive test reports

The project base was generated with Claude Code to handle initial boilerplate, allowing me to focus on test development and applying automation best practices.

**Technologies**: JavaScript • WebDriverIO • Mocha • Allure Report

---

## 🏗️ Architecture

### Project Structure

```ini
wdio-mocha/
├── src/                          # Source code (reusable components)
│   ├── browser/                  # Browser management and configuration
│   ├── config/                   # Environment and settings
│   ├── elements/                 # Reusable UI element classes (Element Object Model)
│   ├── helpers/                  # Utility functions and helpers
│   └── page/                     # Base page with common methods
│
├── test/                         # Test suite
│   ├── data/                     # Test data management
│   ├── pageObjects/              # Page-specific implementations
│   └── specs/                    # Test specification files
│
├── allure-results/               # Raw test execution data (created automatically)
├── allure-report/                # Generated HTML reports (created after running "npm run allure:report")
│
├── .env                          # Environment variables (gitignored)
├── .env.example                  # Environment template
├── package.json                  # Dependencies and scripts
├── eslint.config.js              # Code quality rules
└── jsconfig.json                 # JavaScript configuration
```

### Design Patterns

**Page Object Model (POM)**

- Separates page structure from test logic
- Improves code reusability and maintainability
- Centralizes element locators

**Element Object Model (EOM)**

- Abstracts common UI elements (buttons, inputs, etc.)
- Promotes DRY (Don't Repeat Yourself) principles
- Simplifies test maintenance

**BasePage Pattern**

- Common methods shared across all pages
- Consistent wait strategies and interactions
- Screenshot capture for debugging

---

## 🚀 Getting Started

### Prerequisites

- Node.js 14+
- npm 6+
- Chrome browser

### Installation

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your configuration values
```

---

## 📋 Test Documentation

Comprehensive test suite documentation is available for each feature:

| Test Suite | Status | Test Cases | Automation |
|------------|--------|------------|------------|
| [Login](docs/test-suites/login-test-suite.md) | ✅ Automated | 18 | 94.4% |
| [Checkboxes](docs/test-suites/checkboxes-test-suite.md) | ✅ Automated | 14 | 100% |
| [Add/Remove Elements](docs/test-suites/add-remove-elements-test-suite.md) | ✅ Automated | 18 | 100% |
| [Dropdown](docs/test-suites/dropdown-test-suite.md) | ⏳ Pending | 19 | 0% |

**Total Test Cases**: 69 | **Automated**: 50 (72.5%)

Each test suite document includes:

- Test suite overview with scope and objectives
- Detailed test cases organized by category
- Step-by-step execution instructions
- Expected results and validation criteria
- Test type classification (Positive/Negative)
- Automation status tracking
- Test coverage metrics and statistics

---

## 🧪 Running Tests

### Execute Test Suites

```bash
# Run all tests (headed mode)
npm run all

# Run all tests (headless mode)
npm run all:headless

# Run all tests (debug mode, do not generate the report)
npm run all:debug

# Run specific test suite
npm run add:remove:elements
npm run login
npm run checkboxes

#Run specific test suite (debug mode)
npm run add:remove:elements:debug
npm run login:debug
npm run checkboxes:debug
```

### Code Quality

```bash
# Lint code
npm run lint

# Auto-fix linting issues
npm run lint:fix
```

### Test Reports

```bash
# Generate and open Allure report
npm run allure:report
```

---

## 🛠️ Tech Stack

### Core Stack

| Tool | Purpose |
|------|---------|
| **WebDriverIO v9** | Browser automation and test execution |
| **Mocha** | Test framework with BDD syntax |
| **Chai v6** | Assertion library for test validation |

### Development Tools

| Tool | Purpose |
|------|---------|
| **ESLint v9** | Code quality and consistency enforcement |
| **dotenv** | Environment variable management |
| **ES Modules** | Modern JavaScript module system |

### Reporting

| Tool | Purpose |
|------|---------|
| **Allure Report** | Rich test reports with history, screenshots, and trends |

### Browser Support

| Browser | Driver |
|---------|--------|
| **Chrome** | ChromeDriver (auto-managed) |

---

## 📚 Project Features

### Automation Capabilities

- ✅ Cross-browser support (Chrome configured)
- ✅ Headless and headed execution modes
- ✅ Configurable timeouts and retry logic
- ✅ Automatic screenshot capture on failures
- ✅ Environment-based configuration
- ✅ Secure credential management

### Code Quality

- ✅ ESLint integration for code consistency
- ✅ POM architecture for maintainability
- ✅ Descriptive naming conventions
- ✅ DRY and KISS principles

### Reporting

- ✅ Detailed Allure reports with:
   - Test execution history
   - Visual screenshots on failure
   - Test categorization
   - Trend analysis
   - Suite/test timing metrics

---

## 📖 Best Practices Implemented

### Code Organization

1. **Separation of Concerns**: Source code in `src/`, tests in `test/`
2. **Naming Conventions**:
   - **Classes**: UpperCamelCase (e.g., `BasePage.js`, `LoginPage.js`)
   - **Tests**: lowerCamelCase (e.g., `loginTest.js`)
   - **Variables/Methods**: Descriptive, intention-revealing names

### Testing Principles

3. **Test Independence**: Each test runs in isolation
4. **Atomic Tests**: One test validates one behavior
5. **Meaningful Assertions**: Clear, specific validations using Chai
6. **Data Management**: Test data separated in `test/data/`

### Security & Configuration

7. **Environment Variables**: Sensitive data in `.env` (never committed)
8. **Config Helper**: Centralized access via `EnvConfig`

### Automation Best Practices

9. **Smart Waits**: Explicit waits over hard-coded delays
10. **Error Handling**: Screenshots automatically captured on failures
11. **Reusability**: Helper functions and element classes for common operations
12. **Logging**: Consistent logging via Logger helper
13. **Flexible Locators**: Strategy pattern for element location

### Modern JavaScript

14. **ES Modules**: Import/export syntax with `.js` extensions
15. **Async/Await**: Clean asynchronous code handling

---

## 📈 Sample Test Report

Allure reports provide comprehensive insights:

- **Overview Dashboard**: Pass/fail rates, test duration, history graphs
- **Suites View**: Organized by test suites and categories
- **Timeline**: Visual representation of test execution
- **Behaviors**: Tests grouped by features and stories
- **Packages**: Tests organized by package structure

---

## 🔗 Additional Resources

- [WebDriverIO Documentation](ht****************io/)
- [Mocha Testing Framework](ht***************rg/)
- [Chai Assertion Library](ht******************om/)
- [Allure Report Documentation](ht*************************re/)
