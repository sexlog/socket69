const gulp       = require('gulp'),
      sourcemaps = require('gulp-sourcemaps'),
      source     = require('vinyl-source-stream'),
      buffer     = require('vinyl-buffer'),
      browserify = require('browserify'),
      watchify   = require('watchify'),
      babel      = require('babelify');

function compile(watch) {

    let bundler = watchify(browserify('./src/socket69.js', {
        debug: true
    }).transform(babel));

    function rebundle() {
        bundler.bundle()
               .on('error', function(err) {
                   console.error(err);
                   this.emit('end');
               })
               .pipe(source('socket69.js'))
               .pipe(buffer())
               .pipe(sourcemaps.init({loadMaps: true}))
               .pipe(sourcemaps.write('./'))
               .pipe(gulp.dest('./dist'));
    }

    if (watch) {
        bundler.on('update', function() {
            console.log('Recompilado');
            rebundle();
        });
    }

    rebundle();
}

function watch() {
    return compile(true);
}

gulp.task('build', function() {
    return compile();
});

gulp.task('watch', function() {
    return watch();
});

gulp.task('default', ['watch']);