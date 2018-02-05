var gulpie = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

gulpie.task('watch', function() {

  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });

  watch('./app/index.html', function() {
   browserSync.reload();
  });

  watch('./app/assets/styles/**/*.css', function() {
    gulpie.start('cssInject');
  });
});

gulpie.task('cssInject', ['styles'],function() {
    return gulpie.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});
