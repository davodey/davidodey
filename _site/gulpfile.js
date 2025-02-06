// Load plugins
var gulp = require('gulp'),
    notify = require('gulp-notify'),
    requireDir = require('require-dir'),
    tasks = requireDir('./_tasks');

gulp.task('default', function() {
    gulp.start('compile-scss');
    gulp.start('require-js');
    gulp.watch('_scss/*.scss', ['compile-scss']);
    gulp.watch('js/app/*.js', ['require-js']);
    gulp.watch('js/tools/*.js', ['require-js']);
    gulp.watch('js/app/**/*.js', ['require-js']);
    gulp.watch('js/app/**/**/*.js', ['require-js']);

});

