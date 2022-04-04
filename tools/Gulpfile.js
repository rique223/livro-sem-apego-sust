var gulp = require("gulp");

function setError(error) {
  console.log(error.toString());
  this.emit("end");
}

//
// Stylus
//

var stylus = require("gulp-stylus");
var autoprefixerStylus = require("autoprefixer-stylus");
var combineMq = require("gulp-combine-mq");

gulp.task("stylus", function () {
  return gulp
    .src("../src/css/main.styl")
    .pipe(
      stylus({
        use: [autoprefixerStylus()],
      })
    )
    .on("error", setError)
    .pipe(gulp.dest("../public/css"));
});

gulp.task(
  "combineMq",
  gulp.series("stylus", function () {
    return gulp
      .src("../public/css/main.css")
      .pipe(
        combineMq({
          beautify: true,
        })
      )
      .on("error", setError)
      .pipe(gulp.dest("../public/css/"));
  })
);

var cssmin = require("gulp-cssmin");
gulp.task("compresscss", function (done) {
  gulp
    .src("../public/css/main.css")
    .pipe(cssmin())
    .pipe(gulp.dest("../public/css/"));

  done();
});

//
// Pug
//

var pug = require("gulp-pug");

gulp.task("pug", function () {
  return gulp
    .src("../src/html/pages/*.pug")
    .pipe(pug())
    .on("error", setError)
    .pipe(gulp.dest("../public/"));
});

//
// SVG Sprite

var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var path = require("path");

gulp.task("svgstore", function () {
  return gulp
    .src("../public/img/svg/*.svg")
    .pipe(
      svgmin(function (file) {
        var prefix = path.basename(file.relative, path.extname(file.relative));
        return {
          plugins: [
            {
              cleanupIDs: {
                prefix: prefix + "-",
                minify: true,
              },
            },
          ],
        };
      })
    )
    .pipe(svgstore())
    .pipe(gulp.dest("../public/img"));
});

//
// JS
//

var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var pump = require("pump");

gulp.task("js", function () {
  var srcJs = "../src/js";
  return gulp
    .src([
      srcJs + "/_init.js",
      srcJs + "/1.modules/*.js",
      srcJs + "/2.resources/*.js",
      srcJs + "/3.services/*.js",
      srcJs + "/4.controllers/*.js",
      "../src/js/main.js",
    ])
    .pipe(concat("app.js"))
    .pipe(gulp.dest("../public/js/"));
});

gulp.task(
  "compress",
  gulp.series("js", function (cb) {
    pump(
      [gulp.src("../public/js/app.js"), uglify(), gulp.dest("../public/js/")],
      cb
    );
  })
);

//
// Connect Server
//
var connect = require("gulp-connect");
var modrewrite = require("connect-modrewrite");
gulp.task("serve", function (done) {
  connect.server({
    root: "../public",
    port: 8000,
    middleware: function () {
      return [
        modrewrite([
          "^/sobre/?$ /about.html",
          "^/contato/?$ /contact.html",
          "^/livros/?$ /books.html",
          "^/livros/([^/]+)/([^/]+)/?$ /books-internal.html",
          "^/login/?$ /login.html",
          "^/painel/?$ /user-dashboard.html",
          "^/painel/perfil/?$ /user-profile.html",
          "^/painel/livros/?$ /user-donated-books.html",
          "^/painel/livros/doar-livros/?$ /user-register-book.html",
          "^/painel/livros/doar-livros/([^/]+)/?$ /user-edit-book.html",
          "^/criar-conta/?$ /create-account.html",
          "^/redefinir-senha/?$ /forget-password.html",
        ]),
      ];
    },
  });
  done();
});

//
// Task Default

gulp.task(
  "default",
  gulp.parallel("serve", function (done) {
    gulp.watch("../src/css/**/*.styl", gulp.series("combineMq"));
    gulp.watch("../src/html/**/*.pug", gulp.series("pug"));
    gulp.watch(
      ["../src/js/*.js", "../src/js/**/*.js"],
      gulp.series("compress")
    );
    done();
  })
);

gulp.task("build", gulp.series("compresscss"));
gulp.task("svg", gulp.series("svgstore"));
