# Test Suite: Add/Remove Elements

**Application**: The Internet - Herokuapp
**Page URL**: https://the-internet.herokuapp.com/add_remove_elements/
**Feature**: Dynamic Element Management
**Test Suite File**: `test/specs/addRemoveElementsTest.js`
**Page Object**: `test/pageObjects/AddRemoveElementsPage.js`
**Test Data**: `test/data/addRemoveElementsData.js`
**Last Updated**: 2026-01-02
**Status**: ✅ Fully Automated

---

## Table of Contents
- [Test Suite Overview](#test-suite-overview)
- [Test Cases](#test-cases)
  - [1. UI Validation](#1-ui-validation)
  - [2. Button Interaction](#2-button-interaction)
  - [3. Edge Cases](#3-edge-cases)
  - [4. Page State](#4-page-state)
- [Test Coverage Summary](#test-coverage-summary)
- [Test Data](#test-data)
- [Dependencies](#dependencies)

---

## Test Suite Overview

This test suite validates the Add/Remove Elements functionality with comprehensive test cases covering dynamic element creation, deletion, and state management.

**Key Features Tested:**
- Dynamic element addition
- Dynamic element removal
- Multiple element management
- Element count validation
- Page state after refresh
- Error handling for edge cases
- UI text validation

**Scope:**
- Dynamic DOM manipulation
- Element lifecycle management
- Quantity tracking
- State persistence
- Error handling
- UI/UX validation

---

## Test Cases

### 1. UI Validation

Tests verifying UI elements, text content, and visual state.

| ID | Test Case | Steps | Expected Result | Type | Automated |
|----|-----------|-------|----------------|------|-----------|
| **ARE-UI-001** | Verify Add/Remove Elements page opens successfully | 1. Navigate to main page<br>2. Click "Add/Remove Elements" link<br>3. Verify page loaded | Page loads successfully<br>Add/Remove Elements page is displayed | Positive | ✅ Automated |
| **ARE-UI-002** | Verify Add button is displayed | 1. Navigate to Add/Remove Elements page<br>2. Check Add Element button visibility | Add Element button is visible on page | Positive | ✅ Automated |
| **ARE-UI-003** | Verify Add button is enabled | 1. Navigate to Add/Remove Elements page<br>2. Check Add Element button enabled state | Add Element button is enabled and clickable | Positive | ✅ Automated |
| **ARE-UI-004** | Verify button texts are correct | 1. Navigate to Add/Remove Elements page<br>2. Get Add Element button text<br>3. Click Add Element button<br>4. Get Delete button text<br>5. Compare with expected values | Add Element button text: "Add Element"<br>Delete button text: "Delete" | Positive | ✅ Automated |
| **ARE-UI-005** | Verify Delete button is enabled when added | 1. Navigate to Add/Remove Elements page<br>2. Click Add Element button<br>3. Check Delete button displayed<br>4. Check Delete button enabled | Delete button is visible and enabled after creation | Positive | ✅ Automated |

---

### 2. Button Interaction

Tests covering the basic add and remove operations.

| ID | Test Case | Steps | Expected Result | Type | Automated |
|----|-----------|-------|----------------|------|-----------|
| **ARE-BI-001** | Display Delete button when Add button is clicked | 1. Navigate to Add/Remove Elements page<br>2. Click Add Element button once<br>3. Verify Delete button appears | One Delete button is created and displayed | Positive | ✅ Automated |
| **ARE-BI-002** | Display multiple Delete buttons for multiple Add clicks | 1. Navigate to Add/Remove Elements page<br>2. Click Add Element button 3 times<br>3. Count Delete buttons | Exactly 3 Delete buttons are displayed<br>One Delete button per Add click | Positive | ✅ Automated |
| **ARE-BI-003** | Decrease Delete button count when Delete is clicked | 1. Navigate to Add/Remove Elements page<br>2. Click Add Element button 3 times<br>3. Verify 3 Delete buttons exist<br>4. Click one Delete button<br>5. Count remaining Delete buttons | Delete button count decreases by 1<br>2 Delete buttons remain | Positive | ✅ Automated |
| **ARE-BI-004** | Remove all Delete buttons when all are clicked | 1. Navigate to Add/Remove Elements page<br>2. Click Add Element button 3 times<br>3. Verify 3 Delete buttons exist<br>4. Click all 3 Delete buttons<br>5. Verify no Delete buttons remain | All Delete buttons are removed<br>No Delete buttons displayed<br>Only Add Element button remains | Positive | ✅ Automated |

---

### 3. Edge Cases

Tests covering error handling, boundary conditions, and advanced scenarios.

| ID | Test Case | Steps | Expected Result | Type | Automated |
|----|-----------|-------|----------------|------|-----------|
| **ARE-EC-001** | No error when clicking Delete with no elements | 1. Navigate to Add/Remove Elements page<br>2. Verify no Delete buttons exist<br>3. Attempt to click Delete button<br>4. Verify no errors thrown | No JavaScript errors occur<br>Page remains functional<br>Add Element button still works | Negative | ✅ Automated |
| **ARE-EC-002** | Handle rapid clicks on Add button | 1. Navigate to Add/Remove Elements page<br>2. Rapidly click Add Element button 10 times<br>3. Count Delete buttons | Exactly 10 Delete buttons created<br>All rapid clicks processed correctly | Positive | ✅ Automated |
| **ARE-EC-003** | Handle adding and deleting simultaneously | 1. Navigate to Add/Remove Elements page<br>2. Click Add Element 5 times<br>3. Click Delete once<br>4. Click Add Element 3 times<br>5. Click Delete once<br>6. Count Delete buttons | Correct count: 5 + 3 - 2 = 6 Delete buttons<br>Mixed operations handled correctly | Positive | ✅ Automated |
| **ARE-EC-004** | Handle adding a large number of elements | 1. Navigate to Add/Remove Elements page<br>2. Click Add Element button 100 times<br>3. Count Delete buttons | Exactly 100 Delete buttons created<br>System handles large quantity | Positive | ✅ Automated |
| **ARE-EC-005** | Delete specific button from middle of list | 1. Navigate to Add/Remove Elements page<br>2. Click Add Element 5 times<br>3. Click Delete button at index 3 (middle)<br>4. Count remaining buttons | 4 Delete buttons remain<br>Specific button deleted correctly | Positive | ✅ Automated |
| **ARE-EC-006** | Handle double click on Add button | 1. Navigate to Add/Remove Elements page<br>2. Double-click Add Element button<br>3. Count Delete buttons | Exactly 2 Delete buttons created<br>Double-click handled correctly | Positive | ✅ Automated |
| **ARE-EC-007** | Maintain state after browser back and forward | 1. Navigate to Add/Remove Elements page<br>2. Click Add Element 3 times<br>3. Verify 3 Delete buttons<br>4. Click browser back<br>5. Click browser forward<br>6. Verify Delete button count | State persists after navigation<br>3 Delete buttons still present | Positive | ✅ Automated |

---

### 4. Page State

Tests verifying page state after browser actions.

| ID | Test Case | Steps | Expected Result | Type | Automated |
|----|-----------|-------|----------------|------|-----------|
| **ARE-PS-001** | Clear all elements when page is refreshed | 1. Navigate to Add/Remove Elements page<br>2. Click Add Element button 3 times<br>3. Verify 3 Delete buttons exist<br>4. Refresh the page<br>5. Verify Delete button count | Page resets to initial state<br>All Delete buttons are removed<br>No Delete buttons displayed | Positive | ✅ Automated |
| **ARE-PS-002** | Clear state when navigating away and back | 1. Navigate to Add/Remove Elements page<br>2. Click Add Element 3 times<br>3. Click browser back<br>4. Navigate to Add/Remove Elements again<br>5. Verify Delete button count | State is cleared after navigation<br>No Delete buttons present<br>Fresh page state | Positive | ✅ Automated |

---

## Test Coverage Summary

### Overall Statistics
- **Total Test Cases**: 18
- **Automated**: 18 (100%)
- **Pending**: 0 (0%)
- **Manual**: 0 (0%)

### Test Type Distribution
| Type | Count | Percentage |
|------|-------|------------|
| **Positive** | 17 | 94.4% |
| **Negative** | 1 | 5.6% |

### Category Coverage
| Category | Test Cases | Coverage |
|----------|------------|----------|
| UI Validation | 5 | Complete |
| Button Interaction | 4 | Complete |
| Edge Cases | 7 | Comprehensive |
| Page State | 2 | Complete |

---

## Test Data

Test data is stored in `test/data/addRemoveElementsData.js`:

```javascript
export default {
  deleteButtonText: 'Delete',
  addElementButtonText: 'Add Element'
};
```

**Test Constants:**
- Small count: 3 elements
- Medium count: 5 elements
- Large count: 10 elements
- Very large count: 100 elements
- Double click count: 2 elements
- Middle index: 3 (for targeting middle element)

---

## Dependencies

### Page Objects Required
- `AddRemoveElementsPage.js` - Page interactions and element management

### Test Data Files
- `addRemoveElementsData.js` - Button text values

### External Dependencies
- WebDriverIO - Browser automation
- Mocha - Test framework
- Chai - Assertions library

---

## Notes

### Dynamic DOM Testing
This test suite validates dynamic DOM manipulation:
- Elements are created dynamically via JavaScript
- Each Delete button is a separate DOM element
- Elements can be added/removed in any order
- No persistence between page loads

### Implementation Patterns
The page object provides methods for:
- `clickAddElementButton(times)` - Add multiple elements in one call
- `clickDeleteButton(index)` - Click Delete button at specific index (default: 1)
- `clickAllDeleteButtons()` - Remove all Delete buttons
- `doubleClickAddButton()` - Double-click Add Element button
- `getDeleteButtonQuantity()` - Count existing Delete buttons
- `areNoDeleteButtonsDisplayed()` - Verify no Delete buttons exist
- `isAddButtonDisplayed()` - Check Add button visibility
- `isAddButtonEnabled()` - Check Add button enabled state
- `isDeleteButtonDisplayed()` - Check Delete button visibility
- `isDeleteButtonEnabled()` - Check Delete button enabled state
- `getAddElementButtonText()` - Get Add button text
- `getDeleteButtonText()` - Get Delete button text

### Edge Case Coverage
- ✅ Clicking Delete when no elements exist (no errors)
- ✅ Page refresh resets all dynamic elements
- ✅ Multiple rapid additions (10 elements)
- ✅ Large number of elements (100 elements)
- ✅ Mixed add/remove operations
- ✅ Deleting from middle of list
- ✅ Double-click handling
- ✅ Browser navigation (back/forward) state persistence

### Future Enhancements
- Test with 1000+ elements (extreme stress test)
- Verify memory cleanup after element removal
- Test concurrent add/remove operations from multiple tabs
- Add accessibility testing (ARIA attributes, screen readers)
- Performance benchmarking for large element counts
- Test with automated scripts adding/removing at intervals

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.1 | 2026-01-02 | Barbara Lozada | Reorganized test structure: UI validation, Button interaction, Edge cases, Page state. Added 10 new edge case tests. Updated test IDs to match implementation. Improved assertion messages. Total tests: 18 (was 8). |
| 1.0 | 2026-01-02 | Barbara Lozada | Initial test suite documentation |

---

**Automation Status Legend:**
- ✅ Automated
- ⏳ Pending Automation
- ⛔ Not Automatable
- 🔄 In Progress
