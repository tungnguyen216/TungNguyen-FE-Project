var conf = require('../config.json');
var options = require('./options');
var pkg = require('../../package.json');
var gulp = require('gulp');
var replace = require('gulp-replace');
var webpack = require('gulp-webpack');
var eslint = require('gulp-eslint');
var webpackConfig = require('../webpack.config');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('js:build', function() {
  'use strict';
  gulp.src([conf.base.src + conf.files.js])
    .pipe(eslint({
      configFile: './.eslintrc.json'
    }))
    .pipe(eslint.format())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(conf.base.build + conf.path.js));
});
