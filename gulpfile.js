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
var del = require('del');
var exec = require('child_process').exec;

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
    '-r ' + paths.backDocsSrc + ' ' +
    '--private',
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

/**
 * Task to clean dist folder
 */
gulp.task('clean:dist', function () {
  return del(['dist/lib/**/*']);
});

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
