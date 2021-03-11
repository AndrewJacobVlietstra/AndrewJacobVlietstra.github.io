/*
Had to do a bunch of crazy stuff to get this to freaking work. I downgraded my nodejs from 15 to 14,
I also then downgraded node-sass from 5.0.0 to 4.14.0 to fix compatibility issues. I also had to download Python 2.7
as errors kept getting thrown as node was looking for it. I also got Python 3.9 for good measure though not sure if I need it.
Was getting weird python permission errors so I had to configure some windows "manage application execution aliases"

*/

const gulp = require('gulp');
const { series } = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
var sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer'); // autoprefixer, must use: npm install --save-dev gulp-autoprefixer
const cssmin = require('gulp-cssnano'); // cssnano, must use: npm install --save-dev gulp-cssnano
const concat = require('gulp-concat');
const rename = require('gulp-rename'); // rename, must use: npm install --save-dev gulp-rename


sass.compiler = require('node-sass');

// const plumber = require('gulp-plumber');
// const notify = require('gulp-notify');
// const sassLint = require('gulp-sass-lint');
// const sourcemaps = require('gulp-sourcemaps');

/*

    -- TOP LEVEL FUNCTIONS --

    gulp.task - Define tasks
    gulp.src - Points to files to use
    gulp.dest - Points to folder output
    gulp.watch - Watches files and folders for changes

*/


/* SUB-TASKS  */

// Logs Message - test task
gulp.task('message', function() {
    return console.log('Gulp is running');
});


// Compile Sass, must use: npm install --save-dev gulp-sass
gulp.task('sass', function(done){
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix())
        .pipe(rename('main.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'))
        done();
});


//Minify CSS, must use: npm install --save-dev gulp-uglify
gulp.task('minifycss', function(){
    gulp.src('dist/css/*.css')
        .pipe(uglify())
        .pipe(gulp.dest('dist/css'))
});


// Minify JS, also uses uglify but for the JS files
gulp.task('minifyjs', function(){
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

// Concatenate JS files, must use: npm install --save-dev gulp-concat
gulp.task('scripts', function(done){
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        done();
});

// Copy HTML
gulp.task('copyhtml', function(done){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
        done();
});


// Optimize Images, must use: npm install --save-dev gulp-imagemin
gulp.task('imageMin', function(done){
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
        done();
});

// Watch, use: gulp watch
gulp.task('watch', function(){
    gulp.watch('src/js/*.js', gulp.series('scripts'));
    gulp.watch('src/images/*', gulp.series('imageMin'));
    gulp.watch('src/sass/*.scss', gulp.series('sass'));
    gulp.watch('src/*.html', gulp.series('copyhtml'));
});

/*  BUILD TASKS */

// just type gulp in terminal to activate default task!
gulp.task('default', gulp.series('copyhtml', 'sass', 'scripts', 'watch', function(done) {
    // task 1 code here
     done();
}));

