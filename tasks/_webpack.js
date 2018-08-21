import gulp from 'gulp'
import gulpConfig from '../config'
import bounce from './_bounce'
import plumber from 'gulp-plumber'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'

const path = process.env.DOCS ? {
  src: gulpConfig.path.src,
  dest: gulpConfig.path.docs,
} : gulpConfig.path
const nodeEnv = process.env.NODE_ENV || 'production'
const config = {
  output: {
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        loader: 'eslint-loader',
      },
      {
        loader: 'babel-loader',
      }
    ],
  },
  mode: nodeEnv,
  devtool: 'source-map',
}

const scripts = () => {
  return gulp.src(`${path.src}/js/app.js`)
    .pipe(plumber({ errorHandler: bounce }))
    .pipe(webpackStream(config), webpack)
    .pipe(gulp.dest(`${path.dest}/js`))
}

export default scripts
