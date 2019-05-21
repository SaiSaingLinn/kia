const { src, dest, series, parallel, watch } = require("gulp");

// common module
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const jsUgly = require("gulp-uglify");

// require
const cc = require('./cc.js');

const info = async function() {
  return console.log(cc.dev_info());
}
exports.info = info;

const dependencies = async function() {
  return console.log(cc.dependencies);
}
exports.dependencies = dependencies;

// host files
const host = require("gulp-connect");

const gulpHost = function(cb) {
  host.server({
    root: 'dist',
    livereload: true,
    port: 8090
  }, cb);
}
// load fonts
const gulpFont = function() {
  return src(["./node_modules/@fortawesome/fontawesome-free/webfonts/*.*", "./src/webfonts/*.*"])
    .pipe(dest("./dist/assets/webfonts"))
    .pipe(host.reload());
}
exports.loadFont = gulpFont;


// template module
const pug = require("gulp-pug");
const htmlBeautify = require("gulp-html-beautify");

const gulpTemplate = function() {
  return src("./src/templates/*.pug")
    .pipe(pug())
    .pipe(htmlBeautify({
      "indent_size": 2,
      "indent_char": " ",
      "eol": "\n",
      "indent_level": 0,
      "indent_with_tabs": false
    }))
    .pipe(dest("./dist"))
    .pipe(host.reload());
}

// style task
const sass = require("gulp-sass");
sass.compiler = require("node-sass");
const styleLint = require("gulp-stylelint");
const uglifycss = require("gulp-uglifycss");
const ccss = require("gulp-critical-css");

const styleBuild = function() {
  return src([
    "./node_modules/bootstrap/dist/css/bootstrap.min.css",
    "./node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css",
    "./node_modules/@fortawesome/fontawesome-free/css/all.css",
    "./node_modules/slick-carousel/slick/slick.css",
    "./node_modules/slick-carousel/slick/slick-theme.css",
    "./node_modules/animate.css/animate.min.css",
    "./node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css",
    "./node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.standalone.min.css",
    "./node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css",
    "./node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker3.standalone.min.css"
  ])
  .pipe(concat("bundle.min.css"))
  .pipe(uglifycss({
    "maxLineLen": 80,
    "uglyComments": true
  }))
  .pipe(dest("./src/assets/css/"))
}

const styleCheck = function() {
  return src("./src/scss/custom.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({
      // outputStyle: "compressed"
    }).on("error", sass.logError))
    .pipe(styleLint({
      fix: true,
      reporters: [
        {formatter: "string", console: true},
        {formatter: "json", save: "./logs/report.stylelintrc.json"}
      ]
    }))
    .pipe(ccss())
    .pipe(dest('./src/assets/css/'))
}

const gulpStyle = function() {
  return src(["./src/assets/css/bundle.min.css", "./src/assets/css/custom.css"])
    .pipe(concat("style.min.css"))
    .pipe(uglifycss({
      "uglyComments": true
    }))
    .pipe(dest("./dist/assets/css/"))
    .pipe(host.reload())
}

// javscript task
const esLint = require("gulp-eslint");
const babel = require("gulp-babel");

const jsBuild = function() {
  return src([
    "./node_modules/jquery/dist/jquery.min.js",
    "./node_modules/popper.js/dist/umd/popper.min.js",
    "./node_modules/bootstrap/dist/js/bootstrap.min.js",
    "./node_modules/jquery-lazy/jquery.lazy.min.js",
    "./node_modules/slick-carousel/slick/slick.min.js",
    "./node_modules/paroller.js/dist/jquery.paroller.min.js",
    "./node_modules/wowjs/dist/wow.min.js",
    "./node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"
  ])
  .pipe(concat("bundle.js"))
  .pipe(dest("./src/assets/js/"))
}

const jsCheck = function() {
  return src("./src/assets/js/custom.js")
    .pipe(esLint({fix: true}))
    .pipe(esLint.format())
    .pipe(esLint.failAfterError())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(dest("./src/assets/js/es/"))
}

const gulpJs = function() {
  return src([
    "./src/assets/js/bundle.js",
    "./src/assets/js/es/custom.js"
  ])
  .pipe(concat("core.min.js"))
  // .pipe(jsUgly())
  .pipe(dest("./dist/assets/js/"))
  .pipe(host.reload());
}

// image task
const imageMin = require("gulp-imagemin");
const gulpImage = async function() {
  src("./src/assets/images/**/*")
    .pipe(imageMin([
      imageMin.gifsicle({interlaced: true}),
      imageMin.jpegtran({progressive: true}),
      imageMin.optipng({optimizationLevel: 5}),
      imageMin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(dest('dist/assets/images'))
    .pipe(host.reload());
}
exports.imageMin = gulpImage;

// build
exports.build = parallel(
  gulpFont,
  gulpImage,
  gulpTemplate,
  styleBuild,
  styleCheck,
  gulpStyle,
  jsBuild,
  jsCheck,
  gulpJs
);

// watch list
const gulpWatch = async function() {
  watch("./src/templates/**/*.pug", gulpTemplate);
  watch("./src/scss/**/*.scss", series(styleCheck, gulpStyle));
  watch("./src/assets/js/custom.js", gulpJs);
  watch("./src/assets/images/**/*", gulpImage);
  watch("./src/scss/custom.scss", series(styleCheck, gulpStyle));
  watch("./src/assets/js/custom.js", series(jsCheck, gulpJs));
}

exports.default = series(
  gulpHost,
  gulpWatch
);
