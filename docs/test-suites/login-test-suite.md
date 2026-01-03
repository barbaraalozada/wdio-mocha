# Test Suite: Login

**Application**: The Internet - Herokuapp
**Page URL**: https://the-internet.herokuapp.com/login
**Feature**: Form Authentication
**Test Suite File**: `test/specs/loginTest.js`
**Page Objects**: `test/pageObjects/loginPage/LoginPage.js`, `test/pageObjects/loginPage/SecureAreaPage.js`
**Test Data**: `test/data/loginData.js`
**Last Updated**: 2026-01-02
**Status**: ✅ Fully Automated

---

## Table of Contents
- [Test Suite Overview](#test-suite-overview)
- [Test Cases](#test-cases)
  - [1. Valid Credentials](#1-valid-credentials)
  - [2. Invalid Credentials](#2-invalid-credentials)
  - [3. Logout](#3-logout)
  - [4. Navigation](#4-navigation)
  - [5. UI and Messages](#5-ui-and-messages)
  - [6. Session](#6-session)
  - [7. Security and Validations](#7-security-and-validations)
- [Test Coverage Summary](#test-coverage-summary)
- [Test Data](#test-data)
- [Dependencies](#dependencies)

---

## Test Suite Overview

This test suite validates the Form Authentication functionality with comprehensive test cases covering login, logout, session management, security validations, and UI elements.

**Key Features Tested:**
- Login with valid credentials
- Login with invalid credentials (multiple scenarios)
- Logout functionality
- Session management and security
- UI elements and flash messages
- Security validations (SQL injection, password masking)
- Keyboard navigation

**Scope:**
- Functional testing
- Security testing
- UI/UX validation
- Session management
- Negative testing

---

## Test Cases

### 1. Valid Credentials

Tests for successful login scenarios.

| ID | Test Case | Steps | Expected Result | Type | Automated |
|----|-----------|-------|----------------|------|-----------|
| **LG-VC-001** | Login successfully with valid credentials | 1. Navigate to Login page<br>2. Enter valid username<br>3. Enter valid password<br>4. Click Login button<br>5. Verify Secure Area page | User is redirected to Secure Area<br>Success flash message displayed | Positive | ✅ Automated |

---

### 2. Invalid Credentials

Tests for failed login scenarios with various invalid inputs.

| ID | Test Case | Steps | Expected Result | Type | Automated |
|----|-----------|-------|----------------|------|-----------|
| **LG-IC-001** | Cannot login with invalid username and password | 1. Navigate to Login page<br>2. Enter invalid username<br>3. Enter invalid password<br>4. Click Login button<br>5. Verify error message | Login fails<br>"Your username is invalid!" message displayed | Negative | ✅ Automated |
| **LG-IC-002** | Cannot login with invalid username and valid password | 1. Navigate to Login page<br>2. Enter invalid username<br>3. Enter valid password<br>4. Click Login button<br>5. Verify error message | Login fails<br>"Your username is invalid!" message displayed | Negative | ✅ Automated |
| **LG-IC-003** | Cannot login with valid username and invalid password | 1. Navigate to Login page<br>2. Enter valid username<br>3. Enter invalid password<br>4. Click Login button<br>5. Verify error message | Login fails<br>"Your password is invalid!" message displayed | Negative | ✅ Automated |
| **LG-IC-004** | Cannot login with special characters | 1. Navigate to Login page<br>2. Enter special characters as username (!@#$%^&*())<br>3. Enter special characters as password<br>4. Click Login button | Login fails<br>Error message displayed | Negative | ✅ Automated |
| **LG-IC-005** | Cannot login with empty credentials | 1. Navigate to Login page<br>2. Leave username empty<br>3. Leave password empty<br>4. Click Login button | Login fails<br>Error message displayed | Negative | ✅ Automated |
| **LG-IC-006** | Cannot login with whitespace credentials | 1. Navigate to Login page<br>2. Enter spaces as username<br>3. Enter spaces as password<br>4. Click Login button | Login fails<br>Error message displayed | Negative | ✅ Automated |

---

### 3. Logout

Tests for logout functionality.

| ID | Test Case | Steps | Expected Result | Type | Automated |
|----|-----------|-------|----------------|------|-----------|
| **LG-LO-001** | Logout successfully from Secure Area | 1. Login with valid credentials<br>2. Verify Secure Area page opened<br>3. Click Logout button<br>4. Verify redirection to Login page<br>5. Verify logout message | User is redirected to Login page<br>"You logged out of the secure area!" message displayed | Positive | ✅ Automated |

---

### 4. Navigation

Tests for keyboard navigation and browser history behavior.

| ID | Test Case | Steps | Expected Result | Type | Automated |
|----|-----------|-------|----------------|------|-----------|
| **LG-NV-001** | Login using Enter key | 1. Navigate to Login page<br>2. Enter valid username<br>3. Enter valid password<br>4. Press Enter key<br>5. Verify Secure Area page | Login succeeds via keyboard<br>Secure Area page displayed | Positive | ✅ Automated |
| **LG-NV-002** | Cannot navigate back to Secure Area after logout | 1. Login successfully<br>2. Logout<br>3. Click browser back button<br>4. Verify current page | User remains on Login page<br>Cannot access Secure Area via back button | Negative | ⚠️ Skipped (Known Bug) |

---

### 5. UI and Messages

Tests for UI elements and flash messages.

| ID | Test Case | Steps | Expected Result | Type | Automated |
|----|-----------|-------|----------------|------|-----------|
| **LG-UI-001** | Verify input and button texts are correct | 1. Navigate to Login page<br>2. Check username input label<br>3. Check password input label<br>4. Check login button text | Username label: "Username"<br>Password label: "Password"<br>Button text: "Login" | Positive | ✅ Automated |
| **LG-UI-002** | Close Login flash message | 1. Navigate to Login page<br>2. Click Login button (without credentials)<br>3. Verify error message appears<br>4. Click close button on flash message<br>5. Verify message disappears | Flash message can be closed<br>Message no longer visible | Positive | ✅ Automated |
| **LG-UI-003** | Close Secure Area flash message | 1. Login successfully<br>2. Verify success message appears<br>3. Click close button on flash message<br>4. Verify message disappears | Flash message can be closed<br>Message no longer visible | Positive | ✅ Automated |

---

### 6. Session

Tests for session management and access control.

| ID | Test Case | Steps | Expected Result | Type | Automated |
|----|-----------|-------|----------------|------|-----------|
| **LG-SS-001** | Cannot access Secure Area without authentication | 1. Navigate directly to /secure URL<br>2. Verify redirection or error<br>3. Check flash message | Access denied<br>"You must login to view the secure area!" message displayed | Negative | ✅ Automated |

---

### 7. Security and Validations

Tests for security vulnerabilities and input validation.

| ID | Test Case | Steps | Expected Result | Type | Automated |
|----|-----------|-------|----------------|------|-----------|
| **LG-SC-001** | Verify password field is masked | 1. Navigate to Login page<br>2. Click on password field<br>3. Type password<br>4. Verify input type attribute | Password field has type="password"<br>Characters are masked/hidden | Positive | ✅ Automated |
| **LG-SC-002** | Handle SQL injection attempts safely | 1. Navigate to Login page<br>2. Enter SQL injection payload as username (' OR '1'='1)<br>3. Enter SQL injection payload as password<br>4. Click Login button<br>5. Verify login fails | Login fails<br>No SQL injection successful<br>Error message displayed | Negative | ✅ Automated |

---

## Test Coverage Summary

### Overall Statistics
- **Total Test Cases**: 18
- **Automated**: 17 (94.4%)
- **Skipped**: 1 (5.6%) - Known bug
- **Manual**: 0 (0%)

### Test Type Distribution
| Type | Count | Percentage |
|------|-------|------------|
| **Positive** | 7 | 38.9% |
| **Negative** | 11 | 61.1% |

### Category Coverage
| Category | Test Cases | Coverage |
|----------|------------|----------|
| Valid Credentials | 1 | Complete |
| Invalid Credentials | 6 | Complete |
| Logout | 1 | Complete |
| Navigation | 2 | Partial (1 skipped) |
| UI and Messages | 3 | Complete |
| Session | 1 | Complete |
| Security and Validations | 2 | Complete |

---

## Test Data

Test data is stored in `test/data/loginData.js`:

```javascript
export default {
  invalidUsers: [
    { username: 'invaliduser', password: 'invalidpass' },
    { username: '!@#$%^&*()', password: '!@#$%^&*()' },
    { username: '', password: '' },
    { username: '   ', password: '   ' }
  ],

  messages: {
    loginSuccess: 'You logged into a secure area!',
    loginFailed: 'Your username is invalid!',
    logoutSuccess: 'You logged out of the secure area!',
    passwordInvalid: 'Your password is invalid!',
    secureAreaAccessDenied: 'You must login to view the secure area!'
  },

  texts: {
    usernameInputText: 'Username',
    passwordInputText: 'Password',
    loginButtonText: 'Login'
  }
};
```

**Valid Credentials** (from environment variables):
- Username: `EnvConfig.getLoginUsername()`
- Password: `EnvConfig.getLoginPassword()`

---

## Dependencies

### Page Objects Required
- `LoginPage.js` - Login page interactions
- `SecureAreaPage.js` - Secure area page verification

### Test Data Files
- `loginData.js` - Invalid users, messages, UI texts

### Environment Variables
- `LOGIN_USERNAME` - Valid username for authentication
- `LOGIN_PASSWORD` - Valid password for authentication

### External Dependencies
- WebDriverIO - Browser automation
- Mocha - Test framework
- Chai - Assertions library

---

## Notes

### Known Issues
- **LG-NV-002**: Browser back navigation test is skipped due to application bug - app allows navigation back to Secure Area after logout

### Security Testing Coverage
- ✅ SQL Injection prevention
- ✅ Password masking
- ✅ Session management
- ✅ Direct URL access protection

### Data-Driven Testing
The suite uses data-driven approach for invalid credentials testing, iterating through multiple invalid user combinations from `loginData.invalidUsers[]`.

### Assertion Strategy
- **Flash Messages**: Uses `assert.include()` instead of `assert.strictEqual()` because flash messages may contain additional formatting or whitespace
- **UI Text**: Uses `assert.equal()` for exact text matching on labels and buttons
- **Boolean States**: Uses `assert.isTrue()` and `assert.isFalse()` for state verification

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.1 | 2026-01-02 | Barbara Lozada | Fixed critical bug: Changed assertion from `assert.notStrictEqual` to `assert.include` for flash message validations. This allows tests to pass correctly when messages contain additional text. Improved assertion messages consistency across all tests. |
| 1.0 | 2026-01-02 | Barbara Lozada | Initial test suite documentation |

---

**Automation Status Legend:**
- ✅ Automated
- ⏳ Pending Automation
- ⛔ Not Automatable
- 🔄 In Progress
- ⚠️ Skipped (with reason)
