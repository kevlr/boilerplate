import gulp from 'gulp'

const assets = () => {
  return gulp.src('./src/assets/**/*')
    .pipe(gulp.dest('./dist'))
}

export default assets
