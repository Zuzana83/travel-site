var gulpie = require('gulp'),
  imagemin = require('gulp-imagemin'),
  del = require('del'),
  usemin = require('gulp-usemin'),
  rev = require('gulp-rev'),
  cssnano = require('gulp-cssnano'),
  uglify = require('gulp-uglify'),
  browserSync = require('browser-sync').create();;

gulpie.task('previewDist', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "docs"
    }
  });
});

gulpie.task('deleteDistFolder', function() {
  return del("./docs");
});

gulpie.task('copyGeneralFiles', ['deleteDistFolder'], function() {
var pathsToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/images/**',
    '!./app/assets/styles/**',
    '!./app/assets/scripts/**',
    '!./app/temp',
    '!./app/temp/**'
  ]

  return gulpie.src(pathsToCopy)
    .pipe(gulpie.dest("./docs"));
});

gulpie.task('optimizeImages', ['deleteDistFolder'], function() {
  return gulpie.src('./app/assets/images/**/*')
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulpie.dest("./docs/assets/images/"));
});

gulpie.task('useminTrigger', ['deleteDistFolder'], function() {
  gulpie.start('usemin');
});

gulpie.task('usemin', ['styles', 'scripts'], function() {
  return gulpie.src("./app/index.html")
    .pipe(usemin({
      css: [function(){return rev()}, function(){return cssnano()}],
      js: [function(){return rev()}, function(){return uglify()}]
    }))
    .pipe(gulpie.dest("./docs"));
});

gulpie.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);
