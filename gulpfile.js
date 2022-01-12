 // Configuration de Gulp.js
 var gulp = require('gulp') ;
 var minifyCSS  = require('gulp-csso');
 var minifyJS  = require('gulp-minify');
 var imagemin = require('gulp-imagemin');
// import imageminWebp from 'imagemin-webp';



 // minify CSS
 gulp.task('cssTask', () => {
   return gulp.src('src/css/*.css')
       .pipe(minifyCSS())
       .pipe(gulp.dest('build/css'));
 });

 // minify JS
 gulp.task('jsTask', function() {
     return gulp.src('src/js/*.js')
         .pipe(minifyJS())
         .pipe(gulp.dest('build/js'));
 });


// minify img
gulp.task('imgTask', function() {
     return gulp.src('src/img/*')
         .pipe(imagemin([
//             imagemin.gifsicle({interlaced: true}),
//             imagemin.optipng({optimizationLevel: 5}),
             imagemin.jpegtran({
                //  arithmetic: true
                //  198098 devient  180174 avec  arithmetic
                //   progressive: true
                //  198098 devient  195316 avec  progressive
             })//,
//             imagemin.svgo({
//                 plugins: [
//                     {removeViewBox: true},
//                     {cleanupIDs: false}
//                 ]
//             })
         ]))
         .pipe(gulp.dest('build/img'));
 });



 // Watch Task // 
 gulp.task('watch', function() {
     gulp.watch('src/css/*', gulp.series('cssTask'));
     gulp.watch('src/js/*', gulp.series('jsTask'));
     gulp.watch('src/img/*', gulp.series('imgTask'));
 });

 // Description  Default Task
// gulp.task('default', function () { console.log('Hello Gulp!') });

 // RUN Default Task
// gulp.task('default', gulp.parallel('default' ));


