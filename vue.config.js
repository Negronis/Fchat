//修改webpack配置
const baseConfig = {
   chainWebpack: (config) => { 
      config.module
         .rule("js")
         .include.add("/packages")
         .end()
         .use("babel")
         .loader("babel-loader")
   },
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