/*
 * @Author: yemu
 * @Date: 2021-04-02 15:43:14
 * @LastEditTime: 2021-04-06 13:24:35
 * @LastEditors: yemu
 * @Description: 生成按钮权限码
 */
import fs from 'fs';
import yaml from 'js-yaml';
import routes from './config/routes';
import { name } from './package';

(function permission2md() {
    // 基本路径
    const BASE = 'CF';
    // 包名大写
    const packageName = name.toUpperCase();
    // 内容
    const text = [
        '# 按钮权限功能码',
        '\r',
        '此文件是由脚本 permission2md.js 自动生成，权限码生成规则：CF\\_{ 工程包名 }\\_{ 页面路由 }\\_{ 操作类型 }',
        '\r',
    ];

    try {
        // 遍历路由路径从头部注释中获取权限信息
        routes[0]?.routes.map(item => {
            if (!item.title) {
                return;
            }
            let filePath = item.component.replace('@', './src');
            if (fs.statSync(filePath).isDirectory()) {
                filePath = `${filePath}/index.js`;
            }
            const content = fs.readFileSync(filePath, 'utf8').toString();
            const { permissions } = transformer(content) || {};

            if (Object.prototype.toString.call(permissions) === '[object Object]') {
                text.push(`## ${item.title}(${item.path})`);
                // 页面路由
                const page = item.path.replace('/', '').toUpperCase();
                text.push('\r');
                Object.keys(permissions).map(f => {
                    text.push(
                        `-    ${[BASE, packageName, page, f.toUpperCase()].join('_')}  ${
                            item.title
                        }-${permissions[f]}`,
                    );
                });
                text.push('\r');
            }
        });

        // 写入文件
        fs.writeFileSync('PERMISSION_CODE.md', text.join('\n'));
        console.log('✨  按钮权限码生成成功');
    } catch (error) {
        console.log(
            [
                '❌  按钮功能码生成出错，出错的原因可能是注释格式不正确，请仔细检查注释格式，确保其遵循yaml规范',
                '若您对yaml规范不太了解，您可以通过[YAML 1.2 规范](https://yaml.org/spec/1.2/spec.html)来学习',
                '当然您也可以通过阅读阮一峰老师的[YAML 语言教程](http://www.ruanyifeng.com/blog/2016/07/yaml.html)来学习',
            ].join('\n'),
        );
    }
})();

// 解析文件注释信息
function transformer(raw) {
    const [, comments = ''] = raw
        // clear head break lines
        .replace(/^\n\s*/, '')
        // split head comments & remaining code
        .match(/^(\/\*\*[^]*?\n\s*\*\/)?(?:\s|\n)*([^]+)?$/);

    const frontmatter = comments
        // clear / from head & foot for comment
        .replace(/^\/|\/$/g, '')
        // remove * from comments
        .replace(/(^|\n)\s*\*+/g, '$1');
    const parsed = frontmatter ? yaml.load(frontmatter) : {};
    const data = typeof parsed === 'object' ? parsed : {};
    return data;
}
