// include the required packages.
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var pug = require('gulp-pug');
var browserSync = require('browser-sync').create();



gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  });
});


// Options compress
gulp.task('stylus', function () {
  return gulp.src('app/stylus/**/*.styl')
    .pipe(stylus({ compress: true }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));
});

// watches views/html
gulp.task('pug', function() {
  return gulp.src('app/pug/**/*.pug')
  .pipe(pug({ pretty: true }))
  .pipe(gulp.dest('app'))
  .pipe(browserSync.reload({stream: true}));
});


// watch the action
  gulp.task('default', ['browserSync', 'stylus', 'pug'], function(){
    gulp.watch('app/stylus/**/*.styl', ['stylus']);
    gulp.watch('app/**/*.pug', ['pug']);
    // Other watchers
  });
