 


  // Configuration de Gulp.js
 var gulp = require('gulp') ;
 var minifyCSS  = require('gulp-csso');
 var minifyJS  = require('gulp-minify');
 var imagemin = require('gulp-imagemin');
 var htmlmin = require('gulp-htmlmin');
 var rename = require('gulp-rename');

 var uglify = require('gulp-uglify');
 var pipeline = require('readable-stream').pipeline;

 // import imageminWebp from 'imagemin-webp';
 var beautify = require('gulp-jsbeautifier');

 // task avif and other
  var squoosh = require('gulp-libsquoosh');
  gulp.task('imgAvif', () =>
      gulp.src('src/img/*')
      .pipe(
          squoosh({
              oxipng: {},
              webp: {},
              avif: {},
          })
      ).pipe(gulp.dest('./dist/img'))
   );

  // beautify  html js CSS
 gulp.task('beautify', () =>
     gulp.src(['src/css/*.css', 'src/html/*.html', 'src/js/*.js'])
         .pipe(beautify())
         .pipe(gulp.dest('./dist'))
 );


 // beautify only CSS
 gulp.task('beautifyCSS', () =>
     gulp.src('src/css/*.css')
         .pipe(beautify())
         .pipe(gulp.dest('src/css'))
 );


 // beautify only js
 gulp.task('beautifyJS', () =>
     gulp.src('src/js/*.js')
         .pipe(beautify())
         .pipe(gulp.dest('src/js'))
 );


 // beautify only HTML
 gulp.task('beautifyHTML', () =>
     gulp.src('src/html/*.twig')
         .pipe(beautify())
         .pipe(gulp.dest('src/html'))
 );

 // minify CSS
 gulp.task('cssTask', () => {
   return gulp.src('src/css/*.css')
       .pipe(minifyCSS())
       .pipe(gulp.dest('src/css'));
 });

 // minify JS
 gulp.task('jsTask', function() {
     return gulp.src('src/js/*.js')
         .pipe(minifyJS())
         .pipe(gulp.dest('src/js'));
 });

 // compress JS and replace it
 gulp.task('compress', function () {
         return pipeline(
             gulp.src('src/js/*.js'),
             uglify(),
             gulp.dest('src/js')
         );
 });

// minify HTML
 gulp.task('htmlTask', () => {
     return gulp.src('src/html/*')
         .pipe(htmlmin({ collapseWhitespace: true }))
         .pipe(gulp.dest('src/html'));
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
     gulp.watch('src/html/*', gulp.series('htmlTask'));
 });

 // Description  Default Task
// gulp.task('default', function () { console.log('Hello Gulp!') });

 // RUN Default Task
// gulp.task('default', gulp.parallel('default' ));

