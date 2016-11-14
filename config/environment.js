/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'viewer',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      EXTEND_PROTOTYPES: {
          Date: false,
      },
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    ENV.APP.websocketsURL = 'ws://localhost:6930/reconstruction';
    ENV.APP.staticURL = 'http://localhost:6930/data/';
    ENV.APP.APIURL = 'http://localhost:6930';

    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.APP.websocketsURL = 'wss://richard.kompiler.org/reconstruction';
    ENV.APP.staticURL = 'https://richard.kompiler.org/data/';
    ENV.APP.APIURL  = 'https://richard.kompiler.org';
    ENV.baseURL = '/face-reconstruction/';
    ENV.rootURL = '/face-reconstruction/';
  }

  return ENV;
};
