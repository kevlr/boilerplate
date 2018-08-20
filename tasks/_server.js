import gulp from 'gulp'
import gulpConfig from './config'
import Browser from 'browser-sync'

const browser = Browser.create()
const config = {
  server: `${gulpConfig.dest}`,
  open: false
}

const server = () => {
  browser.init(config)
  gulp.watch(`${gulpConfig.dest}/**/*`).on('change', () => browser.reload())
}

export default server
