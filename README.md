# 电商后台管理系统

## 项目简介

电商后台管理系统是用于管理电商后台的一款单页面应用程序（SPA），包括登录登出、用户管理、权限管理、商品管理、订单管理、数据统计六个主要模块，旨在帮助电商平台管理员对平台进行全面的监管、管理和维护，保证平台的正常运营和发展。

## 代码仓库

- GitHub: github.com/Nalamal/vue_shop

## 技术栈

vue3、vite、typescript、element-plus、vue-router、pinia、axios 和 echarts

## 项目功能

- 登录退出模块:实现登录退出功能、全局采用 JWT 实现身份验证。
- 用户管理模块:实现查询用户基本信息、修改用户基本信息、删除用户等功能。
- 权限管理模块:实现增加删除角色权限、给用户分配角色。
- 商品管理模块:主要分成商品列表、分类参数、商品分类三个模块，实现对商品的增删改查操作的功能、对商品动态参数和静态属性管理功能、以及商品分类的功能。
- 订单管理模块:实现查询订单信息和修改订单状态的功能。
- 数据统计模块:利用 echarts 画出折线图，实现数据报表的功能。

## 文件资源结构

```text
vue_shop
├─ .vscode                # VSCode 推荐配置
├─ public                 # 静态资源文件
├─ src
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ router              # 路由配置文件
│  ├─ stores              # pinia 状态管理仓库
│  ├─ utils               # 封装工具库
│  ├─ views               # 项目页面文件
│  ├─ App.vue             # 项目主组件
│  ├─ main.ts             # 项目入口文件
├─ .editorconfig          # 统一不同编辑器的编码风格
├─ .eslintignore          # 忽略 Eslint 校验文件
├─ .eslintrc.cjs          # Eslint 校验配置文件
├─ .prettierrc.json       # Prettier 格式化配置文件
├─ .gitignore             # 忽略 git 提交
├─ auto-imports.d.ts      # 自动导入声明文件
├─ components.d.ts        # 导入组件声明文件
├─ env.d.ts               # 声明文件
├─ index.html             # 入口 html
├─ package-lock.json      # 依赖包版本锁
├─ package.json           # 依赖包管理
├─ README.md              # README 介绍
├─ tsconfig.json          # typescript 全局配置
├─ tsconfig.node.json     # typescript 全局配置
└─ vite.config.ts         # vite 全局配置文件
```

## 常用命令

- clone

```sh
# github
https://github.com/Nalamal/vue_shop.git
```

- install

```sh
npm install
```

- run

```sh
npm run dev
```

- build

```sh
npm run build
```

- lint

```sh
npm run lint
```

- format

```sh
npm run format
```

## 项目截图

- 登录页
  ![登录页](https://img1.imgtp.com/2023/07/11/J74C9rJt.jpg)
- 首页
- ![welcome](https://img1.imgtp.com/2023/07/11/kumirYNm.jpg)
- 表格页
  ![table](https://img1.imgtp.com/2023/07/11/OuklY27M.jpg)
- Echart 图表页
  ![echarts](https://img1.imgtp.com/2023/07/11/UGvSKGDF.jpg)
- 404
  ![404](https://img1.imgtp.com/2023/07/11/TswzANaC.jpg)
