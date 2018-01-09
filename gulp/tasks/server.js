var conf = require('../config.json');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync:build', function() {
  'use strict';
  browserSync.init({
    server: {
      baseDir: conf.base.build
    },
    notify: false,
    reloadDebounce: 2000
  });
});

gulp.task('browser-sync:compile', function() {
  'use strict';
  browserSync.init({
    server: {
      baseDir: conf.base.compile
    },
    reloadDebounce: 2000
  });
});

gulp.task('watch', function () {
  'use strict';
  gulp.watch(conf.base.src + conf.path.sass + conf.files.sassAll, ['sass', browserSync.reload]);
  gulp.watch(conf.base.src + conf.path.js + conf.files.js, ['js:build', browserSync.reload]);
  gulp.watch(conf.base.src + conf.files.pug, ['pug:build', browserSync.reload]);
});
