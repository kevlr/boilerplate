import gulp from 'gulp'
import gulpConfig from './config'
import imagemin from 'gulp-imagemin'
import cache from 'gulp-cache'

const image = () => {
  return gulp.src(`${gulpConfig.src}/images/**/*`)
    .pipe(cache(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo({plugins: [{cleanupIDs: false}]})
    ])))
    .pipe(gulp.dest(`${gulpConfig.dest}/images`))
}

export default image
