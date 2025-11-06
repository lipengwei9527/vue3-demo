import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
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
import { createHtmlPlugin } from "vite-plugin-html";
// 自定义的vite配置项
import proxyConfig from "./config/proxy";
import { htmlPluginConfig } from "./config/viteAssist";
// 把后缀为以下后缀的文件放到css文件夹里
const exts = {
  css: ["ttf", "woff", "woff2", "css"],
  img: ["png", "jpg"],
};
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
      vueJsx(),
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

        resolvers: [ElementPlusResolver()],
      }),
      visualizer(),
      vueSetupExtend(),
      createHtmlPlugin(htmlPluginConfig),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/style/variables/index.scss";`,
        },
      },
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          // 入口chunk命名
          entryFileNames(chunkInfo) {
            const { name, facadeModuleId } = chunkInfo;
            let list = facadeModuleId?.split("/");
            const fmId = list && list[list.length - 1];
            if (fmId == "index.html" && name == "index") {
              return "js/entry.[hash].js";
            }
            return "js/[name].[hash].js";
          },
          // 代码分割产生的chunk命名
          chunkFileNames(chunkInfo) {
            let { facadeModuleId: fmId } = chunkInfo;
            //  如果文件名是index.vue就获取上层文件夹的名字
            if (fmId && fmId.includes("index.vue")) {
              let list = fmId.split("/");
              let name = list[list.length - 2];
              return `js/${name}.[hash].js`;
            }
            return "js/[name].[hash].js";
          },
          // 静态资源命名
          assetFileNames(assentInfo) {
            let { name, originalFileName } = assentInfo;
            let ext = "";
            let paths = name?.split(".");
            if (paths) ext = paths[paths.length - 1];
            name = name && name.split(".")[0];
            const orgFName = originalFileName;
            // 如果文件名是index就获取上层文件夹的名字
            if (name && name == "index" && orgFName) {
              const list = orgFName.split("/");
              name = list[list.length - 2] || name;
            }
            // name: 'index.css',
            // originalFileName: 'index.html',
            // 该css文件不符合上述处理,单独命名
            if (name == "index" && originalFileName == "index.html") {
              name = "rootCss";
            }
            if (exts.css.includes(ext)) return `css/${name}.[hash].[ext]`;
            if (exts.img.includes(ext)) return `img/${name}.[hash].[ext]`;
            return "js/[name].[hash].[ext]";
          },
          // 自定义分包
          manualChunks(id, { getModuleInfo, getModuleIds }) {
            if (id.includes("node_modules")) {
              let list = id.split("/node_modules/");
              // 包名
              list = list[1].replace(".pnpm/", "").split("@");
              const name = list[0] ? list[0] : list[1];
              if (!name) {
                console.log("list", id + "\n" + list);
              }
              return "vendor-" + name;
            }
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
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    server: {
      proxy: proxyConfig,
    },
  };
});
