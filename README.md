# vue+vite+ts项目

### 注意事项

**1、打包文件大小检查？**

运行pnpm run build之后打开自动生成的stats.html文件

### 发布到github的pages

1. 先运行 pnpm build打包
2. 在运行pnpm dep发布

或者运行pnpm deploy命令同时打包在发布

### 依赖库

**vue-draggable-plus**

官方文档：https://vue-draggable-plus.pages.dev/guide/

**madge**

检查项目是否存在循环依赖

```
madge --circular src/
```



### 默认事项

##### 全局索引注册组件

1. 默认src/components下的所有组件(src/components/xx/x.vue，除了components目录下的组件)都注册为索引组件

2. 相关配置项在vite.config.ts中的Components({...,globs:{}})中

   

