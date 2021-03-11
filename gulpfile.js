const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer'); // Autoprefixer, must use: npm install --save-dev gulp-autoprefixer
const cssmin = require('gulp-cssnano');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
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
gulp.task('sass', function(){
    gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(prefix())
        .pipe(rename('main.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'))
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
gulp.task('scripts', function(){
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

// Copy HTML
gulp.task('copyhtml', function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
});


// Optimize Images, must use: npm install --save-dev gulp-imagemin
gulp.task('imageMin', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

// Watch, use: gulp watch
gulp.task('watch', function(){
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/images/*', ['imageMin']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/*.html', ['copyhtml']);
});

/*  BUILD TASKS */

gulp.task('default', function(done) {
    runSequence('copyhtml', 'sass', 'scripts', 'watch', done);
});

gulp.task('build', function(done) {
    runSequence('sass', done);
});