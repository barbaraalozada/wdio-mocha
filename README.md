# WebDriverIO + Mocha Test Automation Project

A test automation portfolio project demonstrating QA engineering practices with WebDriverIO, Mocha, and Allure reporting.

> Project base created with [Claude Code](https://claude.com/claude-code). Tests and implementation built by me.

---

## 👨‍💻 About the Project

This portfolio project demonstrates my test automation skills using industry-standard tools and practices. 

Key highlights:
- End-to-end test implementation and ownership
- Clean architecture using POM, EOM, and shared base layers
- Data-driven testing and reusable components
- CI-integrated reporting with GitHub Pages

The project base was generated with Claude Code to handle initial boilerplate, allowing me to focus on test development and applying automation best practices.

---

## 🧪 Tech Stack

- **WebdriverIO** – Browser automation
- **Mocha** – Test framework
- **JavaScript**
- **Page Object Model (POM)**
- **Allure Reports**
- **GitHub Actions** – CI

---

## 🏗️ Project Structure

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

---

## 🚀 Getting Started

### Prerequisites

- Node.js 14+
- npm 6+
- Chrome browser

### Installation

```bash
# Clone the repository
git clone https://github.com/barbaraalozada/wdio-mocha.git
cd wdio-mocha

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your configuration values
```

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

# Generate and open Allure report
npm run allure:report
```
---

## 🧭 Testing Strategy

This project follows a risk-based testing approach:
- Priority is given to critical and high-impact user flows
- Automated tests focus on stable and repeatable scenarios
- Tests are isolated and independent
- Coverage is expanded incrementally based on risk and value

> The number of scenarios is intentionally limited to demonstrate framework design, structure, and execution strategy.
> The framework is designed to scale with additional regression and edge-case coverage.

---

## 🔐 Security Awareness

- Credentials and environment-specific data are managed via environment variables
- Sensitive information is not hardcoded or logged
- Authentication flows are validated at a functional level only
- In a production environment, security testing would be handled through dedicated reviews and tooling.

---

## 🔄 CI/CD & Quality Gates

Automated tests are integrated into a CI pipeline using GitHub Actions to provide fast feedback on code changes.

### Quality Signals

- Critical and smoke tests are prioritized
- Failures in key user flows indicate release risk
- Test results are reviewed across executions to identify stability trends
- CI execution is used as a quality indicator, not a strict deployment blocker, for portfolio demonstration purposes.

> Note:
> For demonstration purposes, the CI/CD pipeline is currently executed manually via GitHub Actions.
> In a production environment, test execution would typically be triggered automatically on pull requests and merges.

### Test Reports (GitHub Pages)

Allure reports are generated after each test execution to provide clear visibility into test results, failures, and execution details. Reports are automatically published to GitHub Pages via GitHub Actions to support continuous quality review after each CI run.

**[View Latest Allure Report →](https://barbaraalozada.github.io/wdio-mocha/)**

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

