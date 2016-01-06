// Load plugins
var gulp = require('gulp'),
    prettify = require('gulp-prettify');


gulp.task('format-html', function() {
  gulp.src('**/*.html')
    .pipe(prettify({indent_size: 4}))
    .pipe(gulp.dest('dist'))
});