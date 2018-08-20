import gulp from 'gulp'
import assets from './_assets'
import clean from './_clean'
import clearCache from './_clear-cache'
import icon from './_icon'
import image from './_image'
import scripts from './_webpack'
import server from './_server'
import style from './_style'
import view from './_view'

const watch = () => {
  gulp.watch('./src/assets/**/*', assets)
  gulp.watch('./src/icons/**/*', gulp.series(icon, view))
  gulp.watch('./src/images/**/*', image)
  gulp.watch('./src/js/**/*.js', scripts)
  gulp.watch('./src/scss/**/*.scss', style)
  gulp.watch('./src/views/**/*', view)
}


export const build = gulp.series(
  gulp.parallel(clean, clearCache),
  gulp.parallel(scripts, style, image, assets,
    gulp.series(icon, view)
  )
)
export const dev = gulp.series(
  build,
  gulp.parallel(watch, server)
)
