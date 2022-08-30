/**
 * 代理配置
 * https://umijs.org/zh-CN/config#proxy
 */
export default {
    '/api': {
        target: 'http://jsonplaceholder.typicode.com/',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
    }
};
