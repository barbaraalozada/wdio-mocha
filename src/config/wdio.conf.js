import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs-extra';
import allure from '@wdio/allure-reporter';

dotenv.config();

export const downloadDir = path.resolve('./tmp');

export const config = {
  // ====================
  // Runner Configuration
  // ====================
  runner: 'local',

  // ==================
  // Specify Test Files
  // ==================
  specs: [
    './test/specs/**/*.js'
  ],

  // Patterns to exclude
  exclude: [],

  // ============
  // Capabilities
  // ============
  maxInstances: 1,
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: [
        '--disable-gpu',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        // Uncomment to run headless
        // '--headless'
      ]
    },
    acceptInsecureCerts: true
  }],

  // ===================
  // Test Configurations
  // ===================
  logLevel: 'info',
  bail: 0,
  baseUrl: process.env.BASE_URL || 'https://the-internet.herokuapp.com',
  waitforTimeout: parseInt(process.env.DEFAULT_TIMEOUT) || 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  // Services
  services: ['chromedriver'],

  // Framework
  framework: 'mocha',

  // Test reporter for stdout
  reporters: [
    'spec',
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false,
    }]
  ],

  // Options to be passed to Mocha
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
    require: []
  },

  // =====
  // Hooks
  // =====
  /**
   * Gets executed once before all workers get launched.
   */
  onPrepare: function (config, capabilities) {
    fs.ensureDir(downloadDir);
  },

  /**
   * Gets executed before test execution begins
   */
  before: function (capabilities, specs) {
    browser.maximizeWindow();
  },

  /**
   * Hook that gets executed after each test.
   * Takes a screenshot when a test fails and attaches it to the Allure report.
   */
  afterTest: async function (test, context, { error, result, duration, passed, retries }) {
    if (!passed) {
      const screenshot = await browser.takeScreenshot();
      allure.addAttachment('Screenshot on failure', Buffer.from(screenshot, 'base64'), 'image/png');
    }
  },
};
