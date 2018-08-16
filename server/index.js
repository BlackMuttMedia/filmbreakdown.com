import path from 'path'
import http from 'http'
import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import compression from 'compression'
import hpp from 'hpp'
import throng from 'throng'

import React from 'react'
import ReactDOM from 'react-dom/server'
import { createMemoryHistory, RouterContext, match } from 'react-router'
import { Provider } from 'react-redux'
import { trigger } from 'redial'
import { StyleSheetServer } from 'aphrodite'
import Helm from 'react-helmet' // because we are already using helmet
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import DefaultServerConfig from './config'
import webpackConfig from '../tools/webpack.client.dev'
import { compileDev, startDev } from '../tools/dx'
import { configureStore } from '../common/store'
import reducer from '../common/createReducer'
import createRoutes from '../common/routes/root'
import mongoose from 'mongoose'

export const createServer = (config) => {
  const __PROD__ = config.nodeEnv === 'production'
  const __TEST__ = config.nodeEnv === 'test'

  var mongooseHost = 'mongodb://localhost/filmbreakdown';
  if(!__PROD__) {
    mongooseHost = mongooseHost + '-dev';
  }
  mongoose.connect(mongooseHost);

  const app = express()
  let assets = null
  app.disable('x-powered-by')
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  if (__PROD__ || __TEST__) {
    app.use(morgan('combined'))
    app.use(helmet())
    app.use(hpp())
    app.use(compression())
    if (__PROD__) {
      assets = require('../assets.json')
    }
  } else {
    app.use(morgan('dev'))
    const compiler = compileDev((webpack(webpackConfig)), config.port)
    app.use(webpackDevMiddleware(compiler, {
      quiet: true,
      watchOptions: {
        ignored: /node_modules/
      }
    }))
    app.use(webpackHotMiddleware(compiler, { log: console.log }))
  }

  app.use(express.static('public'))
  app.use('/api/v0/posts', require('./api/posts'))
  app.use('/api/v0/genres', require('./api/genres'))
  app.use('/api/v0/films', require('./api/films'))
  app.use('/api/v0/auth', require('./api/auth'))
  app.use('/api/v0/popular', require('./api/popular'))

  app.get('*', (req, res) => {
    const store = configureStore({
      sourceRequest: {
        protocol: req.headers['x-forwarded-proto'] || req.protocol,
        host: req.headers.host
      }
    })
    const routes = createRoutes(store)
    const history = createMemoryHistory(req.originalUrl)
    const { dispatch } = store

    match({ routes, history}, (err, redirectLocation, renderProps) => {
      if (err) {
        console.error(err)
        return res.status(500).send('Internal server error')
      }

      if (!renderProps) {
        return res.status(404).send('Not found')
      }

      const { components } = renderProps

      // Define locals to be provided to all lifecycle hooks:
      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,

        // Allow lifecycle hooks to dispatch Redux actions:
        dispatch
      }

      trigger('fetch', components, locals)
        .then(() => {
          const initialState = store.getState()
          const InitialView = (
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          )

          // just call html = ReactDOM.renderToString(InitialView)
          // if you don't want Aphrodite. Also change renderFullPage
          // accordingly
          const data = StyleSheetServer.renderStatic(
            () => ReactDOM.renderToString(InitialView)
          )
          const head = Helm.rewind()
          res.status(200).send(`
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charSet="utf-8">
                <meta httpEquiv="X-UA-Compatible" content="IE=edge">
                ${head.title.toString()}
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="shortcut icon" href="/favicon.ico">
                <!-- Latest compiled and minified CSS -->
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

                <!-- Optional theme -->
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
                ${head.meta.toString()}
                ${head.link.toString()}
                <!--<style data-aphrodite>${data.css.content}</style>-->
                <style>
                  html, body{
                    padding: 0px;
                    margin: 0px;
                  }
                  html{
                    height: 100%;
                  }
                  body{
                    min-height: 100%;
                    background-color: #444444;
                    color: #FAFAFA;
                  }
                </style>
              </head>
              <body>
                <div id="root">${data.html}</div>
                <script>window.renderedClassNames = ${JSON.stringify(data.css.renderedClassNames)};</script>
                <script>window.INITIAL_STATE = ${JSON.stringify(initialState)};</script>
                <script src="${ __PROD__ ? assets.vendor.js : '/vendor.js' }"></script>
                <script async src="${ __PROD__ ? assets.main.js : '/main.js' }" ></script>
              </body>
            </html>
          `)
        }).catch(e => console.log(e))
    })
  })


  const server = http.createServer(app)


  // Heroku dynos automatically timeout after 30s. Set our
  // own timeout here to force sockets to close before that.
  // https://devcenter.heroku.com/articles/request-timeout
  if (config.timeout) {
    server.setTimeout(config.timeout, (socket) => {
      const message = `Timeout of ${config.timeout}ms exceeded`

      socket.end([
        'HTTP/1.1 503 Service Unavailable',
        `Date: ${(new Date).toGMTString()}`,  // eslint-disable-line
        'Content-Type: text/plain',
        `Content-Length: ${message.length}`,
        'Connection: close',
        '',
        message
      ].join(`\r\n`))
    })
  }

  return server
}


export const startServer = (serverConfig) => {
  const config =  {...DefaultServerConfig, ...serverConfig}
  const server = createServer(config)
  server.listen(config.port, (err) => {
    if (config.nodeEnv === 'production' || config.nodeEnv === 'test') {
      if (err) console.log(err)
      console.log(`server ${config.id} listening on port ${config.port}`)
    } else {
      startDev(config.port, err)
    }
  })
}

if (require.main === module) {
  throng({
    start: (id) => startServer({ id }),
    workers: process.env.WEB_CONCURRENCY || 1,
    lifetime: Infinity
  })
}
