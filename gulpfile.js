let gulp = require("gulp");
let sass = require("gulp-sass");
let browserSync = require("browser-sync").create();
let util = require("gulp-util");
let uglify = require("gulp-uglify-es").default;
let imagemin = require("gulp-imagemin");
let cache = require("gulp-cache");
let del = require("del");
let concat = require("gulp-concat");
let minifyCSS = require("gulp-minify-css");
let autoprefixer = require("gulp-autoprefixer");
let rename = require("gulp-rename");
let htmlReplace = require("gulp-html-replace");

// Converts Sass to CSS with gulp-sass
gulp.task("sass", () => {
  return gulp
    .src("assets/scss/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("assets/css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

// Minified and merge all files into style.min.css
gulp.task("css", async () => {
  gulp
    .src("assets/css/**/*.css")
    .pipe(minifyCSS())
    .pipe(rename("style.css"))
    .pipe(autoprefixer("last 2 version", "safari 5", "ie 8", "ie 9"))
    .pipe(concat("style.css"))
    .pipe(gulp.dest("dist/css"));
});

// Minified and merge all files into main.js
gulp.task("scripts", async () => {
  gulp
    .src("assets/js/**/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

//Reload browser after change
gulp.task("browserSync", () => {
  let files = ["assets/*.html", "assets/scss/**/*.scss", "assets/js/**/*.js"];
  browserSync.init(files, {
    injectChanges: true,
    server: {
      baseDir: "assets"
    },
    port: util.env.port || 8080,
    open: true
  });
  gulp.watch("assets/scss/**/*.scss", gulp.series(["sass"]));
});

// Replace block code which restricted by comments in assets index.html
gulp.task("htmlreplace", async () => {
  gulp
    .src("assets/*.html")
    .pipe(
      htmlReplace({
        css: "css/style.css",
        js: "js/main.js"
      })
    )
    .pipe(gulp.dest("dist/"));
});

// Optimizing images & cache them
gulp.task("images", async () => {
  return gulp
    .src("assets/images/**/*.+(png|jpg|gif|svg)")
    .pipe(
      cache(
        imagemin({
          interlaced: true
        })
      )
    )
    .pipe(gulp.dest("dist/images"));
});

// Transport fonts into dist folder
gulp.task("fonts", async () => {
  return gulp.src("assets/fonts/**/*").pipe(gulp.dest("dist/fonts"));
});

// Cleaning dist folder
gulp.task("clean:dist", async () => {
  return del.sync("dist");
});

gulp.task("watch", gulp.series(["sass", "css", "scripts", "browserSync"]));

gulp.task(
  "build",
  gulp.series([
    "clean:dist",
    "sass",
    "images",
    "fonts",
    "htmlreplace",
    "css",
    "scripts"
  ])
);

// gulp.task("default", gulp.series(["watch"]));
