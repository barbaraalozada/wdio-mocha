# WebDriverIO + Mocha Test Automation Project

A test automation portfolio project demonstrating QA engineering practices with WebDriverIO, Mocha, and Allure reporting.

> Project base created with [Claude Code](https://claude.com/claude-code). Tests and implementation built by me.

---

## 🎯 Purpose

This is a portfolio project showcasing my ability to build test automation solutions using industry-standard tools. It demonstrates:

- Clean code organization with Page Object Model
- Modern JavaScript testing practices
- Test reporting and documentation
- Practical automation implementation

**Note**: This is a learning/portfolio project, not a production-ready framework or reference implementation.

---

## 🏗️ Architecture

### Project Structure

```
wdio-mocha/
├── src/                          # Source code (reusable components)
│   ├── browser/                  # Browser management and configuration
│   ├── config/                   # Environment and settings
│   ├── elements/                 # Reusable UI element classes (Element Object Model)
│   ├── page/                     # Base page with common methods
│   └── helpers/                  # Utility functions and helpers
│
├── test/                         # Test suite
│   ├── specs/                    # Test specification files
│   ├── pageObjects/              # Page-specific implementations
│   └── data/                     # Test data management
│
├── allure-results/               # Raw test execution data
├── allure-report/                # Generated HTML reports
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

## 📋 Running Tests

### Execute Test Suites

```bash
# Run all tests (headed mode)
npm run all

# Run all tests (headless mode)
npm run all:headless

# Run specific test suite
npm run add:remove:elements
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

- [WebDriverIO Documentation](https://webdriver.io/)
- [Mocha Testing Framework](https://mochajs.org/)
- [Chai Assertion Library](https://www.chaijs.com/)
- [Allure Report Documentation](https://docs.qameta.io/allure/)

---

## 👨‍💻 About This Project

This project demonstrates my test automation skills and approach to building maintainable test suites. It includes:

- Hands-on implementation of test cases
- Application of design patterns (POM)
- Use of modern JavaScript tooling
- Test reporting setup

The project base was generated with Claude Code, allowing me to focus on building tests and applying best practices rather than boilerplate setup.

**Technologies**: JavaScript • WebDriverIO • Mocha • Allure

---

## 📝 Note

This is a portfolio/demonstration project created to showcase test automation capabilities. It is not intended as a production framework or reference implementation.