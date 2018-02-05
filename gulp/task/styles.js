var gulpie = require('gulp'),
postcss = require('gulp-postcss'),
autoprefix = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins');

gulpie.task('styles', function() {
  return gulpie.src('./app/assets/styles/styles.css')
  .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefix]))
  .on('error', function(errorInfo) {
     console.log(errorInfo.toString());
     this.emit('end');
  })
  .pipe(gulpie.dest('./app/temp/styles'));
});
