// Load plugins
var gulp = require('gulp');

// End of day tasks
gulp.task('copy-site', function() {
	gulp.src("_site/**")
		.pipe(gulp.dest('/volumes/WWW/html/davidodey'));
});