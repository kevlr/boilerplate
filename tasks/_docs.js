import gulp from 'gulp'
import gulpConfig from '../config'
import autoprefixer from 'gulp-autoprefixer'
import bounce from './_bounce'
import chalk from 'chalk'
import changed from 'gulp-changed'
import cssnano from 'gulp-cssnano'
import data from 'gulp-data'
import fs from 'fs'
import plumber from 'gulp-plumber'
import pug from 'gulp-pug'
import rename from 'gulp-rename'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'

const path = process.env.DOCS ? {
  src: gulpConfig.path.src,
  dest: gulpConfig.path.docs,
} : gulpConfig.path
const filters = {
  preformat(html, options) {
    const lang = options.lang || 'html'
    const preview = lang === 'html' ? `<div class="d-preview"><div class="l-wrapper">${html}</div></div>` : ''

    return `${preview}<pre class="d-code"><code class="js-highlight ${lang}">${html}</code></pre>`
  }
}

const docs = () => {
  return gulp.src([
      `${path.src}/docs/views/**/*.pug`,
      `!${path.src}/docs/views/**/_**/*`
    ])
    .pipe(plumber({ errorHandler: bounce }))
    .pipe(changed(`${path.dest}`))
    .pipe(data(function (file) {
      return {
        icons: fs.readdirSync(`${path.src}/icons/`),
        components: fs.readdirSync(`${path.src}/docs/views/components/`),
        currentPath: file.history[0].replace(file.base, '').split('.pug')[0]
      };
    }))
    .pipe(pug({
      basedir: `${path.src}/docs/views`,
      filters
    }))
    .on('error', (error) => {
      console.error(chalk.red(error.message))
    })
    .pipe(gulp.dest(`${path.dest}`))
}

const docsStyle = () => {
  return gulp.src(`${path.src}/docs/scss/docs.scss`)
    .pipe(plumber({ errorHandler: bounce }))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
  		cascade: false
    }))
    .pipe(gulp.dest(`${path.dest}/css`))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`${path.dest}/css`))
}

export { docs, docsStyle }
