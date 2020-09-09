const path = require("path");
module.exports = {
  lintOnSave: true,
  configureWebpack: {
    resolve: {
      modules: ["./components", "node_modules"],
      alias: {
        "@": path.join(__dirname, "src"),
        views: path.join(__dirname, "src/views"),
        components: path.join(__dirname, "src/components"),
        assets: path.join(__dirname, "src/assets"),
        api: path.join(__dirname, "src/api"),
        utils: path.join(__dirname, "src/utils")
      }
    }
  },
  devServer: {
    open: true,
    // proxy: "http://10.242.29.228:37080" //测试环境
    proxy: {
      "/mtc-front": {
        // 目标 API 地址
        // 开发环境
        target: "http://myts.utools.club/",
        // target: 'http://39.108.0.147:18100',
        // target: "http://172.27.68.215:12000",// 本地
        // 如果要代理 websockets
        ws: false,
        // 将主机标头的原点更改为目标URL(设置跨域)
        changeOrigin: true,
        pathRewrite: {
          "^/mtc-front": "/mtc-front"
        }
      }
      // proxy: "http://172.27.68.215:12000/sds-front/" //本地开发环境
      // proxy: "http://172.27.68.91:12000/sds-front/" //本地开发环境
      // proxy: "http://localhost:8090/sds-front/"
    }
  }
};
