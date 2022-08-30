/**
 * 路由
 * https://umijs.org/zh-CN/config#routes
 * https://umijs.org/zh-CN/docs/routing
 */
const routes = [
    { path: '/example', component: '@/pages/Example', title: '示例' },
    // 在这里添加路由

    // 不可删除
    { component: '@/pages/404' },
];

export default [
    {
        path: '/',
        component: process.env.MENU ? '@/layouts/menu' : '@/layouts/index',
        routes: routes,
    },
].filter(item => item);