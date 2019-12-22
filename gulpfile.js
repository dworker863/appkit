const gulp = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify-es").default;

function styles() {
  return gulp.src("./assets/scss/**/*.scss")
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(concat("style.css"))
  .pipe(autoprefixer())
  .pipe(cleanCSS({ level: 2 }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest("assets/css"))
  .pipe(browserSync.stream())
}

function scripts() {
  return gulp.src("./assets/js/common.js")
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(concat("scripts.min.css"))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest("assets/js"))
  .pipe(browserSync.stream())
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "assets"
    }
  })

  gulp.watch("assets/**/*.html").on("change", browserSync.reload);
  gulp.watch("assets/scss/**/*.scss", gulp.series(styles));
  gulp.watch("assets/js/common.js", gulp.series(scripts));
}
exports.default = gulp.series(gulp.parallel(styles, scripts), watch);