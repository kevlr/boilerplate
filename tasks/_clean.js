import gulpConfig from '../config'
import del from 'del'

const path = process.env.DOCS ? {
  src: gulpConfig.path.src,
  dest: gulpConfig.path.docs,
} : gulpConfig.path

const clean = () => {
  return del(`${path.dest}/**`)
}

export default clean
