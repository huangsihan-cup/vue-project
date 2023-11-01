const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer:{
     proxy:{
         '/api':{
             target:'http://159.75.169.224:6300',
             changeOrigin:true,
             //后端请求并没有api所以要去掉
             pathRewrite:{'^/api':''}
         }
     }
    }
 }
})
