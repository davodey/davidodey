var gulp = require('gulp'),
    requireDir = require('require-dir'),
    tasks = requireDir('./_tasks');

gulp.task('default', gulp.series(
    gulp.parallel('compile-scss', 'require-js'),
    function watch(done) {
        gulp.watch('_scss/*.scss', gulp.series('compile-scss'));
        gulp.watch('js/app/*.js', gulp.series('require-js'));
        gulp.watch('js/tools/*.js', gulp.series('require-js'));
        gulp.watch('js/app/**/*.js', gulp.series('require-js'));
        done();
    }
));
