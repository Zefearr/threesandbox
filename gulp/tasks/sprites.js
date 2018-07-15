var gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),
    del = require('del'),
    rename = require('gulp-rename');

   

    var config = { 
        shape: {
            dimension: {
                maxWidth:32,
                maxHeight: 32
            },
            spacing: {
                padding:1 
            }
        },
        mode: {
            css: {
                sprite: 'sprite.svg',
                render: { 
                    css: {
                        template: './gulp/templates/sprite.css'
                      
                    }
                }
            }
        }            
    } 

    gulp.task('cleanBefore', function(){
        return del(['./app/temp/sprite', './app/assets/images/sprites']);
    })
    gulp.task('endClean', ['copyGraph', 'copySpriteCSS'], function(){ 
        return del(['./app/temp/sprite']);
    })

    gulp.task('createSprite', ['cleanBefore'], function(){
        return gulp.src('./app/assets/images/icons/**/*.svg')
            .pipe(svgSprite(config)) 
            .pipe(gulp.dest('./app/temp/sprite/'));  
    });

  

    gulp.task('copySpriteCSS', ['createSprite'], function(){
        return gulp.src('./app/temp/sprite/css/**.css')
            .pipe(rename('_sprite.css'))
            .pipe(gulp.dest('./app/assets/styles/modules/')); 

    })
    gulp.task('copyGraph', ['createSprite'], function(){
        gulp.src('./app/temp/sprite/css/**/*.svg')
            .pipe(gulp.dest('./app/assets/images/sprites'));
    })
    gulp.task('icons', ['cleanBefore', 'createSprite', 'copySpriteCSS', 'copyGraph', 'endClean']);  