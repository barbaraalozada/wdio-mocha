# WebDriverIO + Mocha Test Automation Project

A test automation portfolio project demonstrating QA engineering practices with WebDriverIO, Mocha, and Allure reporting.

> Project base created with [Claude Code](https://claude.com/claude-code). Tests and implementation built by me.

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
├── docs/                         # Documentation
│   └── test-suites/              # Detailed test suite documentation
│
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
| Dropdown | ⏳ Pending | To define | 0% |
| Dynamic Controls | ⏳ Pending | To define | 0% |
| File Upload | ⏳ Pending | To define | 0% |
| Drag and Drop | ⏳ Pending | To define | 0% |
| Hovers | ⏳ Pending | To define | 0% |
| Sortable Data Tables | ⏳ Pending | To define | 0% |
| File Download | ⏳ Pending | To define | 0% |

**Total Test Cases**: 50 (automated) | **Pending**: 7 test suites

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

**[View Latest Test Report →](https://barbaraalozada.github.io/wdio-mocha/)**

Allure reports provide comprehensive test insights including pass/fail rates, timelines, failure screenshots, and test history. Reports are automatically deployed to GitHub Pages after each test run via GitHub Actions.

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

## 📖 Key Features & Best Practices

**Architecture & Design Patterns**
- Page Object Model (POM) and Element Object Model (EOM) for maintainability
- Separation of concerns: source code in `src/`, tests in `test/`
- Consistent naming conventions (UpperCamelCase for classes, lowerCamelCase for tests)

**Test Implementation**
- Test independence and isolation
- Atomic tests (one behavior per test)
- Smart explicit waits over hard-coded delays
- Automatic screenshot capture on failures
- Meaningful assertions with Chai

**Configuration & Security**
- Environment-based configuration with `.env`
- Secure credential management (gitignored secrets)
- Centralized config access via helpers
- Configurable timeouts and retry logic

**Code Quality & Automation**
- ESLint integration for consistency
- Reusable helper functions and element classes
- Modern JavaScript (ES Modules, async/await)
- Cross-browser support (Chrome configured)
- Headless and headed execution modes
- CI/CD with GitHub Actions

---

## 🔗 Additional Resources

- [WebDriverIO Documentation](https://webdriver.io/)
- [Mocha Testing Framework](https://mochajs.org/)
- [Chai Assertion Library](https://www.chaijs.com/)
- [Allure Report Documentation](https://docs.qameta.io/allure/)
