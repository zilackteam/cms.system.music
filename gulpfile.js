'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var lazypipe = require('lazypipe');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

var paths = {
    scripts: ['app/scripts/**/*.js'],
    styles: ['app/styles/*.scss']
};

/**
 * Task
 */
gulp.task('styles', function () {
    return gulp.src(paths.styles)
        .pipe($.plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe($.sourcemaps.init())
            .pipe($.sass({
                outputStyle: 'expanded',
                precision: 10
            }))
            .pipe($.autoprefixer('last 2 version'))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('app/styles'))
        .pipe(browserSync.stream({match: "**/*.css"}))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app",
            routes: {
                "/bower_components": "./bower_components"
            }
        }
    });
});

gulp.task('serve', function(cb) {
    runSequence(
        'styles',
        'browser-sync',
        cb
    );
    gulp.watch("app/styles/**/*.scss", ['styles']);
    gulp.watch("app/scripts/**/*.js").on('change', browserSync.reload);
    gulp.watch("app/**/*.html").on('change', browserSync.reload);
});

gulp.task('copy:scripts', function() {
    return gulp.src('app/scripts/**/*')
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('copy:styles', function() {
    return gulp.src('app/styles/main.css')
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('copy:images', function() {
    return gulp.src('app/images/**/*')
        .pipe(gulp.dest('dist/images'));
});

gulp.task('copy:fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copy:views', function() {
    return gulp.src('app/views/**/*')
        .pipe(gulp.dest('dist/views'));
});

gulp.task('build', ['styles','copy:views', 'copy:scripts', 'copy:styles', 'copy:fonts', 'copy:images'], function() {
    return gulp.src('app/*.html')
        .pipe($.useref())
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.minifyCss()))
        .pipe(gulp.dest('dist'));
});


