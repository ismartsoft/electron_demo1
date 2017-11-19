var gulp = require('gulp');
var tsc = require('gulp-typescript');
var sourcemaps = require("gulp-sourcemaps");
var nodemon = require('gulp-nodemon');
var clean = require('gulp-clean');
var scss = require('gulp-scss');
var watch = require('gulp-watch');
var child_process = require('child_process');
var electron = require('electron');

var tscProject = tsc.createProject('tsconfig.json');

gulp.task('clean', () => {
    /*return gulp.src('dist')
        .pipe(clean());*/
});

gulp.task('compile', () => {
    gulp.src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tscProject())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src'));
});

gulp.task('main', ['compile'], () => {
    gulp.watch('src/**/*.ts', ['compile']);
});

// default tasks
gulp.task('default', ['clean'], () => {
    gulp.start(['main']);
});
