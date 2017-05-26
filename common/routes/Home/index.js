/* eslint-disable */
/*if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '../../store'

export default function createRoutes (store) {
  return {
    path: '/',
    getComponents (location, cb) {
      require.ensure([
        './containers/Home',
        './reducer'
      ], (require) => {
        let HomePage = require('./containers/Home').default
        let homeReducer = require('./reducer').default
        injectAsyncReducer(store, 'nowPlaying', homeReducer)
        cb(null, HomePage)
      })
    }
  }
}*/

import Home from './containers/Home'

export default Home
