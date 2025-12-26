/**
 * Test Data
 * Store test data and test users here
 */

const testData = {
    // Valid user credentials
    validUser: {
        username: 'tomsmith',
        password: 'SuperSecretPassword!'
    },

    // Invalid user credentials
    invalidUser: {
        username: 'invaliduser',
        password: 'invalidpass'
    },

    // URLs
    urls: {
        baseUrl: 'https://the-internet.herokuapp.com',
        loginPage: '/login',
        securePage: '/secure'
    },

    // Expected messages
    messages: {
        loginSuccess: 'You logged into a secure area!',
        loginFailed: 'Your username is invalid!',
        logoutSuccess: 'You logged out of the secure area!'
    }
};

export default testData;
