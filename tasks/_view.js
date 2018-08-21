import gulp from 'gulp'
import gulpConfig from '../config'
import bounce from './_bounce'
import chalk from 'chalk'
import changed from 'gulp-changed'
import plumber from 'gulp-plumber'
import pug from 'gulp-pug'

const path = process.env.DOCS ? {
  src: gulpConfig.path.src,
  dest: gulpConfig.path.docs,
} : gulpConfig.path

const view = () => {
  return gulp.src([
      `${path.src}/views/**/*.pug`,
      `!${path.src}/views/_**/*`
    ])
    .pipe(plumber({ errorHandler: bounce }))
    .pipe(changed(`${path.dest}`))
    .pipe(pug({
      basedir: `${path.src}/views`
    }))
    .on('error', (error) => {
      console.error(chalk.red(error.message))
    })
    .pipe(gulp.dest(`${path.dest}`))
}

export default view
