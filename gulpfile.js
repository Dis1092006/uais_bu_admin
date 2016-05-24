var gulp = require('gulp');
//var browserSync = require('browser-sync');

var assetsDev = 'assets/';
var assetsProd = 'src/';

var appDev = 'dev/';
var appProd = 'app/';
var vendor = 'vendor';

/* CSS */
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var cssClean = require('gulp-clean-css');

/* JS & TS */
var typescript = require('gulp-typescript');

var tsProject = typescript.createProject('tsconfig.json');

// gulp.task('browser-sync', function() {
// 	browserSync.init({
// 		proxy: "localhost:3000"
// 	});
// });

gulp.task('build-css', function () {
    return gulp.src(assetsDev + 'scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(cssClean({compatibility: 'ie8'}))
        .pipe(gulp.dest(assetsProd + 'css/'));
});

gulp.task('build-ts', function () {
    return gulp.src(appDev + '**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write())
        //.pipe(jsuglify())
        .pipe(gulp.dest(appProd));
});

gulp.task('vendor', function() {
	
	// Angular 2 Framework
	gulp.src('node_modules/@angular/**')
		.pipe(gulp.dest(vendor + '/@angular'));
	
	//bootstrap
	gulp.src('node_modules/bootstrap/**')
		.pipe(gulp.dest(vendor + '/bootstrap/'));
	
	//ES6 Shim
	gulp.src('node_modules/es6-shim/**')
		.pipe(gulp.dest(vendor + '/es6-shim/'));
	
	//fullcalendar
	gulp.src('node_modules/fullcalendar/**')
		.pipe(gulp.dest(vendor + '/fullcalendar/'));

	//primeng
	gulp.src('node_modules/primeng/**')
		.pipe(gulp.dest(vendor + '/primeng/'));
	
	//primeui
	gulp.src('node_modules/primeui/**')
		.pipe(gulp.dest(vendor + '/primeui/'));

	//reflect metadata
	gulp.src('node_modules/reflect-metadata/**')
		.pipe(gulp.dest(vendor + '/reflect-metadata/'));

	//rxjs
	gulp.src('node_modules/rxjs/**')
		.pipe(gulp.dest(vendor + '/rxjs/'));
	
	//systemjs
	gulp.src('node_modules/systemjs/**')
		.pipe(gulp.dest(vendor + '/systemjs/'));
	
	//zonejs
	return gulp.src('node_modules/zone.js/**')
		.pipe(gulp.dest(vendor + '/zone.js/'));
});

gulp.task('bundle-ts', ['build-ts'], function() {
    var path = require("path");
    var Builder = require('systemjs-builder');

// optional constructor options
// sets the baseURL and loads the configuration file
    var builder = new Builder('', 'systemjs.config.js');

    builder
        .buildStatic('app/boot.js', 'app/bundle.js', { minify: false, sourceMaps: true})
        .then(function() {
            console.log('Build complete');
        })
        .catch(function(err) {
            console.log('Build error');
            console.log(err);
        });
});

gulp.task('watch', function () {
    gulp.watch(appDev + '**/*.ts', ['build-ts', 'bundle-ts']);
    gulp.watch(assetsDev + 'scss/**/*.scss', ['build-css']);
});

gulp.task('default', ['watch', 'build-ts', 'build-css']);