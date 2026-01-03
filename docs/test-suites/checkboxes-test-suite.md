# Test Suite: Checkboxes

**Application**: The Internet - Herokuapp
**Page URL**: https://the-internet.herokuapp.com/checkboxes
**Feature**: Checkboxes Interaction
**Test Suite File**: `test/specs/checkboxesTest.js`
**Page Object**: `test/pageObjects/CheckboxesPage.js`
**Test Data**: `test/data/checkboxesData.js`
**Last Updated**: 2026-01-02
**Status**: ✅ Fully Automated

---

## Table of Contents
- [Test Suite Overview](#test-suite-overview)
- [Test Cases](#test-cases)
  - [1. UI Validation](#1-ui-validation)
  - [2. Checkboxes Interaction](#2-checkboxes-interaction)
  - [3. Edge Cases](#3-edge-cases)
- [Test Coverage Summary](#test-coverage-summary)
- [Test Data](#test-data)
- [Dependencies](#dependencies)

---

## Test Suite Overview

This test suite validates the Checkboxes functionality with comprehensive test cases covering UI validation, basic interactions, and edge cases including independence testing, multiple interactions, state persistence, and accessibility.

**Key Features Tested:**
- Checkbox visibility and accessibility
- Default state verification
- Check and uncheck operations
- Multiple checkbox interactions
- Independence between checkboxes
- State consistency after multiple clicks
- Page refresh behavior
- Keyboard interaction (Space key)

**Scope:**
- UI/UX validation
- Functional testing
- State management
- User interaction patterns
- Edge cases and accessibility

---

## Test Cases

### 1. UI Validation

Tests focused on visual elements, user interface components, and initial state verification.

| ID | Test Case | Steps | Expected Result | Type | Automated |
|----|-----------|-------|----------------|------|-----------|
| **CB-UI-001** | Verify Checkboxes page opens successfully | 1. Navigate to base URL<br>2. Click on "Checkboxes" link<br>3. Verify page is opened | Checkboxes page loads successfully | Positive | ✅ Automated |
| **CB-UI-002** | Verify both checkboxes are visible | 1. Navigate to Checkboxes page<br>2. Check checkbox 1 visibility<br>3. Check checkbox 2 visibility | Both checkboxes are displayed on page | Positive | ✅ Automated |
| **CB-UI-003** | Verify both checkboxes are enabled | 1. Navigate to Checkboxes page<br>2. Check checkbox 1 enabled state<br>3. Check checkbox 2 enabled state | Both checkboxes are enabled and clickable | Positive | ✅ Automated |
| **CB-UI-004** | Verify checkbox labels text | 1. Navigate to Checkboxes page<br>2. Get checkbox 1 label text<br>3. Get checkbox 2 label text<br>4. Compare with expected values | Checkbox 1: "checkbox 1"<br>Checkbox 2: "checkbox 2" | Positive | ✅ Automated |
| **CB-UI-005** | Verify initial state of checkboxes | 1. Navigate to Checkboxes page<br>2. Verify page is loaded<br>3. Check checkbox 1 state<br>4. Check checkbox 2 state | Checkbox 1 is unchecked by default<br>Checkbox 2 is checked by default | Positive | ✅ Automated |

---

### 2. Checkboxes Interaction

Tests covering basic individual and simultaneous checkbox operations.

| ID | Test Case | Steps | Expected Result | Type | Automated |
|----|-----------|-------|----------------|------|-----------|
| **CB-CI-001** | Check and uncheck checkbox 1 successfully | 1. Navigate to Checkboxes page<br>2. Verify checkbox 1 is unchecked<br>3. Check checkbox 1<br>4. Verify it's checked<br>5. Uncheck checkbox 1<br>6. Verify it's unchecked | Checkbox 1 can be checked and unchecked<br>State changes correctly | Positive | ✅ Automated |
| **CB-CI-002** | Uncheck and check checkbox 2 successfully | 1. Navigate to Checkboxes page<br>2. Verify checkbox 2 is checked<br>3. Uncheck checkbox 2<br>4. Verify it's unchecked<br>5. Check checkbox 2<br>6. Verify it's checked | Checkbox 2 can be unchecked and checked<br>State changes correctly | Positive | ✅ Automated |
| **CB-CI-003** | Check checkbox 1 and uncheck checkbox 2 simultaneously | 1. Navigate to Checkboxes page<br>2. Verify initial states<br>3. Check checkbox 1<br>4. Uncheck checkbox 2<br>5. Verify both states | Checkbox 1 is checked<br>Checkbox 2 is unchecked<br>Both operations succeed | Positive | ✅ Automated |

---

### 3. Edge Cases

Tests covering advanced scenarios including independence, multiple interactions, state persistence, and accessibility.

| ID | Test Case | Steps | Expected Result | Type | Automated |
|----|-----------|-------|----------------|------|-----------|
| **CB-EC-001** | Check/uncheck checkbox 1 without affecting checkbox 2 | 1. Navigate to Checkboxes page<br>2. Verify initial states<br>3. Check checkbox 1<br>4. Verify checkbox 2 unchanged (checked)<br>5. Uncheck checkbox 1<br>6. Verify checkbox 2 still unchanged | Checkbox 1 operations don't affect checkbox 2<br>Checkbox 2 remains checked throughout | Positive | ✅ Automated |
| **CB-EC-002** | Uncheck/check checkbox 2 without affecting checkbox 1 | 1. Navigate to Checkboxes page<br>2. Verify initial states<br>3. Uncheck checkbox 2<br>4. Verify checkbox 1 unchanged (unchecked)<br>5. Check checkbox 2<br>6. Verify checkbox 1 still unchanged | Checkbox 2 operations don't affect checkbox 1<br>Checkbox 1 remains unchecked throughout | Positive | ✅ Automated |
| **CB-EC-003** | Verify checkbox 1 alternates state correctly after multiple clicks | 1. Navigate to Checkboxes page<br>2. Toggle checkbox 1 five times<br>3. After each toggle, verify state<br>4. Track expected vs actual state | State alternates correctly:<br>Click 1: checked<br>Click 2: unchecked<br>Click 3: checked<br>Click 4: unchecked<br>Click 5: checked | Positive | ✅ Automated |
| **CB-EC-004** | Verify checkbox 2 alternates state correctly after multiple clicks | 1. Navigate to Checkboxes page<br>2. Toggle checkbox 2 five times<br>3. After each toggle, verify state<br>4. Track expected vs actual state | State alternates correctly:<br>Click 1: unchecked<br>Click 2: checked<br>Click 3: unchecked<br>Click 4: checked<br>Click 5: unchecked | Positive | ✅ Automated |
| **CB-EC-005** | Verify state resets after page refresh | 1. Navigate to Checkboxes page<br>2. Check checkbox 1 and uncheck checkbox 2<br>3. Verify modified states<br>4. Refresh page<br>5. Wait for page to load<br>6. Verify states reset to defaults | After refresh:<br>Checkbox 1 returns to unchecked<br>Checkbox 2 returns to checked<br>State is not persisted | Positive | ✅ Automated |
| **CB-EC-006** | Verify keyboard interaction with Space key | 1. Navigate to Checkboxes page<br>2. Get checkbox 1 initial state<br>3. Focus on checkbox 1 (click)<br>4. Press Space key<br>5. Verify state toggled | Checkbox 1 toggles correctly when Space key is pressed<br>Supports keyboard accessibility | Positive | ✅ Automated |

---

## Test Coverage Summary

### Overall Statistics
- **Total Test Cases**: 14
- **Automated**: 14 (100%)
- **Pending**: 0 (0%)
- **Manual**: 0 (0%)

### Test Type Distribution
| Type | Count | Percentage |
|------|-------|------------|
| **Positive** | 14 | 100% |
| **Negative** | 0 | 0% |

### Category Coverage
| Category | Test Cases | Coverage |
|----------|------------|----------|
| UI Validation | 5 | Complete |
| Checkboxes Interaction | 3 | Complete |
| Edge Cases | 6 | Complete |

### Edge Case Coverage Details
| Sub-category | Test Cases | Description |
|--------------|------------|-------------|
| Independence Testing | 2 | Verifies checkboxes operate independently |
| Multiple Interactions | 2 | Tests state consistency over multiple clicks |
| State Persistence | 1 | Validates behavior after page refresh |
| Accessibility | 1 | Keyboard navigation with Space key |

---

## Test Data

Test data is stored in `test/data/checkboxesData.js`:

```javascript
export default {
  pageTitle: 'Checkboxes',
  texts: {
    checkbox1: 'checkbox 1',
    checkbox2: 'checkbox 2'
  }
};
```

**Default States:**
- Checkbox 1: Unchecked (false)
- Checkbox 2: Checked (true)

**Test Configuration:**
- Multiple clicks count: 5 (configurable in test file)

---

## Dependencies

### Page Objects Required
- `CheckboxesPage.js` - Checkbox page interactions and verifications
  - Methods: `checkCheckbox()`, `uncheckCheckbox()`, `toggleCheckbox()`, `isCheckboxChecked()`, `getCheckboxElement()`
- `MainPage.js` - Navigation helper
- `BasePage.js` - Base page object with common methods

### Test Data Files
- `checkboxesData.js` - Checkbox labels and expected texts

### External Dependencies
- WebDriverIO - Browser automation
- Mocha - Test framework
- Chai - Assertions library

---

## Notes

### Testing Patterns
- **State Verification**: Each interaction verifies state before and after changes
- **Independence Testing**: Ensures checkboxes don't interfere with each other (CB-EC-001, CB-EC-002)
- **Multiple Clicks**: Tests consistency over repeated interactions (5 consecutive clicks with validation after each)
- **No Hard Waits**: Uses explicit waits (`isPageOpened()`) instead of `pause()` for better reliability
- **Accessibility**: Includes keyboard interaction testing (Space key)

### Best Practices Applied
- ✅ Eliminated `browser.pause()` in favor of explicit waits
- ✅ Clear separation of concerns: UI validation, basic interactions, and edge cases
- ✅ Comprehensive edge case coverage including accessibility
- ✅ Test IDs follow consistent naming convention (CB-[CATEGORY]-[NUMBER])
- ✅ Detailed assertion messages for easier debugging

### Coverage Gaps (Future Enhancements)
- Tab key navigation between checkboxes
- Enter key interaction
- ARIA attributes validation
- Screen reader support testing
- Visual regression testing
- Mobile/touch interaction testing
- Programmatic state changes via JavaScript execution
- Negative scenarios (disabled checkboxes, read-only states)

### Implementation Details
The test suite uses:
- `checkCheckbox(index)` - Ensures checkbox is checked (idempotent)
- `uncheckCheckbox(index)` - Ensures checkbox is unchecked (idempotent)
- `toggleCheckbox(index)` - Clicks checkbox regardless of state
- `isCheckboxChecked(index)` - Returns current checked state (boolean)
- `getCheckboxElement(index)` - Returns WebDriverIO element for direct interaction
- `isPageOpened()` - Waits for page to load (explicit wait, max 30s)

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.1 | 2026-01-02 | Barbara Lozada | Reorganized test structure: UI validation, Checkboxes interaction, Edge cases. Added keyboard accessibility test (CB-EC-006) and page refresh test (CB-EC-005). Removed hard waits. Updated test IDs. |
| 1.0 | 2026-01-02 | Barbara Lozada | Initial test suite documentation |

---

**Automation Status Legend:**
- ✅ Automated
- ⏳ Pending Automation
- ⛔ Not Automatable
- 🔄 In Progress
