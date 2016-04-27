// Load plugins
var gulp = require('gulp');

// End of day tasks
gulp.task('copy-css', function() {
    gulp.src("css/**")
        .pipe(gulp.dest('../webapp/dest/css/'));
});
