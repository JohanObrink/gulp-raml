// through2 is a thin wrapper around node transform streams
var map = require('map-stream');
var PluginError = require('gulp-util').PluginError;
var reporters = require('./reporters');
var raml = require('raml-parser');

// Consts
const PLUGIN_NAME = 'gulp-raml';

var ramlPlugin = function (opt) {

  return map(function (file, cb) {
    if (file.isNull()) return cb(null, file); // pass along
    if (file.isStream()) return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));

    raml.load(file.contents, file.base)
      .then(function (data) {
        file.raml = { success: true, data: data };
        cb(null, file);
      }).catch(function (err) {
        file.raml = { success: false, message: err };
        return cb(null, file);
      });
  });
};

// expose the reporters
ramlPlugin.failReporter = reporters.fail;
ramlPlugin.loadReporter = reporters.load;
ramlPlugin.reporter = reporters.reporter;

module.exports = ramlPlugin;

// Exporting the plugin main function
module.exports = ramlPlugin;