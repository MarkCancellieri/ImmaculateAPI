'use strict';

// Module dependencies
var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var jscs   = require('gulp-jscs');

var paths = {
  scripts: [
    '*.js',
    'app_api/**/*.js',
    'app_client/js/**/*.js',
    'app_server/**/*.js',
    'config/**/*.js',
    'lib/**/*.js',
    'test/**/*.js'
  ]
};

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// JavaScript Code Style
gulp.task('jscs', function() {
  return gulp.src(paths.scripts)
    .pipe(jscs());
});

gulp.task('default', ['lint', 'jscs']);
