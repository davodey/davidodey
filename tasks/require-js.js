// Load plugins
var gulp = require('gulp'),
    notify = require('gulp-notify'),
    exec = require('child_process').exec;
    

gulp.task('require-js', function (cb) {
  exec('node js/tools/r.js -o js/tools/build.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
    notify().write({message: 'JS has been run through r.js and optimized'});
  });
});
