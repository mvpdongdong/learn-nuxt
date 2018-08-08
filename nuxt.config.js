module.exports = {
  head: {
    title: 'N2EX',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1' },
      { hid: 'description', name: 'description', content: 'N2ex' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' },
      { rel: 'stylesheet', href: 'https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css' }
    ]
  },
  cache: {
    max: 100,
    maxAge: 1000 * 60 * 15
  },
  css: [
    '~assets/css/main.css'
  ],
  loading: {
    color: '#409EFF'
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/component-cache'
  ],
  router: {
    middleware: 'redirect'
  },
  axios: {
    baseURL: 'https://proxy-oagpwnbkpe.now.sh',
    credentials: false,
    proxyHeaders: false
  },
  plugins: [
    '~plugins/element-ui.js',
    '~plugins/muse-ui.js',
    '~plugins/filters.js',
    '~plugins/component.js'
  ],
  build: {
    babel: {
      plugins: [
        ['component', {
          libraryName: 'element-ui',
          styleLibraryName: 'theme-chalk'
        }]
      ]
    },
    extractCSS: true,
    optimization: {
      splitChunks: {
        name: true
      }
    }
  }
};
