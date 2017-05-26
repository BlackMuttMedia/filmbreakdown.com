/* eslint-disable */
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '../../store'

export default function createRoutes (store) {
  return {
    path: 'genre/:slug',
    getComponents (location, cb) {
      require.ensure([
        './containers/Genre',
        './reducer'
      ], (require) => {
        let GenrePage = require('./containers/Genre').default
        let genreReducer = require('./reducer').default
        injectAsyncReducer(store, 'genre', genreReducer)
        cb(null, GenrePage)
      })
    }
  }
}

/*import Genre from './containers/Genre'

export default Genre*/
