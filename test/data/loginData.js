/**
 * Login Test Data
 * Test data for login scenarios (invalid users, expected messages, URLs)
 * For valid credentials, use EnvConfig.getLoginUsername() and EnvConfig.getLoginPassword()
 */

const loginData = {
  // Invalid user credentials for negative testing
  invalidUsers: [
    {
      username: 'invaliduser',
      password: 'invalidpass'
    },
    {
      username: '!@#$%^&*()',
      password: '!@#$%^&*()'
    },
    {
      username: '',
      password: ''
    },
    {
      username: '   ',
      password: '   '
    }
  ],

  // Expected messages
  messages: {
    loginSuccess: 'You logged into a secure area!',
    loginFailed: 'Your username is invalid!',
    logoutSuccess: 'You logged out of the secure area!',
    passwordInvalid: 'Your password is invalid!',
    secureAreaAccessDenied: 'You must login to view the secure area!'
  },

  //Expected elements texts
  texts: {
    usernameInputText: 'Username',
    passwordInputText: 'Password',
    loginButtonText: 'Login'
  }
};

export default loginData;
