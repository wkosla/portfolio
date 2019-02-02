const gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  browsersync = require('browser-sync').create();

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./build/"
    },
    port: 3000
  });
  done();
}

function browserSyncReload(done) {
  browsersync.reload()
  done()
}

function styles() {
  return gulp.src('./src/assets/css/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/assets/css/'))
    .pipe(browsersync.stream())
}

function html() {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./build/'))
}

function watchFiles() {
  gulp.watch('./src/assets/css/**/*', styles)
  gulp.watch('./src/**/*.html', gulp.series(html, browserSyncReload))
}

const watch = gulp.series(html, styles, gulp.parallel(watchFiles, browserSync))

exports.watch = watch
