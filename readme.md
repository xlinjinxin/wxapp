# shuma-wxapp1

## 拓展

- 添加全局组件功能，在 app.json 中配置全局组件的路径即可
- 添加 onAppInit 生命周期，获取小程序启动参数，该生命周期没有先后顺序之分。
- 添加 onSocket 生命周期，当 socket 连接时启动，该生命周期没有先后顺序之分。
- 优化封装微信原生的 request，当使用封装后的 ajax 时，可以保持同时发起的请求最多只有 5 个，优化未登录请求时的请求流程，添加防止连续请求的功能。
- 添加全局的 store：cart 及 appConfig

## 功能

- 支持引用 `node_modules` 模块
- 支持通过配置 `alias` 来避免 `../../../` 之类的模块引用
- 通过 `babel` 支持更丰富的 `ES6` 兼容，包括 `async/await`
- 内置 `promise` 和 `lodash`（`lodash` 按需引入相应模块，不会全部引入）
- 使用 `less` 编写 `.wxss` 文件，内置了一些有用的 `mixins` 和 `extends`
