import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import cache from 'gulp-cache'

const image = () => {
  return gulp.src('./src/js/app.js')
    .pipe(cache(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo({plugins: [{cleanupIDs: false}]})
    ])))
    .pipe(gulp.dest('./dist/images'))
}

export default image
