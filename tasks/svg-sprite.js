var gulp = require('gulp');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');
var spritesmith = require('gulp.spritesmith');


gulp.task('svg-sprite', function () {
    return gulp
        .src('_icons/svg-sprite/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: false
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('icons/'));

});
