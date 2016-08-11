var gulp = require('gulp'),
    del = require('del'),
    browserSync = require('browser-sync'),//让浏览器同步响应修改
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');


gulp.task('jsmin', function () {
    gulp.src('src/js/*.js')
    //压缩src/js目录下的所有js文件
    //（**匹配src/js的0个或多个子文件夹）
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
gulp.task('clean', del.bind(null, ['dist']));


gulp.task('styles', function () {
    gulp.src('src/css/*.css')
        .pipe(gulp.dest('dist/css'));
});
gulp.task('img', function () {
    gulp.src('src/img/*')
        .pipe(gulp.dest('dist/img'));
});
gulp.task('lib', function () {
    gulp.src('src/lib/*')
        .pipe(gulp.dest('dist/lib'));
});
gulp.task('html', function () {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});
gulp.task('build', ['jsmin', 'styles', 'img', 'lib', 'html']);


gulp.task('testLess', function () {
    gulp.src('src/less/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css'));
});


gulp.task('serve', function () {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['dist']
        }
    });
    gulp.watch([
        'dist/*.html',
        'dist/css/*.css',
        'dist/js/*.js'
    ]).on('change', browserSync.reload);
    gulp.watch('src/css/*.css', ['styles']);
    gulp.watch('src/js/*.js', ['jsmin']);
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/less/*.less', ['testLess']);
});


gulp.task('default', ['clean'], function () {
    gulp.start('build');//压缩js文件
});