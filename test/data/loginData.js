/**
 * Login Test Data
 * Test data for login scenarios (invalid users, expected messages, URLs)
 * For valid credentials, use EnvConfig.getLoginUsername() and EnvConfig.getLoginPassword()
 */

const loginData = {
  // Invalid user credentials for negative testing
  invalidUser: {
    username: 'invaliduser',
    password: 'invalidpass'
  },

  // Empty credentials for validation testing
  emptyCredentials: {
    username: '',
    password: ''
  },

  // Expected messages
  messages: {
    loginSuccess: 'You logged into a secure area!',
    loginFailed: 'Your username is invalid!',
    logoutSuccess: 'You logged out of the secure area!',
    passwordInvalid: 'Your password is invalid!'
  }
};

export default loginData;
