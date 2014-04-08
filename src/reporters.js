var map = require('map-stream');
var PluginError = require('gulp-util').PluginError;

const PLUGIN_NAME = 'gulp-raml';

exports.failReporter = function () {
  return map(function (file, cb) {
    // nothing to report or no errors
    if (!file.raml || file.raml.success) return cb(null, file);
    return cb(new PluginError(PLUGIN_NAME, 'RAML parse failed for ' + file.relative), file);
  });
};

exports.loadReporter = function (reporter) {
  // we want the function
  if (typeof reporter === 'function') {
    return reporter;
  }

  // object reporters
  if (typeof reporter === 'object' && typeof reporter.reporter === 'function') {
    return reporter.reporter;
  }

  // load jshint built-in reporters
  if (typeof reporter === 'string') {
    try {
      return exports.loadReporter(require(__dirname + '/reporters/' + reporter));
    } catch (err) {}
  }

  // load full-path or module reporters
  if (typeof reporter === 'string') {
    try {
      return exports.loadReporter(require(reporter));
    } catch (err) {}
  }
};

exports.reporter = function (reporter) {
  if (!reporter) reporter = 'default';
  if (reporter === 'fail') {
    return exports.failReporter();
  }
  var rpt = exports.loadReporter(reporter);

  if (typeof rpt !== 'function') {
    throw new PluginError(PLUGIN_NAME, 'Invalid reporter');
  }

  // return stream that reports stuff
  return map(function (file, cb) {
    // nothing to report or no errors
    if (!file.raml || file.raml.success) return cb(null, file);

    rpt(file.raml.message, file.raml.data, file.raml.opt);
    return cb(null, file);
  });
};