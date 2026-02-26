var gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('compile-scss', function () {
    return gulp.src('_scss/*.scss')
        .pipe(sass({
            outputStyle: 'expanded',
            sourceComments: true
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('css'));
});
