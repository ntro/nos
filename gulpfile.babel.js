// generated on 2016-02-15 using generator-gulp-webapp 1.1.1
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('css', () => {
  return gulp.src('app/style/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('app/css'))
    .pipe(reload({stream: true}));
});
gulp.task('styles', function() {
  return gulp.src('app/css/*.css')
    .pipe($.cssnano({ zindex: false }))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('js', function() {
  return gulp.src(['app/script/a.js','app/script/*.js'])
    .pipe($.concat('vendor.js'))
    .pipe(gulp.dest('app/js'))
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(reload({stream: true}));
});
gulp.task('scripts', function() {
  return gulp.src('app/js/**')
    .pipe(gulp.dest('dist/js'))
});
gulp.task('html', ['scripts', 'styles'], () => {
  return gulp.src('app/*.html')
    .pipe($.htmlmin())
    .pipe(gulp.dest('dist'));
});
gulp.task('images', () => {
  return gulp.src('app/img/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('serve', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: 'app'
    }
  });
  gulp.watch([
    'app/*.html',
    'app/img/**/*'
  ]).on('change', reload);

  gulp.watch('app/style/*.scss', ['css']);
  gulp.watch('app/script/*.js', ['js']);
});

gulp.task('build', ['html', 'images'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
