var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require("gulp-sourcemaps");
var nodemon = require('gulp-nodemon');
var clean = require('gulp-clean');
var child_process = require('child_process');
var electron = require('electron');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', () => {
    return gulp.src('dist')
    .pipe(clean());
});

gulp.task('compile', () => {
    tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('copy', () => {
    gulp.src('app/index.html')
    .pipe(gulp.dest('dist/app'));
});

gulp.task('dist', function(){
    gulp.watch('app/index.html', ['copy']);
});

gulp.task('main', ['compile'], () => {
    gulp.start(['dist']);
});

// default tasks
gulp.task('default', ['clean'], () => {
    gulp.start(['main']);
});
