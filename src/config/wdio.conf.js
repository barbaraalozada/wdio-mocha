import fs from 'fs';
import path from 'path';

import allure from '@wdio/allure-reporter';
import dotenv from 'dotenv';

dotenv.config();

// Check if running in debug mode
const isDebugMode = process.env.DEBUG === 'true';

// Check if running in headless mode
const isHeadless =
  process.env.HEADLESS === 'true' ||
  process.argv.includes('--headless');

// Check if running in CI environment
const isCI = process.env.CI === 'true';

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

  exclude: [],

  // ============
  // Capabilities
  // ============
  maxInstances: 1,
  capabilities: [{
    browserName: 'chrome',
    browserVersion: 'stable',
    'goog:chromeOptions': {
      args: [
        '--guest',
        '--disable-infobars',
        '--disable-notifications',
        '--disable-extensions',
        '--window-size=1920,1080',

        ...(isHeadless ? [
          '--headless=new',
          '--disable-gpu'
        ] : []),

        ...(isCI ? [
          '--no-sandbox',
          '--disable-dev-shm-usage'
        ] : [])
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

  services: [],

  framework: 'mocha',

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
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    }
  },

  /**
   * Gets executed before test execution begins
   */
  before: function () {
    if (!isHeadless) {
      browser.maximizeWindow();
    }
  },

  /**
   * Hook that gets executed before each test starts
   */
  beforeTest: async function () {
    if (!isHeadless) {
      await browser.maximizeWindow();
    }
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
    await browser.reloadSession();
  },
};
