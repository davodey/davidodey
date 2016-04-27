var gulp = require('gulp'),
	//cache = require('gulp-cached'),
	scsslint = require('gulp-scss-lint');

	gulp.task('scss-lint', function() {
	  gulp.src('scss/**/*.scss')
	  	.pipe(cache('scsslint'))
		.pipe(scsslint({
			config: 'lint.yml',
			'maxBuffer': 1307200
		}));
	});