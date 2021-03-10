const gulp = require('gulp');

/*

    -- TOP LEVEL FUNCTIONS --

    gulp.task - Define tasks
    gulp.src - Points to files to use
    gulp.dest - Points to folder output
    gulp.watch - Watches files and folders for changes

*/

// Logs Message
gulp.task('message', function() {
    return console.log('Gulp is running');
});