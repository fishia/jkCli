# 医脉同道 · Taro (M 站和小程序)

## 说明

本项目使用 Taro 框架（它是一个移动开发框架，支持 H5 与多平台的小程序，使用 React、Vue 等语法），配合 React-redux、Typescript、Sass 等，为医脉同道项目提供移动端的跨平台实现。  

小程序开发时，需要配置 AppID：  

- 测试 AppID： `wx69366cf26256bb87`
- 线上 AppID： `wx9f45761e6079fb3f`
- 【已停用】原即派测试 AppID： `wxea38a8c581bf8bb7`
- 在 `project.config.json` 中的 `appid` 字段中配置，小程序如果登录失败，可能是 AppID 没有配正确

## 起步

```bash
# 安装 Taro 的 cli 工具
# 如果在安装 SASS 时失败报错，可以删除 node_modules 文件夹后用 cnpm 重试安装
yarn global add @tarojs/cli@3.2.1

# 安装依赖
yarn

# 调试运行项目
# 运行 H5 端
yarn dev:h5
# 运行微信小程序
yarn dev:weapp

# 打包编译【测试】环境的项目，打包后的产物位于 dist/ 目录下
# 打包 H5 端
yarn test:h5
# 打包微信小程序端
yarn test:weapp

# 打包编译【生产】环境的项目，打包后的产物位于 dist/ 目录下
# 打包 H5 端
yarn dev:h5
# 打包微信小程序端
yarn build:weapp
```

## 开发需知

- 项目使用了 [Taro 3](https://taro-docs.jd.com/taro/docs/README) 作为开发框架，引入 [TaroUI 3.0.0-alpha](https://taro-ui.jd.com/#/docs/introduction) 作为 UI 库；开发前请阅读相关文档以获得帮助
- 开发中，可以使用 `process.env.TARO_ENV` 来做平台判断，可取值 `'weapp '`、`'h5'`，可以使用 `process.env.ENV` 来做开发与测试环境判断，可取值 `'production'`、`'development'`
- 因为涉及到跨平台，在使用 API 时需多加注意，例如小程序上没有 `document` 对象，H5 上没有 `wx.` 开头的 API，相关需求可以统一使用 [Taro 提供的 API](https://taro-docs.jd.com/taro/docs/apis/about/desc/)
- 同一份文件，可以按照 `xxx.weapp.ts`/`xxx.h5.ts` 的方式命名以区分不同平台，引入的时候使用不需要加后缀，打包或运行时框架会自动根据当前平台处理引入
- 页面相关配置文件 `.config.ts` 里的代码不会经过 babel 转码，也不会被 webpack 预处理，这类文件不支持 `import/export` 等 ES6 的语法，也不支持 `xxx.weapp.ts`/`xxx.h5.ts` 的自动区分平台的引入方式
- 增删 `.weapp.ts`/`.h5.ts` 等平台文件名的文件，以及增添路由，都需要重新编译运行项目，否则可能不生效或直接报错
- 样式中的 `px` 会被 Taro 转换为 `rpx` （小程序） 或 `rem` （H5），设计稿默认为 750px，如果需要使用 JS 动态设置尺寸，可以调用 `Taro.pxTransform(尺寸值)`，如果不希望 Taro 转换尺寸，可以令单位包含大写字母，Taro 便会忽略转换，例如写成 `PX`
- 在样式中涉及到 `calc( )` 运算的，如果变量为 0，必须加上单位，否则运算结果无效；如果使用 `$` 开头的变量，推荐使用 `calc(10px + #{$pageBottom})` 这种形式，否则有可能和 Taro 的自动单位转换产生冲突

## IDE 配置

因为部分尺寸需要写成大写的 `PX` 形式，而 Prettier 会在格式化时将这些大写转为小写，为了避免此转换发生，项目中配置了令 Prettier 忽略样式文件  
如果想要格式化样式文件，可以使用 [Beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify)，在 VSCode 等编辑器中它已被预装  
VSCode 中按下 `Ctrl + Shift + P` 组合键，选择 `首选项:打开工作区配置(JSON)`，之后在打开的 JSON 文件中填入以下内容并保存：  
```json
{
  "[scss]": {
    "editor.defaultFormatter": "HookyQR.beautify"
  },
  "[css]": {
    "editor.defaultFormatter": "HookyQR.beautify"
  }
}
```
即可令样式文件使用 Beautify 来进行格式化  

## 目录结构

    ├── dist                   // 输出目录  
    │   ├── h5  
    │   └── weapp  
    │  
    ├── config                 // Taro Webpack 配置目录  
    │   ├── index.js
    │   ├── dev.js             //  本地开发环境
    │   ├── test.js            //  测试打包
    │   └── prod.js            //  生产打包
    │  
    ├── src                    // 项目源码目录，可以使用别名 `@` 来引用
    │   ├── assets             // 资源文件
    │   │   ├── imgs  
    │   │   └── styles  
    │   │  
    │   ├── store              // redux 配置
    │   │   ├── actions
    │   │   └── reducers
    │   │
    │   ├── apis               // 接口请求
    │   ├── services           // 封装的服务
    │   ├── hooks              // 自定义 hooks
    │   ├── config             // 项目开发配置（路由，app.json 配置等）
    │   ├── def                // 数据类型定义
    │   ├── components         // 组件
    │   ├── layout             // 布局
    │   ├── h5                 // H5 端页面
    │   ├── weapp              // weapp 端页面
    │   ├── utils              // 常用工具类
    │   ├── app.config.ts      // 项目配置文件，相当于 weapp 的 app.json
    │   ├── app.scss           // 全局样式
    │   ├── app.tsx            // 入口文件
    │   └── index.html         // H5 页面的 HTML 模板
    │
    ├── babel.config.js
    ├── global.d.ts
    ├── project.config.json
    ...

## 开发命名规约
- 类型定义      XxxType             type CompanyType           
- 接口定义      IXxxx               interface ILayout
- 组件属性定义  IXxxxProps           interface ILayoutProps 推荐接口定义
- 组件文件大驼峰命名法(帕斯卡命名法)，导出组件同文件名    NavBar---export default NavBar
- 页面文件短横线命名法(kebab-case命名法),导出组件大驼峰命名法 company-index---export default CompanyIndex
- CSS命名采用BEM规范，Block Element Modifier
