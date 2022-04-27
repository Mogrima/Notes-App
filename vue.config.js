// vue.config.js
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/modals/'
    : '/',
    assetsDir: 'assets',
    productionSourceMap: false,
    // filenameHashing: false,

  }