import gulp from 'gulp'
import gulpConfig from '../config'
import cache from 'gulp-cache'
import imagemin from 'gulp-imagemin'
import rename from 'gulp-rename'
import svgSprite from 'gulp-svg-sprite'

const path = process.env.DOCS ? {
  src: gulpConfig.path.src,
  dest: gulpConfig.path.docs,
} : gulpConfig.path

const icon = () => {
  return gulp.src(`${path.src}/icons/**/*.svg`)
    .pipe(cache(imagemin([
      imagemin.svgo({plugins: [{
        cleanupIDs: false
      }]})
    ])))
    .pipe(gulp.dest(`${path.dest}/images/icons`))
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
    .pipe(gulp.dest(`${path.dest}/images`))
}

export default icon
