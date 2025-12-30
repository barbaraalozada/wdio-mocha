import path from 'path';

import allure from '@wdio/allure-reporter';
import dotenv from 'dotenv';
import fs from 'fs-extra';

dotenv.config();

// Check if running in debug mode
const isDebugMode = process.env.DEBUG === 'true';

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
    '../../test/specs/**/*.js'
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
        '--guest',
        '--disable-infobars',
        '--disable-notifications',
        '--disable-extensions'
        // Uncomment to run headless
        // '--headless'
      ],
    },
    acceptInsecureCerts: true
  }],

  // ===================
  // Test Configurations
  // ===================
  logLevel: 'info',
  bail: 0,
  waitforTimeout: parseInt(process.env.DEFAULT_TIMEOUT) || 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  // Services
  services: ['chromedriver'],

  // Framework
  framework: 'mocha',

  // Test reporter for stdout
  reporters: isDebugMode
    ? ['spec'] :
    [
      'spec',
      ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
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
  onPrepare: function () {
    fs.ensureDir(downloadDir);
  },

  /**
   * Gets executed before test execution begins
   */
  before: function () {
    browser.maximizeWindow();
  },

  /**
   * Hook that gets executed after each test.
   * Takes a screenshot when a test fails and attaches it to the Allure report.
   * Skips screenshot in debug mode.
   */
  afterTest: async function (test, context, { passed }) {
    if (!passed && !isDebugMode) {
      const screenshot = await browser.takeScreenshot();
      allure.addAttachment('Screenshot on failure', Buffer.from(screenshot, 'base64'), 'image/png');
    }
  },
};
