
const path = require('path'); 
function resolve(dir) {
	return path.join(__dirname, dir)
}
//修改webpack配置
const baseConfig = {
   chainWebpack: (config) => { 
      config.module
         .rule("js")
         .include.add("/packages")
         .end()
         .use("babel")
         .loader("babel-loader")
      config.resolve.alias
      .set('@',resolve('examples')) 
      config.entry('main').add('babel-polyfill');
   }
}
// 修改出/入口
const devConfig = {
   pages: {
      index: {
         entry: "examples/main.js",
         template: "public/index.html",
         filename: "index.html",
      },
   },
   ...baseConfig
}

module.exports =  devConfig;