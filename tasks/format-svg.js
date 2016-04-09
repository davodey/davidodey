// Load plugins
var gulp = require('gulp'),
    prettify = require('gulp-prettify');


gulp.task('format-svg', function() {
    gulp.src('_icons/*.svg')
        .pipe(prettify({indent_size: 4}))
        .pipe(gulp.dest('img/icons/'))
});