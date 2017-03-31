//--------------------------------------------------------------------------------------------------------------------------------------
// SET DEPENDENCIES
//--------------------------------------------------------------------------------------------------------------------------------------

// Required for all tasks
const gulp = require('gulp');
// Used to compile JS modules
const browserify = require("browserify");
const source = require('vinyl-source-stream');
const glob = require('glob');
const streamify = require('gulp-streamify');
const rename = require("gulp-rename");
// Required for SASS compile
const sass = require('gulp-sass');
// Adds support for SASS globbing
const sassGlob = require('gulp-sass-glob');
// Used to lint SASS
const gulpStylelint = require('gulp-stylelint');
// Used to create synchronous build tasks
const runSequence = require('run-sequence');


//--------------------------------------------------------------------------------------------------------------------------------------
// TESTING FUNCTIONS
//--------------------------------------------------------------------------------------------------------------------------------------

// BUILD JS
gulp.task('js', function() {
	var files = glob.sync('test/test.global.js');
	files.map(function(file) {
		return browserify({entries: file})
		.transform('babelify', {presets: ['es2015']})
		.bundle()
		.pipe(source(file))
		.pipe(rename("test.global-compiled.js"))
		.pipe(gulp.dest('./test'));
	});
});

// Build function to compile SASS
gulp.task('sass', function () {
	return gulp.src('test/test.main.scss')
	.pipe(sassGlob())
	.pipe(sass({outputStyle: 'expanded', precision: 8}).on('error', sass.logError))
	.pipe(gulp.dest('test/'))
});

// Lint SASS Task
gulp.task('sass-lint', function lintCssTask() {
	return gulp.src('**/*.scss')
	.pipe(gulpStylelint({
		failAfterError: true,
		reportOutputDir: 'test/reports/',
		reporters: [{
			formatter: 'verbose',
			console: true,
			save: 'report.txt'
		}]
	}));
});

// BUILD FUNCTION
gulp.task('build',function() {
	runSequence(
		["sass", "sass-lint", "js"]
	);
});

// WATCH FUNCTION
gulp.task("watch", function() {
	// JS
	gulp.watch('**/*.js', ['js']);
	// SASS
	gulp.watch('**/*.scss', ['sass']);
});