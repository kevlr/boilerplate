import gulp from 'gulp'
import cache from 'gulp-cache'
import imagemin from 'gulp-imagemin'
import rename from 'gulp-rename'
import svgSprite from 'gulp-svg-sprite'

const icon = () => {
  return gulp.src('./src/icons/**/*.svg')
    .pipe(cache(imagemin([
      imagemin.svgo({plugins: [{
        cleanupIDs: false
      }]})
    ])))
    .pipe(gulp.dest('./dist/images/icons'))
    .pipe(rename({
      prefix: "icon-"
    }))
    .pipe(cache(imagemin([
      imagemin.svgo({plugins: [{
        removeAttrs: { attrs: 'fill' }
      }]})
    ])))
    .pipe(svgSprite({
      mode: {
        symbol: {
          dest: '',
          sprite: 'icons.svg',
          inline: true
        }
      }
    }))
    .pipe(gulp.dest('./dist/images'))
}

export default icon
