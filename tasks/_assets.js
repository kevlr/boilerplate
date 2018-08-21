import gulp from 'gulp'
import gulpConfig from '../config'

const path = process.env.DOCS ? {
  src: gulpConfig.path.src,
  dest: gulpConfig.path.docs,
} : gulpConfig.path

const assets = () => {
  return gulp.src(`${path.src}/assets/**/*`)
    .pipe(gulp.dest(`${path.dest}`))
}

export default assets
