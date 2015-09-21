'use strict';

var gulp = require('gulp');
var gulpConfig = require('./gulp.config.json');
var paths = gulpConfig.paths;
var jshint = require('gulp-jshint');
var jsxcs = require('gulp-jscs');
var plumber = require('gulp-plumber');
var mocha = require('gulp-mocha');
var exec = require('child_process').exec;

/**
 * Task to run link checks
 */
gulp.task('lint', function () {
  var checkFiles = gulp.src(paths.lintCheckFiles);

  checkFiles
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'));

  return checkFiles
    .pipe(jsxcs());
});

/**
 * Task to run mocha tests
 */
gulp.task('mocha', function () {
  return gulp.src(paths.mochaSrc, {read: false})
    .pipe(mocha({reporter: 'spec'}));
});

/**
 * Task to create docs
 */
gulp.task('docs', function () {
  docs();
});

function docs() {
  backdocs();
  guideDocs();
}

/**
 * Task to create back docs
 */
gulp.task('backdocs', function () {
  return backdocs();
});

function backdocs() {
  exec(
    './node_modules/jsdoc/jsdoc.js ' +
    '-d ' + paths.backDocsDist + ' ' +
    '-r ' + paths.backDocsSrc,
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
    }
  );
}

/**
 * Task to create guide docs
 */
gulp.task('guidedocs', function () {
  return guideDocs();
});

function guideDocs() {
  exec(
    './node_modules/jsdoc/jsdoc.js ' +
    '-u ' + paths.guideDocsSrc + ' ' +
    '-d ' + paths.guideDocsDist + ' ' +
    '-r ' + paths.guideDocsSrc,
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
    }
  );
}
