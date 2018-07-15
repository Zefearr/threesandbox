var gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),
    del = require('del'),
    rename = require('gulp-rename'),
    svg2png = require('gulp-svg2png');

   

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
                variables: {
                    replaceSvgWithPng: function(){
                        return function(sprite, render) {
                            return render(sprite).split('.svg').join('.png');
                        }
                    }
                },
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
   

    gulp.task('createSprite', ['cleanBefore'], function(){
        return gulp.src('./app/assets/images/icons/**/*.svg')
            .pipe(svgSprite(config)) 
            .pipe(gulp.dest('./app/temp/sprite/'));  
    });
    gulp.task('pngCopy', ['createSprite'], function(){ 
        return gulp.src('./app/temp/sprite/css/*.svg')
            .pipe(svg2png())
            .pipe(gulp.dest('./app/temp/sprite/css')); 
    })

  
    gulp.task('copyGraph', ['pngCopy'], function(){
        gulp.src('./app/temp/sprite/css/**/*.{svg,png}')   
            .pipe(gulp.dest('./app/assets/images/sprites'));
    }) 

    gulp.task('copySpriteCSS', ['createSprite'], function(){
        return gulp.src('./app/temp/sprite/css/**.css')
            .pipe(rename('_sprite.css'))
            .pipe(gulp.dest('./app/assets/styles/modules/')); 

    })
 

   
    
    gulp.task('endClean', ['copyGraph', 'copySpriteCSS'], function(){ 
      
        return del(['./app/temp/sprite']); 
    })
    gulp.task('icons', ['cleanBefore', 'createSprite', 'pngCopy', 'copyGraph', 'copySpriteCSS', 'endClean']);   