// Load plugins
var gulp = require('gulp'),
    notify = require('gulp-notify'),
    jshint = require('gulp-jshint'); // lints js

    
gulp.task('hint-js', function() {
  return gulp.src('pattern-lab/source/js/app/components/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
    notify().write({message: 'JShint has finished running'});
});