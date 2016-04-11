// Load plugins
var gulp = require('gulp');

// End of day tasks
gulp.task('copy-img', function() {   
	gulp.src("images/**")
		.pipe(gulp.dest('../webapp/dest/images/'));
});