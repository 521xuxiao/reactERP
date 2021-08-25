// // const proxy = require('http-proxy-middleware')  // 0.x.x版本的引用是这样的
const { createProxyMiddleware } = require('http-proxy-middleware');  // 1.x.x的版本这样引用

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/self', {
            target: 'http://localhost:8083/',
            // target: 'https://www.danjylong.top:8083/',
            changeOrigin: true,
            pathRewrite: {
                '^/self': '' // 重写请求路径
            }
        }),
        createProxyMiddleware('/self2', {
//             target: 'http://localhost:8083/',
            target: 'https://www.danjylong.top:8083/',
            changeOrigin: true,
            pathRewrite: {
                '^/self2': '' // 重写请求路径
            }
        })
    )
};
