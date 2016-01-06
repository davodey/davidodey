var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify');

gulp.task('compile-scss', function() {
  return gulp.src(['scss/*.scss']) 
    .pipe(sass({ style: 'expanded', lineNumbers: true }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ie 10', 'opera 12.1', 'ios 6', 'android 4','Firefox > 16'))
	  .pipe(gulp.dest('css'));
});