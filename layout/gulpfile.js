"use strict";

var gulp = require("gulp"),
    cssbeautify = require("gulp-cssbeautify"),
    removeComments = require('gulp-strip-css-comments'),
    rename = require("gulp-rename"),
    sass = require("gulp-sass"),
    cssmin = require('gulp-cssmin'),
    rigger = require("gulp-rigger"),
    watch = require("gulp-watch"),
    plumber = require("gulp-plumber"),
    imagemin = require("gulp-imagemin"),
    run = require("run-sequence"),
    rimraf = require("rimraf"),
    webserver = require("browser-sync"),
    concat = require('gulp-concat'),
    uglifyes = require('uglify-es'),
    composer = require('gulp-uglify/composer'),
    uglify = composer(uglifyes, console);



/* Paths to source/build/watch files
=========================*/

const scriptsPath = '../theme/assets/scripts';
const bundlesPath = '../theme/assets/scripts/bundles';
const angularPath = '../theme/assets/scripts/angular';
const angularLibsPath = '../theme/assets/scripts/angular/lib';
const angularBundlesPath = '../theme/assets/scripts/bundles/angular';

function buildPaths(path, files) {
    return files.map(file => `${path}/${file}`);
}

var path = {
    build: {
        html: "build/",
        js: "build/assets/js/",
        css: "../theme/assets/css/bundles",
        img_dev: "build/assets/i",
        img_prod: "../theme/assets/images/redesign",
        fonts: "build/assets/fonts/"
    },
    src: {
        html: "src.{htm,html}",
        js: {
            angularLibs: buildPaths(angularLibsPath,
            [
                'angular.js',
                'angular-resource.js',
                'angular-route.js',
                'angular-cookies.js',
                'ngStorage.js',
                'ui-bootstrap-tpls.js',
                'angular-sanitize.js',
                'angular-translate.js',
                'angular-translate-loader-url.js'
            ]),
            angularThemeModules: buildPaths(angularPath,
            [
                'app.js',
                'news.js'
            ]),
            angularBlogModules: buildPaths(angularPath,
            [
                'app.js',
                'services.js',
                'blog.js',
                'news.js'
            ]),
            angularGlossaryModules: buildPaths(angularPath,
            [
                'app.js',
                'services.js',
                'glossary.js',
                'news.js'
            ]),
            main: buildPaths(scriptsPath,
            [
                'jquery-3.5.0.min.js',
                'main.js',
                'lazysizes.min.js',
                'jquery.validate.min.js',
                'jquery.validate.unobtrusive.min.js',
                'jquery.fancybox.min.js'
            ]),
            layout: 'src/assets/js/*.js'
        },
        css: "src/assets/sass/main.scss",
        img: "src/assets/i/**/*.*",
        fonts: "src/assets/fonts/**/*.*"
    },
    watch: {
        html: "src/**/*.{htm,html}",
        js: "src/assets/js/**/*.js",
        css: "src/assets/sass/**/*.scss",
        img: "src/assets/i/**/*.*",
        fonts: "src/assets/fonts/**/*.*"
    },
    clean: "./build"
};



/* Webserver config
=========================*/

var config = {
    server: "build/",
    notify: false,
    open: true,
    ui: false
};



/* Tasks
=========================*/

gulp.task("webserver", function () {
    webserver(config);
});

gulp.task("css:build", function () {
    return gulp.src(path.src.css)
        .pipe(plumber())
        .pipe(sass())
        .pipe(removeComments())
        .pipe(cssbeautify())
        .pipe(gulp.dest(path.build.css))
        .pipe(cssmin())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest(path.build.css));
});

gulp.task('js:build-main', function () {
    return gulp.src(path.src.js.main)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(bundlesPath));
});

gulp.task('js:build-angular-default', function () {
    return gulp.src(path.src.js.angularLibs.concat(path.src.js.angularThemeModules))
        .pipe(plumber())
        .pipe(rigger())
        .pipe(concat('angular-bundle-default.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(angularBundlesPath));
});

gulp.task('js:build-angular-blog', function () {
    return gulp.src(path.src.js.angularLibs.concat(path.src.js.angularBlogModules))
        .pipe(plumber())
        .pipe(rigger())
        .pipe(concat('angular-bundle-blog.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(angularBundlesPath));
});

gulp.task('js:build-angular-glossary', function () {
    return gulp.src(path.src.js.angularLibs.concat(path.src.js.angularGlossaryModules))
        .pipe(plumber())
        .pipe(rigger())
        .pipe(concat('angular-bundle-glossary.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(angularBundlesPath));
});


gulp.task("fonts:build", function () {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});


gulp.task("image:build", function () {
    return gulp.src(path.src.img)
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img_dev));
});


gulp.task("clean", function (cb) {
    rimraf(path.clean, cb);
});

gulp.task("js:build", gulp.series('js:build-main', 'js:build-angular-default', 'js:build-angular-blog', 'js:build-angular-glossary'));

gulp.task('build', gulp.series(
        "clean",
        "css:build",
        "js:build",
        "fonts:build",
        "image:build"
    )
);


gulp.task("watch", function () {
    watch([path.watch.css], function (event, cb) {
        gulp.start("css:build");
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start("js:build");
    });
    watch([path.watch.img], function (event, cb) {
        gulp.start("image:build");
    });
    watch([path.watch.fonts], function (event, cb) {
        gulp.start("fonts:build");
    });
});


gulp.task("default", function (cb) {
    run(
        "clean",
        "build",
        "watch"
        , cb);
});
