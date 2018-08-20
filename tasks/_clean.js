import gulpConfig from './config'
import del from 'del'

const clean = () => {
  return del(`${gulpConfig.dest}/**`)
}

export default clean
