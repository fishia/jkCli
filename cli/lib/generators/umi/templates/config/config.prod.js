import { defineConfig } from 'umi';

/**
 * 此为生产环境的配置文件
 * 调整 splitChunks 策略，减少整体尺寸
 * 参考：https://umijs.org/guide/boost-compile-speed#%E8%B0%83%E6%95%B4-splitchunks-%E7%AD%96%E7%95%A5%EF%BC%8C%E5%87%8F%E5%B0%91%E6%95%B4%E4%BD%93%E5%B0%BA%E5%AF%B8
 */
export default defineConfig({
    // 默认是 ['umi']，可修改，比如做了 vendors 依赖提取之后，会需要在 umi.js 之前加载 vendors.js。
    // https://umijs.org/zh-CN/config#chunks
    // 结合splitChunks.cacheGroups 使用
    // 注意：cacheGroups拆分了几个包，chunks也得同步配置，且必须得存在拆分的文件，不然打包会报错
    chunks: ['vendors', 'antd', 'umi'],
    // 通过 webpack-chain 的 API 修改 webpack 配置。
    chainWebpack(config) {
        config.merge({
            optimization: {
                splitChunks: {
                    chunks: 'all',
                    // byte, == 30 kb，
                    // 越大那么单个文件越大，chunk 数就会变少（针对于提取公共 chunk 的时候，不管再大也不会把动态加载的模块合并到初始化模块中）
                    // 当这个值很大的时候就不会做公共部分的抽取了
                    minSize: 30000,
                    // 文件的最大尺寸，优先级：maxInitialRequest/maxAsyncRequests < maxSize < minSize，
                    // 需要注意的是这个如果配置了，umi.js 就可能被拆开，最后构建出来的 chunkMap 中可能就找不到 umi.js 了。
                    maxSize: 0,
                    // 被提取的一个模块至少需要在几个 chunk 中被引用，这个值越大，抽取出来的文件就越小
                    minChunks: 1,
                    // 在做一次按需加载的时候最多有多少个异步请求，为 1 的时候就不会抽取公共 chunk 了
                    maxAsyncRequests: 10,
                    // 针对一个 entry 做初始化模块分隔的时候的最大文件数，优先级高于 cacheGroup，所以为 1 的时候就不会抽取 initial common 了。
                    maxInitialRequests: 3,
                    // 缓存组
                    // 注意：工程内至少在一个chunk中被引用才会拆出配置的文件
                    cacheGroups: {
                        vendors: {
                            name: 'vendors',
                            chunks: 'all',
                            // 表示要过滤 modules，默认为所有的 modules，可匹配模块路径或 chunk 名字，
                            // 当匹配到某个 chunk 的名字时，这个 chunk 里面引入的所有 module 都会选中；
                            test: /[\\/]node_modules[\\/](react|react-dom|react-router|lodash|dayjs|dva|rc-select|rc-pagination)[\\/]/,
                            // 权重，数字越大表示优先级越高
                            priority: -10,
                        },
                        // 提取出antd文件
                        antd: {
                            name: 'antd',
                            chunks: 'all',
                            test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
                            priority: -11,
                        },
                    },
                },
            },
        });
        // antd moment -> dayjs
        config.plugin('moment2dayjs').use('antd-dayjs-webpack-plugin', [
            {
                preset: 'antdv3',
            },
        ]);
    },
});
