var gulp = require('gulp'),

  jshint = require('gulp-jshint'),
  mocha = require('gulp-mocha');

var paths = {
  scripts: ['*.js', 'src/**/*.js'],
  tests: ['test/**/*.js']
};

gulp.task('test', function () {
  return gulp.src(paths.scripts.concat(paths.tests))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(mocha({reporter:'Spec'}));
});

/**
 * Watch for file changes
 */
gulp.task('watch', function () {
  gulp.watch(paths.scripts.concat(paths.tests).concat(['package.json']), ['test']);
});

/**
 * CLI tasks
 */
gulp.task('default', ['test', 'watch']);