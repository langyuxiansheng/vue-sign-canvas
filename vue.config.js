// vue.config.js
module.exports = {
    // 将 examples 目录添加为新的页面
    pages: {
        index: {
          // page 的入口
          entry: 'examples/main.js',
          // 模板来源
          template: 'public/index.html',
          // 输出文件名
          filename: 'index.html'
        }
	},
	publicPath: process.env.NODE_ENV === "production" ? "/vue-sign-canvas" : "/"
}
