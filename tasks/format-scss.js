var gulp = require('gulp'),
    sassbeautify = require('gulp-sassbeautify');
    
gulp.task('format-scss', function () {
  gulp.src('scss/**/*.scss')
    .pipe(sassbeautify())
    .pipe(gulp.dest('scss'))
})
