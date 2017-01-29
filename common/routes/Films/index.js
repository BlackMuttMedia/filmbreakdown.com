if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '../../store'

export default function createRoutes (store) {
  return {
    path: 'films',
    getComponents (location, cb) {
      require.ensure([
        './containers/Films',
        './reducer'
      ], (require) => {
        let FilmsPage = require('./containers/Films').default
        let filmsReducer = require('./reducer').default
        injectAsyncReducer(store, 'films', filmsReducer)
        cb(null, FilmsPage)
      })
    }
  }
}
