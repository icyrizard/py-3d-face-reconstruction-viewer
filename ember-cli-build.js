/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sourcemaps: { enabled: true, extensions: ['js']},
    minifyJS: {
        enabled: false
    },
    minifyCSS: {
        enabled: false
    },
    fingerprint: {
        enabled: true
    }
  });

  // bower compoenents
  //app.import('bower_components/basscss/modules/align/index.css');
  //app.import('bower_components/basscss/modules/border/index.css');
  //app.import('bower_components/basscss/modules/flexbox/index.css');
  //app.import('bower_components/basscss/modules/grid/index.css');
  //app.import('bower_components/basscss/modules/hide/index.css');
  //app.import('bower_components/basscss/modules/layout/index.css');
  //app.import('bower_components/basscss/modules/margin/index.css');
  //app.import('bower_components/basscss/modules/padding/index.css');
  //app.import('bower_components/basscss/modules/position/index.css');
  //app.import('bower_components/basscss/modules/type-scale/index.css');
  //app.import('bower_components/basscss/modules/typography/index.css');

  // npm modules
  //app.import('node_modules/basscss-responsive-margin/css/responsive-margin.css');

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
