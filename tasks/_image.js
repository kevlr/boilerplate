import gulp from 'gulp'
import gulpConfig from '../config'
import imagemin from 'gulp-imagemin'
import cache from 'gulp-cache'

const path = process.env.DOCS ? {
  src: gulpConfig.path.src,
  dest: gulpConfig.path.docs,
} : gulpConfig.path

const image = () => {
  return gulp.src(`${path.src}/images/**/*`)
    .pipe(cache(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo({plugins: [{cleanupIDs: false}]})
    ])))
    .pipe(gulp.dest(`${path.dest}/images`))
}

export default image
