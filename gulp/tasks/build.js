var gulp = require('gulp'),
    // imageMin = require('gulp-imagemin'),
    del = require('del'),
    // usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    // cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'); 
    browserSync = require('browser-sync').create(); 

    gulp.task('prevDist', function(){
        browserSync.init({
            notify: false, 
            server: {    
             baseDir: 'docs'    
          }  
        }); 
    })

gulp.task('deleteDist', ['icons'], function(){
    return del('./docs'); 
})    

gulp.task('optimizeImg', ['deleteDist'], function(){
    return gulp.src(['./app/assets/images/**/*', './app/favicon.png', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
        .pipe(gulp.dest('./docs/assets/images')); 
})
gulp.task('useminTrigger', ['deleteDist'], function(){
    gulp.start('usemin')
}) 
// gulp.task('usemin', ['styles', 'scripts'], function(){
//     return gulp.src('./app/index.html')
//         .pipe(usemin({
//             css: [function(){return rev()}, function(){return cssnano()}],
//             js: [function(){return rev()}, function(){return uglify()}] 
//         }))
//         .pipe(gulp.dest('./docs'));
// })

gulp.task('usemin', ['styles', 'scripts'], function(){
    return gulp.src('./app/index.html')
        .pipe(gulp.dest('./docs'));
})
gulp.task('build', ['deleteDist','optimizeImg', 'useminTrigger']);    