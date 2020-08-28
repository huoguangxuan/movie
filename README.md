# sdk-web

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Mock 数据

1,需要安装 nodemon node-babel
npm i -g nodemon node-babel

```
2,进到 mock文件夹
cd mock
```

3,执行下面的命令启动服务
nodemon babel-node server.js

```

4,在server.js 模拟自己需要的接口
5,在 src/api文件夹定义自己的api请求地址
```

6,在页面调用自己定义的 api 方法拿到返回数据
