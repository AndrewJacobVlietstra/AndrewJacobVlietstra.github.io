const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*

    -- TOP LEVEL FUNCTIONS --

    gulp.task - Define tasks
    gulp.src - Points to files to use
    gulp.dest - Points to folder output
    gulp.watch - Watches files and folders for changes

*/

// Logs Message - test task
gulp.task('message', function() {
    return console.log('Gulp is running');
});


// Compile Sass, must use: npm install --save-dev gulp-sass
gulp.task('sass', function(){
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
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
    gulp.watch('src/*.html', ['copyHTML']);
});

// This is an example of default: gulp
// But watch is prob just easier to use, instead of typing gulp all the time :)
gulp.task('default', ['copyhtml', 'imageMin', 'scripts', 'sass']);