import gulp from 'gulp'
import gulpConfig from './config'
import cache from 'gulp-cache'
import imagemin from 'gulp-imagemin'
import rename from 'gulp-rename'
import svgSprite from 'gulp-svg-sprite'

const icon = () => {
  return gulp.src(`${gulpConfig.src}/icons/**/*.svg`)
    .pipe(cache(imagemin([
      imagemin.svgo({plugins: [{
        cleanupIDs: false
      }]})
    ])))
    .pipe(gulp.dest(`${gulpConfig.dest}/images/icons`))
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
    .pipe(gulp.dest(`${gulpConfig.dest}/images`))
}

export default icon
