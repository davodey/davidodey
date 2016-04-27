// Load plugins
var gulp = require('gulp');

// End of day tasks
gulp.task('copy-font', function() {
    gulp.src("fonts/**")
        .pipe(gulp.dest('../webapp/dest/fonts/'));
});
