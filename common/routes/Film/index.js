if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '../../store'

export default function createRoutes (store) {
  return {
    path: 'film/:slug',
    getComponents (location, cb) {
      require.ensure([
        './containers/Film',
        './reducer'
      ], (require) => {
        let FilmPage = require('./containers/Film').default
        let filmReducer = require('./reducer').default
        injectAsyncReducer(store, 'film', filmReducer)
        cb(null, FilmPage)
      })
    }
  }
}
