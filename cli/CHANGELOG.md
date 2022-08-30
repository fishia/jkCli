## 2.2.4

### `umi` 应用

#### ✨ Features

-   `permission2md.js` 内部解析字段由之前的 `functions` 变更为 `permissions`

## 2.2.3

### `umi` 应用

#### ✨ Features

-   新增 hooks 文件`src/hooks/usePermission.js`
-   新增按钮权限功能码自动生成脚本，通过指令`yarn p2md`生成`PERMISSION_CODE.md`文件，该`md`文件会帮你自动生成所有的按钮权限功能码，生成规则为 `CF_{ 工程包名 }_{ 页面路由名 }_{ 操作类型 }`
-   通过`yarn start:menu`指令打开菜单模式

## 2.2.2

### `umi` 应用

#### ✨ Features

-   新增[`@career/utils`](http://front-end.pages.cloudhw.cn:8000/utils/)包，内部 `Javascript` 工具库
-   开发环境下，可通过访问`/menu`打开菜单界面，可跳转所有路由页面，方便开发过程中快速切换页面，可选择使用。生产环境下(打包后)不会存在此路由
-   `request.js` 内部会对请求传参中的字符串前面和后面的空格进行 `trim`
-   `icon.js` 里添加一些图标的支持

## 2.2.1

### `umi` 应用

#### 🐛 fix:

-   解决 npm 发布如果没有`.npmignore`文件，会自动把 `.gitignore` 重命名为 `.npmignore` 的问题

### `uni-app`应用

#### ✨ Features

-   新增 `uni-app`应用结构
-   使用 `uview-ui` 插件做为 UI 库
-   集成了 `stylelint` 和 `prettier` 提升代码质量

## 2.1.4

### `umi` 应用

#### ✨ Features

-   应用框架变更为 `umijs@3.3.x`
-   `React` 版本升级，当前版本为 `v16.12`
-   `ant-design` 版本升级，当前版本为 `v3.26.19`
-   [`@career/components`](https://git.cloudhw.cn:3443/front-end/react-components)
-   时间库由之前的 `moment` 变更为 `dayjs`
-   `http` 请求库使用 `axios`
-   引入依赖包 [`ahooks`](https://github.com/alibaba/hooks)
-   引入依赖包 [`@career/hooks`](https://git.cloudhw.cn:3443/front-end/vhooks)
-   支持自动生成 `CHANGELOG.md` 文件
-   通过 UMI 插件([`@career/umi-plugin-generate`](https://git.cloudhw.cn:3443/front-end/umi-plugin-generate))重写 `umi g page` 指令，一行指令即可生成页面模板
-   目录结构调整，加强可阅读性和可移植性等
-   按需加载 `icon` 图标，打包后总包大小可减少 100k 以上
