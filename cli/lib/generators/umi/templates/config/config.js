import { defineConfig } from 'umi';
import path from 'path';
import routes from './routes';
import proxy from './proxy';

export default defineConfig({
    // 配置路由
    routes,
    // 配置代理能力。
    proxy,
    // 配置 favicon 地址（href 属性）
    favicon: '/favicon.ico',
    // 使用内置dva
    // https://umijs.org/zh-CN/plugins/plugin-dva
    dva: {
        hmr: true, // 启动热更新
    },
    // 开发环境下，可以保持组件状态
    fastRefresh: {},
    // 配置是否让生成的文件包含 hash 后缀，通常用于增量发布和避免浏览器加载缓存。
    hash: true,
    // https://umijs.org/zh-CN/config#history
    history: { type: 'hash' },
    manifest: {
        basePath: './',
    },
    publicPath: './',
    // 国际化插件
    // https://umijs.org/zh-CN/plugins/plugin-locale
    // 若开启，需创建src/locales/zh-CN.js文件来消除控制台的报警信息
    // locale: {
    //     default: 'zh-CN',
    //     antd: true,
    //     baseNavigator: false,
    // },
    // 配置需要兼容的浏览器最低版本，会自动引入 polyfill 和做语法转换。
    // https://umijs.org/zh-CN/config#targets
    targets: {
        ie: 9,
    },
    // 是否启用按需加载，即是否把构建产物进行拆分
    dynamicImport: {
        // 禁用掉每次刷新路由时出现的 loading... 状态
        // 官方文档提供的方案目前有误
        // https://github.com/umijs/umi/issues/5688
        loading: '@/components/PageLoading.js',
    },
    // https://umijs.org/zh-CN/config#cssloader
    cssLoader: {
        localsConvention: 'camelCase',
    },
    // https://umijs.org/zh-CN/config#terseroptions
    // 生产环境移除console和debugger
    terserOptions: {
        compress: {
            drop_console: true,
            drop_debugger: true,
        },
    },
    // 设置 node_modules 目录下依赖文件的编译方式。
    // https://umijs.org/zh-CN/config#nodemodulestransform-31
    nodeModulesTransform: {
        type: 'none',
    },
    // https://github.com/ant-design/ant-design/issues/12011#issuecomment-420038579
    // icon按需加载，可以减少antd包100kb左右的的大小
    alias: {
        '@ant-design/icons/lib/dist$': path.resolve(__dirname, '../src/icons.js'),
    },
    // 配置额外的 babel 插件。
    // https://umijs.org/zh-CN/config#extrababelplugins
    // 按需加载antd和lodash
    extraBabelPlugins: [
        ['import', { libraryName: 'antd', style: 'css' }, 'antd'],
        ['import', { libraryName: 'vtx-ui', camel2DashComponentName: false }, 'vtx-ui'],
        // https://git.cloudhw.cn:3443/front-end/react-components
        ['import', { libraryName: '@vtx/components', style: 'css' }, 'vtx-components'],
        [
            'import',
            { libraryName: 'lodash', libraryDirectory: '', camel2DashComponentName: false },
            'lodash',
        ],
        // https://ahooks.js.org/zh-CN
        ['import', { libraryName: 'ahooks', camel2DashComponentName: false }, 'ahooks'],
    ],
    chainWebpack(config) {
        // antd moment -> dayjs
        config.plugin('moment2dayjs').use('antd-dayjs-webpack-plugin', [
            {
                preset: 'antdv3',
            },
        ]);
    },
});
