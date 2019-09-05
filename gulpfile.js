var gulp = require('gulp');
var rename = require('gulp-rename');
var browserify = require('browserify');
var source = require('vinyl-source-stream')

var babelify = require('babelify');

var files = {
    js: './app.js',
    dest: './'
}

/**
 * Configure browserify
 */
function getBrowserify(entry) { 
    console.log('Browserify entry', entry);
    return browserify({
        entries: [entry],
        // These params are for watchify
        cache: {}, 
        packageCache: {}
    })
}

/**
 * Bundel js from browserify
 * If compress is true, then uglify js
 */
function bundleJs(browserify) {

    var handleError = function(er){
        console.log(er.message+' on line '+er.line+':'+er.column);
        console.log(er.annotated);
    }

    var destFileName = 'build/bundle.min.js';

    var s = browserify;

    s = s
	.transform('babelify', {presets: ['env']})
        .bundle()
        .on('error', handleError)
        .pipe(source(destFileName))
        .pipe(gulp.dest(files.dest));
}

gulp.task('js', function(){
    bundleJs(getBrowserify(files.js), false);
});

gulp.task('default', ['js']);
