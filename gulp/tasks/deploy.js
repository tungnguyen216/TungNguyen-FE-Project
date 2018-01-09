var conf = require('../config.json');
var options = require('./options');
var gulp = require('gulp');
var rsync = require('gulp-rsync');
var runSequence = require('run-sequence');

gulp.task('rsync', function() {
  return gulp.src(options.src)
  .pipe(rsync({
    root: conf.base.compile,
    hostname: options.host,
    username: 'webadmin',
    destination: options.dest,
    archive: true,
    silent: false,
    compress: true
  }))
  .on('error', function(err) {
    console.log(err);
  });
});

gulp.task('deploy', function (cb){
  runSequence('compile', 'rsync', cb);
});
