import gulp from 'gulp'
import bounce from './_bounce'
import changed from 'gulp-changed'
import plumber from 'gulp-plumber'
import pug from 'gulp-pug'

const asset = () => {
  return gulp.src('./src/views/*.pug')
    .pipe(plumber({ errorHandler: bounce }))
    .pipe(changed('./dist'))
    .pipe(pug({}))
    .on('error', (error) => {
      console.error(error.message)
    })
    .pipe(gulp.dest('./dist'))
}

export default asset
