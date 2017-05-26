// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import App from '../components/App'
import Home from './Home'

export default function createRoutes (store) {
  const root = {
    path: '/',
    component: App,
    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          require('./PostList').default(store), // add async reducer
          require('./Post').default(store), // add async reducer
          require('./Genres').default(store), // add async reducer
          require('./Genre').default(store), // add async reducer
          require('./Films').default(store), // add async reducer
          require('./Film').default(store), // add async reducer
          require('./NotFound').default
        ])
      })
    },

    indexRoute: {
      component: Home
    }
  }

  return root
}
