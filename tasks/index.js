import gulp from 'gulp'
import gulpConfig from '../config'
import assets from './_assets'
import clean from './_clean'
import clearCache from './_clear-cache'
import { docs, docsStyle } from './_docs'
import icon from './_icon'
import image from './_image'
import scripts from './_webpack'
import server from './_server'
import style from './_style'
import view from './_view'

const path = process.env.DOCS ? {
  src: gulpConfig.path.src,
  dest: gulpConfig.path.docs,
} : gulpConfig.path

const watch = () => {
  gulp.watch(`${path.src}/assets/**/*`, assets)
  gulp.watch(`${path.src}/icons/**/*`, gulp.series(icon, view))
  gulp.watch(`${path.src}/images/**/*`, image)
  gulp.watch(`${path.src}/js/**/*.js`, scripts)
  gulp.watch(`${path.src}/scss/**/*.scss`, style)
  gulp.watch(`${path.src}/views/**/*`, view)
  gulp.watch(`${path.src}/docs/views/**/*`, docs)
  gulp.watch(`${path.src}/docs/scss/**/*`, docsStyle)
}

const build = gulp.series(
  gulp.parallel(clean, clearCache),
  gulp.parallel(scripts, style, image, assets,
    gulp.series(icon, view)
  )
)
const dev = gulp.series(
  build,
  gulp.parallel(watch, server)
)
const docsBuild = gulp.series(
  gulp.parallel(clean, clearCache),
  gulp.parallel(scripts, style, docsStyle, image, assets,
    gulp.series(icon, docs)
  )
)
const docsDev = gulp.series(
  docsBuild,
  gulp.parallel(watch, server)
)

export { build, dev, docsBuild, docsDev }
