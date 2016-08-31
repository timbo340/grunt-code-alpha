// include the required packages.
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib    = require('nib');
var pug = require('gulp-pug');
var useref = require('gulp-useref');
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
    .pipe(stylus({
      compress: true,
      use: nib()
    }))
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

// watches script files
gulp.task('scripts', function() {
  return gulp.src('app/scripts/**/*.js')
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('useref', function(){
  return gulp.src('app/**/*.pug')
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});

// watch the action
  gulp.task('default', ['browserSync', 'stylus', 'pug'], function(){
    gulp.watch('app/stylus/**/*.styl', ['stylus']);
    gulp.watch('app/**/*.pug', ['pug']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    // Other watchers
  });
