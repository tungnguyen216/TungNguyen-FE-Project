var conf = require('../config.json');
var gulp = require('gulp');
var sass = require('gulp-sass');
var sassLint = require('gulp-sass-lint');
var autoprefixer = require('gulp-autoprefixer');
var runSequence = require('run-sequence');

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

gulp.task('sass', function(cb) {
    'use strict';
    return runSequence(['sass:lint', 'sass:build'], cb);
});

gulp.task('sass:lint', function() {
    'use strict';
    return gulp.src([
            conf.base.src + conf.path.sass + conf.files.sassAll,
            '!' + conf.base.src + conf.path.sass + '**/_mixins.scss'
        ])
        .pipe(sassLint({
            configFile: './.sass-lint.yml'
        }))
        .on('error', handleError)
        .pipe(sassLint.format());
});

gulp.task('sass:build', function() {
    'use strict';
    return gulp.src(conf.base.src + conf.path.sass + conf.files.sass)
        .pipe(sass())
        .on('error', handleError)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(conf.base.build + conf.path.css));
});
