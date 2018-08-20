import gulp from 'gulp'
import bounce from './_bounce'
import plumber from 'gulp-plumber'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'

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
  return gulp.src('./src/js/app.js')
    .pipe(plumber({ errorHandler: bounce }))
    .pipe(webpackStream(config), webpack)
    .pipe(gulp.dest('./dist/js'))
}

export default scripts
