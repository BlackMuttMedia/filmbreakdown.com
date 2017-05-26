const config = {
  nodeEnv: process.env.NODE_ENV,
  webConcurrency: process.env.WEB_CONCURRENCY || 1,
  port: process.env.PORT || 3000,
  timeout: 29000,
  tmdb_key: '89a1a6500311a41b1a4c35541871e047',
}

module.exports = config
