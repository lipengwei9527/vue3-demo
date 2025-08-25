import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { createNameThroughPath } from "./src/utils/path";
// ts类型
import type { UserConfig, ConfigEnv } from "vite";
// 按需引入element-plus
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// 检查打包文件大小
import { visualizer } from "rollup-plugin-visualizer";
//setup语法糖写name命名组件名称
import vueSetupExtend from "vite-plugin-vue-setup-extend";
// const proxyConfig = require("./config/proxy").default;
import proxyConfig from "./config/proxy";
// 相对路径配置
const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};
const alias: Record<string, string> = {
  "@": pathResolve("src"),
};
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  // 加载的.env文件中的变量
  const env = loadEnv(mode, process.cwd());
  console.log(`
  ------------------------------------------------
  vite.config.ts
    环境：${process.env.NODE_ENV}
    base: ${env.VITE_BASE_PATH}
    路由模式:${env.VITE_ROUTER_MODEL}
  ------------------------------------------------`);
  return {
    base: env.VITE_BASE_PATH,
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        // exclude不生效，include会忽略resolvers配置
        // 使用globs配置来确定注册哪些自定义组件
        // globs: [
        //   // "!src/components/*/components/*.vue", //排除src/components目录下所有深层components目录下的组件
        //   // "src/components/**/*.vue", //注册排除src/components目录下第二子级下的所有组件
        // ],

        resolvers: [
          ElementPlusResolver(),
          // (compName) => {
          //   console.log("compName", compName);
          // },
        ],
      }),
      visualizer(),
      vueSetupExtend(),
    ],
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          // 动态导入的文件名
          entryFileNames(chunkInfo) {
            return "js/[name].[hash].js";
          },
          // 动态导入的文件名
          chunkFileNames(chunkInfo) {
            return "js/[name].[hash].js";
          },
          // 静态资源文件名
          assetFileNames(assentInfo) {
            return "[ext]/[name].[hash].[ext]";
          },
          // 自定义分包
          manualChunks(id, { getModuleInfo, getModuleIds }) {
            return createNameThroughPath(id);
          },
        },
      },
      // terserOptions: {
      //   // compress: {
      //   //   drop_debugger: env.VITE_DROP_DEBUGGER === "true",
      //   //   drop_console: env.VITE_DROP_CONSOLE === "true",
      //   // },
      // },
    },
    resolve: {
      alias,
    },
    server: {
      proxy: proxyConfig,
    },
  };
});
