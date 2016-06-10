// Load plugins
var gulp = require('gulp'),
    notify = require('gulp-notify'),
    requireDir = require('require-dir'),
    tasks = requireDir('./_tasks');
    
/*************************** Below are standard tasks that we will use regularly    
**************************** Another list of tasks is provided below, please use as a reference */   

// Default task: 
// $ gulp
gulp.task('default', function() {
    gulp.start('compile-scss');
    //gulp.start('scss-lint');
    gulp.start('require-js');
    gulp.watch('_scss/*.scss', ['compile-scss']);
    gulp.watch('js/app/*.js', ['require-js']);
    gulp.watch('js/tools/*.js', ['require-js']);
    gulp.watch('js/app/**/*.js', ['require-js']);
    gulp.watch('js/app/**/**/*.js', ['require-js']);

});

/*************************** Below is a list of individual tasks you can run  
$ gulp copy-js
$ gulp copy-css
$ gulp copy-img
$ gulp hint-js
$ gulp format-scss
$ gulp compile-scss
$ gulp scss-lint
$ gulp amazon-deploy
$ gulp format-html
$ gulp require-js
****************************/

