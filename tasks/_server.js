import gulp from 'gulp'
import gulpConfig from '../config'
import Browser from 'browser-sync'

const path = process.env.DOCS ? {
  src: gulpConfig.path.src,
  dest: gulpConfig.path.docs,
} : gulpConfig.path
const browser = Browser.create()
const config = {
  server: `${path.dest}`,
  open: false,
  port: process.env.DOCS ? 3002 : 3000
}

const server = () => {
  browser.init(config)
  gulp.watch(`${path.dest}/**/*`).on('change', () => browser.reload())
}

export default server
