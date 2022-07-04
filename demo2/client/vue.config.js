const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // port: 3030,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '/api': '/api'
        }
      }
    }
  }
})
