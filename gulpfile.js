const gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  imagemin = require('gulp-imagemin'),
  babel = require('gulp-babel'),
  browsersync = require('browser-sync').create();

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: './build/'
    },
    port: 3000
  });
  done();
}

function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function scripts() {
  return gulp.src('./src/assets/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/assets/js/'))
    .pipe(browsersync.stream());
}

function styles() {
  return gulp.src('./src/assets/css/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/assets/css/'))
    .pipe(browsersync.stream());
}

function html() {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./build/'));
}

function images() {
  return gulp.src('./src/assets/img/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          {
            removeViewBox: false,
            inlineStyles: {
              matchedOnlyOnce: false
            }
          }
        ]
      })
    ]))
    .pipe(gulp.dest('./build/assets/img'));
}

function watchFiles() {
  gulp.watch('./src/assets/css/**/*', styles);
  gulp.watch('./src/assets/js/**/*', scripts);
  gulp.watch('./src/img/**/*', gulp.series(images, browserSyncReload));
  gulp.watch('./src/**/*.html', gulp.series(html, browserSyncReload));
}

const img = gulp.series(images, browserSyncReload);
const watch = gulp.series(html, styles, scripts, images, gulp.parallel(watchFiles, browserSync));

exports.watch = watch;
exports.images = img;
