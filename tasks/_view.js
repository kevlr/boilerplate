import gulp from 'gulp'
import gulpConfig from './config'
import bounce from './_bounce'
import changed from 'gulp-changed'
import plumber from 'gulp-plumber'
import pug from 'gulp-pug'

const asset = () => {
  return gulp.src([
      `${gulpConfig.src}/views/**/*.pug`,
      `!${gulpConfig.src}/views/_**/*`
    ])
    .pipe(plumber({ errorHandler: bounce }))
    .pipe(changed(`${gulpConfig.dest}`))
    .pipe(pug({ layout: false }))
    .on('error', (error) => {
      console.error(error.message)
    })
    .pipe(gulp.dest(`${gulpConfig.dest}`))
}

export default asset
