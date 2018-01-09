var conf = require('../config.json');
var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var rev = require('gulp-rev');


gulp.task('usemin', function() {
  return gulp.src(conf.base.build + '*.html')
    .pipe(usemin({
      css: [ cleanCss, 'concat', rev ],
      js: [ uglify, rev ]
    }))
    .pipe(gulp.dest(conf.base.compile));
});
