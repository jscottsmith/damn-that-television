var gulp = require('gulp-help')(require('gulp'));
var gutil = require('gulp-util');
var markdown = require('gulp-markdown-to-json');
var browserSync = require('browser-sync');
var config = require('../config').markdown;

var taskDef = function() {
    return gulp.src(config.src)

        .pipe(gutil.buffer())
        .pipe(markdown('projects.json', {
            pedantic: true,
            smartypants: true
        }))
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({
            stream: true
        }));
};

module.exports = taskDef;

gulp.task('markdown', false, taskDef);
