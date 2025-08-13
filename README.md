<!-- vue+vite+ts项目 -->



#### 常见问题

**1、vite.config.js 引入 path 报错？**

下载@types/node 依赖

**2、使用@相对路径爆红？**

在 tsconfig.json 中的 compilerOptions 配置项中加入
"baseUrl": "./",
"paths": {
   "@/*": ["src/*"]
},

或者在 env.d.ts 中加入
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

**3、打包文件大小检查？**

运行pnpm run build之后自动生成stats.html文件



