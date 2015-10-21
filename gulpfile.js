'use strict';

var gulp = require('gulp');
var gulpConfig = require('./gulp.config.json');
var paths = gulpConfig.paths;
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var stylish = require('gulp-jscs-stylish');
var mocha = require('gulp-mocha');
var shell = require('gulp-shell');
var rename = require('gulp-rename');
var path = require('path');
var del = require('del');
var exec = require('child_process').exec;
var settings = require('./').settings;
var MockAdapter = require('./tests/unit/back/adapters/adapter.mock');

/**
 * The default task (called when you run `gulp` from cli)
 */
gulp.task('default', ['test']);

/**
 * Task to run complete test for deployment
 */
gulp.task('test', ['dist', 'test-js', 'docs']);

/**
 * Task to generate dist build
 */
gulp.task('dist', ['clean:dist'], function () {
  // core source code
  gulp.src('')
    .pipe(shell([
      '<%= rjs %> -convert <%= src %> <%= dest %>'
    ], {
      templateData: {
        rjs: paths.tools.rjs,
        src: paths.core.src,
        dest: paths.core.dest
      }
    }));

  // vendor libs
  gulp.src(paths.vendor.libs.chai)
    .pipe(gulp.dest(paths.vendor.dest));

  gulp.src(paths.vendor.libs.util)
    .pipe(rename('util.js'))
    .pipe(gulp.dest(paths.vendor.dest));

  gulp.src('')
    .pipe(shell([
      '<%= rjs %> -convert <%= src %> <%= dest %>'
    ], {
      templateData: {
        rjs: paths.tools.rjs,
        src: paths.vendor.libs.path,
        dest: paths.build.tmpDir
      }
    }))
    .on('end', function () {
      gulp.src(path.join(paths.build.tmpDir, 'index.js'))
        .pipe(rename('path.js'))
        .pipe(gulp.dest(paths.vendor.dest))
        .on('end', function () {
          del([paths.build.tmpDir]);
        });
    });
});

/**
 * Task to clean dist folder
 */
gulp.task('clean:dist', function () {
  return del(['dist/lib/**/*']);
});

/**
 * Task to run all linters and tests
 */
gulp.task('test-js', ['lint', 'mocha']);

/**
 * Task to run link checks
 */
gulp.task('lint', function () {
  var noop = function () {};

  return gulp.src(paths.lintCheckFiles)
    .pipe(jshint())
    .pipe(jscs())
    .on('error', noop)
    .pipe(stylish.combineWithHintResults())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

/**
 * Task to run mocha tests
 */
gulp.task('mocha', function () {
  settings.ADAPTERS.default = new MockAdapter();
  return gulp.src(paths.mochaSrc, {read: false})
    .pipe(mocha({
      reporter: 'spec'
    }));
});

/**
 * Task to create docs
 */
gulp.task('docs', ['docs:back', 'docs:guide']);

/**
 * Task to create back docs
 */
gulp.task('docs:back', function () {
  exec(
    './node_modules/jsdoc/jsdoc.js ' +
    '-d ' + paths.backDocsDist + ' ' +
    '-r ' + paths.backDocsSrc + ' ' +
    '--private',
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
    }
  );
});

/**
 * Task to create guide docs
 */
gulp.task('docs:guide', function () {
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
});
