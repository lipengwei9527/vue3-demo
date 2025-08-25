# vue+vite+ts项目

### 注意事项

**1、打包文件大小检查？**

运行pnpm run build之后打开自动生成的stats.html文件



### 依赖库

**vue-draggable-plus**

官方文档：https://vue-draggable-plus.pages.dev/guide/



### 默认事项

##### 全局索引注册组件

1. 默认src/components下的所有组件(src/components/xx/x.vue，除了components目录下的组件)都注册为索引组件

2. 相关配置项在vite.config.ts中的Components({...,globs:{}})中

   

