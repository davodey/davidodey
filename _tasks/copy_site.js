// Load plugins
var gulp = require('gulp');

// End of day tasks
gulp.task('copy-site', function() {
	gulp.src("docs/**")
		.pipe(gulp.dest('/volumes/WWW/html/davidodey'));
});