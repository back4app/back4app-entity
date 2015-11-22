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

  start();

  function start() {
    // wrap core source code in AMD-friendly format
    gulp.src('')
      .pipe(shell([
        '<%= rjs %> -convert <%= src %> <%= dest %>'
      ], {
        templateData: {
          rjs: paths.tools.rjs,
          src: paths.core.src,
          dest: paths.core.dest
        }
      }))
      .on('end', convertLibBluebird);
  }

  function convertLibBluebird() {
    // copy vendor lib, wrapping in AMD format if necessary
    gulp.src(paths.vendor.libs.bluebird)
      .pipe(gulp.dest(paths.vendor.dest))
      .on('end', convertLibChai);
  }

  function convertLibChai() {
    // copy vendor lib, wrapping in AMD format if necessary
    gulp.src(paths.vendor.libs.chai)
      .pipe(gulp.dest(paths.vendor.dest))
      .on('end', convertLibUuid);
  }

  function convertLibUuid() {
    // copy vendor lib, wrapping in AMD format if necessary
    gulp.src(paths.vendor.libs.uuid)
      .pipe(gulp.dest(paths.vendor.dest))
      .on('end', convertLibUtil);
  }

  function convertLibUtil() {
    // copy vendor lib, wrapping in AMD format if necessary
    gulp.src(paths.vendor.libs.util)
      .pipe(rename('util.js'))
      .pipe(gulp.dest(paths.vendor.dest))
      .on('end', convertLibPath);
  }

  function convertLibPath() {
    // copy vendor lib, wrapping in AMD format if necessary
    var tmpConvertDir = path.join(paths.build.tmp, 'tmpConvert');
    gulp.src('')
      .pipe(shell([
        '<%= rjs %> -convert <%= src %> <%= dest %>'
      ], {
        templateData: {
          rjs: paths.tools.rjs,
          src: paths.vendor.libs.path,
          dest: tmpConvertDir
        }
      }))
      .on('end', function () {
        gulp.src(path.join(tmpConvertDir, 'index.js'))
          .pipe(rename('path.js'))
          .pipe(gulp.dest(paths.vendor.dest))
          .on('end', buildMainBundle);
      });
  }

  function buildMainBundle() {
    // bundle all files and minify
    gulp.src('')
      .pipe(shell([
        '<%= rjs %> -o build/config.json'
      ], {
        templateData: {
          rjs: paths.tools.rjs
        }
      }))
      .on('end', copyFilesToDist);
  }

  function copyFilesToDist() {
    // copy bundle and index files to dist folder
    var bundle = path.join(paths.build.tmp, 'back4app-entity-bundle.js');
    gulp.src(bundle)
      .pipe(gulp.dest(paths.build.dest))
      .on('end', function () {
        var mainJS = path.join(paths.build.src, 'back4app-entity.js');
        gulp.src(mainJS)
          .pipe(gulp.dest(paths.build.dest))
          .on('end', function () {
            var textJS = path.join(paths.build.src, 'text.js');
            gulp.src(textJS)
              .pipe(gulp.dest(paths.build.dest))
              .on('end', removeTempBuildFiles);
          });
      });
  }

  function removeTempBuildFiles() {
    // remove temporary build folder
    del([paths.build.tmp]);
  }
});

/**
 * Task to clean dist folder
 */
gulp.task('clean:dist', function () {
  return del(['dist/**/*']);
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
