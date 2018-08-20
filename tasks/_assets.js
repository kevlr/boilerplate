import gulp from 'gulp'
import gulpConfig from './config'

const assets = () => {
  return gulp.src('./src/assets/**/*')
    .pipe(gulp.dest(`${gulpConfig.dest}`))
}

export default assets
