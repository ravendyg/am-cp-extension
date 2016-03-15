var gulp = require('gulp'),
    less = require('gulp-less'),
    LessPluginCleanCSS = require('less-plugin-clean-css'),
    cleancss = new LessPluginCleanCSS({advanced: true}),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del');

// watch
gulp.task('watch', function () {
   gulp.watch('src/styles/*.less', ['styles']);
});

// build
gulp.task('build', [`clean`], function () {
    gulp.start('copy', 'usemin', 'imagemin');
});
   
// styles
gulp.task('styles', function () {
	gulp.src('src/styles/*.less')
		.pipe(less({plugins: [cleancss]}).on('error', function (err) {
			console.dir(err);
		}))
		.pipe(autoprefixer({browsers: ['last 2 Chrome versions']}))
		.pipe(gulp.dest('build/styles'));		
}); 

// images
gulp.task('imagemin', function () {
    gulp.src(`src/img/*.svg`)
        .pipe(gulp.dest(`build/img`));
    return gulp.src('src/img/*')
        .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
        .pipe(gulp.dest('build/img')); 
});

// minimize & uglify
gulp.task('usemin', function () {
    return gulp.src('src/html/*')
            .pipe(gulp.dest('build/html'));
});

// other stuff
gulp.task('copy', function () {;
    return gulp.src('src/manifest.json')
        .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
    return del(['build/img', 'build/html', 'build/manifest.json']); 
});


