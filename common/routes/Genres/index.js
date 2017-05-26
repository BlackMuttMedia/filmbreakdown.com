if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '../../store'

export default function createRoutes (store) {
  return {
    path: 'genres',
    getComponents (location, cb) {
      require.ensure([
        './containers/Genres',
        './reducer'
      ], (require) => {
        let GenresPage = require('./containers/Genres').default
        let genresReducer = require('./reducer').default
        injectAsyncReducer(store, 'genres_page', genresReducer)
        cb(null, GenresPage)
      })
    }
  }
}
