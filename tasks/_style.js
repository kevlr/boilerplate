import gulp from 'gulp'
import autoprefixer from 'gulp-autoprefixer'
import bounce from './_bounce'
import cssnano from 'gulp-cssnano'
import plumber from 'gulp-plumber'
import postcss from 'gulp-postcss'
import postcssNormalize from 'postcss-normalize'
import rename from 'gulp-rename'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'

const style = () => {
  return gulp.src('./src/scss/app.scss')
    .pipe(plumber({ errorHandler: bounce }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(postcss([
      postcssNormalize()
    ]))
    .pipe(autoprefixer({
  		cascade: false
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
}

export default style
