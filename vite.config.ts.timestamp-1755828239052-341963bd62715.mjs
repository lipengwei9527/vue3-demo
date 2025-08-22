// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/gitSpace/vue3-demo/node_modules/.pnpm/vite@5.4.3_@types+node@20.16.5_sass@1.78.0/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/gitSpace/vue3-demo/node_modules/.pnpm/@vitejs+plugin-vue@5.1.3_vite@5.4.3_@types+node@20.16.5_sass@1.78.0__vue@3.5.4_typescript@5.6.2_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";

// src/utils/validate.ts
function getBetween(str, start, end) {
  const reg = new RegExp(`${start}(.*?)${end}`);
  const match = str.match(reg);
  return match ? match[1] : "";
}

// src/utils/path.ts
function createNameThroughPath(path) {
  let chunkName = "";
  if (path.includes("node_modules")) {
    chunkName = path.toString().split("node_modules/")[2].split("/")[0].toString() + `${chunkName}`;
    return `vendor-${chunkName}`;
  }
  if (path.includes("src/views/")) {
    chunkName = path.split("/")[6];
    if (chunkName.includes("index")) {
      chunkName = path.split("/")[5];
    }
    return `views-${chunkName}`;
  }
  if (path.includes("src/")) {
    return getBetween(path, "src/", "/");
  }
  return chunkName;
}

// vite.config.ts
import AutoImport from "file:///D:/gitSpace/vue3-demo/node_modules/.pnpm/unplugin-auto-import@0.17.8_@vueuse+core@11.1.0_vue@3.5.4_typescript@5.6.2___rollup@4.21.2/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/gitSpace/vue3-demo/node_modules/.pnpm/unplugin-vue-components@0.26.0_@babel+parser@7.25.6_rollup@4.21.2_vue@3.5.4_typescript@5.6.2_/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///D:/gitSpace/vue3-demo/node_modules/.pnpm/unplugin-vue-components@0.26.0_@babel+parser@7.25.6_rollup@4.21.2_vue@3.5.4_typescript@5.6.2_/node_modules/unplugin-vue-components/dist/resolvers.js";
import { visualizer } from "file:///D:/gitSpace/vue3-demo/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0_rollup@4.21.2/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import vueSetupExtend from "file:///D:/gitSpace/vue3-demo/node_modules/.pnpm/vite-plugin-vue-setup-extend@0.4.0_vite@5.4.3_@types+node@20.16.5_sass@1.78.0_/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";

// config/proxy/index.ts
var env = process.env.NODE_ENV;
var config = {
  development: {
    "/egg": {
      target: "http://127.0.0.1:7001",
      rewrite: (path) => path.replace("/egg", ""),
      //请求头中的Host将被设置为目标URL的主机名，而不是代理服务器的主机名
      // 如果接口跨域，需要进行这个参数配置
      // changeOrigin: true,
      bypass(req, res, options) {
        const proxyURL = options.target + options.rewrite(req.url);
        if (env == "development") {
          res.setHeader("x-real-url", proxyURL);
        }
      }
    },
    "/express": {
      target: "http://localhost:3000",
      rewrite: (path) => path.replace("/express", ""),
      //请求头中的Host将被设置为目标URL的主机名，而不是代理服务器的主机名
      // 如果接口跨域，需要进行这个参数配置
      // changeOrigin: true,
      bypass(req, res, options) {
        const proxyURL = options.target + options.rewrite(req.url);
        if (env == "development") {
          res.setHeader("x-real-url", proxyURL);
        }
      }
    }
  },
  production: {
    proxy: {}
  }
};
console.log(`
  ------------------------------------------------
  config/proxy/index.ts 
    env:${env}
  ------------------------------------------------`);
var proxy_default = config[env];

// vite.config.ts
var __vite_injected_original_dirname = "D:\\gitSpace\\vue3-demo";
var pathResolve = (dir) => {
  return resolve(__vite_injected_original_dirname, ".", dir);
};
var alias = {
  "@": pathResolve("src")
};
var vite_config_default = defineConfig(({ command, mode }) => {
  const env2 = loadEnv(mode, process.cwd());
  console.log(`
  ------------------------------------------------
  vite.config.ts
    \u73AF\u5883\uFF1A${process.env.NODE_ENV}
    base: ${env2.VITE_BASE_PATH}
    \u8DEF\u7531\u6A21\u5F0F:${env2.VITE_ROUTER_MODEL}
  ------------------------------------------------`);
  return {
    base: env2.VITE_BASE_PATH,
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        // include: [/src\/components\/*.vue/],
        globs: ["!src/components/ExCreateForm/components/", "src/components/"],
        // exclude: [
        //   "src/components/ExMenu/index.vue",
        //   "src/components/ExCreateForm/components/ExSideBar.vue",
        //   //
        //   // /src\/components/,
        //   // /[\\/]src[\\/]components[\\/]ExCreateForm[\\/]components[\\/]ExSideBar\.vue$/,
        //   // /src[\\/]components[\\/]ExCreateForm[\\/]/,
        //   // /src\/components\/ExCreateForm\/components\/.*\.vue$/,
        //   // /src\/components\/ExCreateForm\/components\/ExSideBar.vue/g,
        //   // /src\/components\/.*\/components\/.*\.vue$/, //排除src/components目录下任意深度以components命名的文件夹下的vue文件
        //   // /[\\/]src[\\/]components[\\/].+[\\/]components[\\/][^\\/]+\.vue$/, //排除src/components目录下任意深度以components命名的文件夹下的vue文件
        // ],
        resolvers: [ElementPlusResolver()]
        // debug: true,
      }),
      visualizer(),
      vueSetupExtend()
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
          }
        }
      }
      // terserOptions: {
      //   // compress: {
      //   //   drop_debugger: env.VITE_DROP_DEBUGGER === "true",
      //   //   drop_console: env.VITE_DROP_CONSOLE === "true",
      //   // },
      // },
    },
    resolve: {
      alias
    },
    server: {
      proxy: proxy_default
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL3V0aWxzL3ZhbGlkYXRlLnRzIiwgInNyYy91dGlscy9wYXRoLnRzIiwgImNvbmZpZy9wcm94eS9pbmRleC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGdpdFNwYWNlXFxcXHZ1ZTMtZGVtb1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcZ2l0U3BhY2VcXFxcdnVlMy1kZW1vXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9naXRTcGFjZS92dWUzLWRlbW8vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IGNyZWF0ZU5hbWVUaHJvdWdoUGF0aCB9IGZyb20gXCIuL3NyYy91dGlscy9wYXRoXCI7XHJcbi8vIHRzXHU3QzdCXHU1NzhCXHJcbmltcG9ydCB0eXBlIHsgVXNlckNvbmZpZywgQ29uZmlnRW52IH0gZnJvbSBcInZpdGVcIjtcclxuLy8gXHU2MzA5XHU5NzAwXHU1RjE1XHU1MTY1ZWxlbWVudC1wbHVzXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gXCJ1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlXCI7XHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlXCI7XHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzXCI7XHJcblxyXG4vLyBcdTY4QzBcdTY3RTVcdTYyNTNcdTUzMDVcdTY1ODdcdTRFRjZcdTU5MjdcdTVDMEZcclxuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjtcclxuLy9zZXR1cFx1OEJFRFx1NkNENVx1N0NENlx1NTE5OW5hbWVcdTU0N0RcdTU0MERcdTdFQzRcdTRFRjZcdTU0MERcdTc5RjBcclxuaW1wb3J0IHZ1ZVNldHVwRXh0ZW5kIGZyb20gXCJ2aXRlLXBsdWdpbi12dWUtc2V0dXAtZXh0ZW5kXCI7XHJcbi8vIGNvbnN0IHByb3h5Q29uZmlnID0gcmVxdWlyZShcIi4vY29uZmlnL3Byb3h5XCIpLmRlZmF1bHQ7XHJcbmltcG9ydCBwcm94eUNvbmZpZyBmcm9tIFwiLi9jb25maWcvcHJveHlcIjtcclxuLy8gXHU3NkY4XHU1QkY5XHU4REVGXHU1Rjg0XHU5MTREXHU3RjZFXHJcbmNvbnN0IHBhdGhSZXNvbHZlID0gKGRpcjogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLlwiLCBkaXIpO1xyXG59O1xyXG5jb25zdCBhbGlhczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcclxuICBcIkBcIjogcGF0aFJlc29sdmUoXCJzcmNcIiksXHJcbn07XHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlIH06IENvbmZpZ0Vudik6IFVzZXJDb25maWcgPT4ge1xyXG4gIC8vIFx1NTJBMFx1OEY3RFx1NzY4NC5lbnZcdTY1ODdcdTRFRjZcdTRFMkRcdTc2ODRcdTUzRDhcdTkxQ0ZcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpO1xyXG4gIGNvbnNvbGUubG9nKGBcclxuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICB2aXRlLmNvbmZpZy50c1xyXG4gICAgXHU3M0FGXHU1ODgzXHVGRjFBJHtwcm9jZXNzLmVudi5OT0RFX0VOVn1cclxuICAgIGJhc2U6ICR7ZW52LlZJVEVfQkFTRV9QQVRIfVxyXG4gICAgXHU4REVGXHU3NTMxXHU2QTIxXHU1RjBGOiR7ZW52LlZJVEVfUk9VVEVSX01PREVMfVxyXG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWApO1xyXG4gIHJldHVybiB7XHJcbiAgICBiYXNlOiBlbnYuVklURV9CQVNFX1BBVEgsXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHZ1ZSgpLFxyXG4gICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG4gICAgICB9KSxcclxuICAgICAgQ29tcG9uZW50cyh7XHJcbiAgICAgICAgLy8gaW5jbHVkZTogWy9zcmNcXC9jb21wb25lbnRzXFwvKi52dWUvXSxcclxuICAgICAgICBnbG9iczogW1wiIXNyYy9jb21wb25lbnRzL0V4Q3JlYXRlRm9ybS9jb21wb25lbnRzL1wiLCBcInNyYy9jb21wb25lbnRzL1wiXSxcclxuICAgICAgICAvLyBleGNsdWRlOiBbXHJcbiAgICAgICAgLy8gICBcInNyYy9jb21wb25lbnRzL0V4TWVudS9pbmRleC52dWVcIixcclxuICAgICAgICAvLyAgIFwic3JjL2NvbXBvbmVudHMvRXhDcmVhdGVGb3JtL2NvbXBvbmVudHMvRXhTaWRlQmFyLnZ1ZVwiLFxyXG4gICAgICAgIC8vICAgLy9cclxuICAgICAgICAvLyAgIC8vIC9zcmNcXC9jb21wb25lbnRzLyxcclxuICAgICAgICAvLyAgIC8vIC9bXFxcXC9dc3JjW1xcXFwvXWNvbXBvbmVudHNbXFxcXC9dRXhDcmVhdGVGb3JtW1xcXFwvXWNvbXBvbmVudHNbXFxcXC9dRXhTaWRlQmFyXFwudnVlJC8sXHJcbiAgICAgICAgLy8gICAvLyAvc3JjW1xcXFwvXWNvbXBvbmVudHNbXFxcXC9dRXhDcmVhdGVGb3JtW1xcXFwvXS8sXHJcbiAgICAgICAgLy8gICAvLyAvc3JjXFwvY29tcG9uZW50c1xcL0V4Q3JlYXRlRm9ybVxcL2NvbXBvbmVudHNcXC8uKlxcLnZ1ZSQvLFxyXG4gICAgICAgIC8vICAgLy8gL3NyY1xcL2NvbXBvbmVudHNcXC9FeENyZWF0ZUZvcm1cXC9jb21wb25lbnRzXFwvRXhTaWRlQmFyLnZ1ZS9nLFxyXG4gICAgICAgIC8vICAgLy8gL3NyY1xcL2NvbXBvbmVudHNcXC8uKlxcL2NvbXBvbmVudHNcXC8uKlxcLnZ1ZSQvLCAvL1x1NjM5Mlx1OTY2NHNyYy9jb21wb25lbnRzXHU3NkVFXHU1RjU1XHU0RTBCXHU0RUZCXHU2MTBGXHU2REYxXHU1RUE2XHU0RUU1Y29tcG9uZW50c1x1NTQ3RFx1NTQwRFx1NzY4NFx1NjU4N1x1NEVGNlx1NTkzOVx1NEUwQlx1NzY4NHZ1ZVx1NjU4N1x1NEVGNlxyXG4gICAgICAgIC8vICAgLy8gL1tcXFxcL11zcmNbXFxcXC9dY29tcG9uZW50c1tcXFxcL10uK1tcXFxcL11jb21wb25lbnRzW1xcXFwvXVteXFxcXC9dK1xcLnZ1ZSQvLCAvL1x1NjM5Mlx1OTY2NHNyYy9jb21wb25lbnRzXHU3NkVFXHU1RjU1XHU0RTBCXHU0RUZCXHU2MTBGXHU2REYxXHU1RUE2XHU0RUU1Y29tcG9uZW50c1x1NTQ3RFx1NTQwRFx1NzY4NFx1NjU4N1x1NEVGNlx1NTkzOVx1NEUwQlx1NzY4NHZ1ZVx1NjU4N1x1NEVGNlxyXG4gICAgICAgIC8vIF0sXHJcbiAgICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcclxuICAgICAgICAvLyBkZWJ1ZzogdHJ1ZSxcclxuICAgICAgfSksXHJcbiAgICAgIHZpc3VhbGl6ZXIoKSxcclxuICAgICAgdnVlU2V0dXBFeHRlbmQoKSxcclxuICAgIF0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICBzb3VyY2VtYXA6IHRydWUsXHJcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgIC8vIFx1NTJBOFx1NjAwMVx1NUJGQ1x1NTE2NVx1NzY4NFx1NjU4N1x1NEVGNlx1NTQwRFxyXG4gICAgICAgICAgZW50cnlGaWxlTmFtZXMoY2h1bmtJbmZvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcImpzL1tuYW1lXS5baGFzaF0uanNcIjtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAvLyBcdTUyQThcdTYwMDFcdTVCRkNcdTUxNjVcdTc2ODRcdTY1ODdcdTRFRjZcdTU0MERcclxuICAgICAgICAgIGNodW5rRmlsZU5hbWVzKGNodW5rSW5mbykge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJqcy9bbmFtZV0uW2hhc2hdLmpzXCI7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgLy8gXHU5NzU5XHU2MDAxXHU4RDQ0XHU2RTkwXHU2NTg3XHU0RUY2XHU1NDBEXHJcbiAgICAgICAgICBhc3NldEZpbGVOYW1lcyhhc3NlbnRJbmZvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIltleHRdL1tuYW1lXS5baGFzaF0uW2V4dF1cIjtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAvLyBcdTgxRUFcdTVCOUFcdTRFNDlcdTUyMDZcdTUzMDVcclxuICAgICAgICAgIG1hbnVhbENodW5rcyhpZCwgeyBnZXRNb2R1bGVJbmZvLCBnZXRNb2R1bGVJZHMgfSkge1xyXG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlTmFtZVRocm91Z2hQYXRoKGlkKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgLy8gdGVyc2VyT3B0aW9uczoge1xyXG4gICAgICAvLyAgIC8vIGNvbXByZXNzOiB7XHJcbiAgICAgIC8vICAgLy8gICBkcm9wX2RlYnVnZ2VyOiBlbnYuVklURV9EUk9QX0RFQlVHR0VSID09PSBcInRydWVcIixcclxuICAgICAgLy8gICAvLyAgIGRyb3BfY29uc29sZTogZW52LlZJVEVfRFJPUF9DT05TT0xFID09PSBcInRydWVcIixcclxuICAgICAgLy8gICAvLyB9LFxyXG4gICAgICAvLyB9LFxyXG4gICAgfSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXMsXHJcbiAgICB9LFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIHByb3h5OiBwcm94eUNvbmZpZyxcclxuICAgIH0sXHJcbiAgfTtcclxufSk7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcZ2l0U3BhY2VcXFxcdnVlMy1kZW1vXFxcXHNyY1xcXFx1dGlsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcZ2l0U3BhY2VcXFxcdnVlMy1kZW1vXFxcXHNyY1xcXFx1dGlsc1xcXFx2YWxpZGF0ZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovZ2l0U3BhY2UvdnVlMy1kZW1vL3NyYy91dGlscy92YWxpZGF0ZS50c1wiOy8qKlxyXG4gKiBAZGVzY3JpcHRpb24gXHU2ODIxXHU5QThDXHU2NjJGXHU1NDI2XHU0RTNBXHU2NTcwXHU1QjU3KFx1NTMwNVx1NjJFQ1x1NkI2M1x1NjU3MFx1MzAwMVx1OEQxRlx1NjU3MFx1NTQ4Q1x1NUMwRlx1NjU3MFx1RkYwQ1x1NUY1M1x1NjYyRlx1NUMwRlx1NjU3MFx1NjVGNlx1NUYwMFx1NTkzNFx1NTNFQVx1ODBGRFx1NjcwOTFcdTRFMkEwKVxyXG4gKiBAcGFyYW0gdmFsdWVcclxuICogQHJldHVybnNcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKSB7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikgdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xyXG4gIGNvbnN0IHJlZyA9IC9eLT8oWzEtOV1cXGQqKFxcLlxcZCspP3wwKFxcLjAqWzEtOV1cXGQqKT8pJC87XHJcbiAgcmV0dXJuIHJlZy50ZXN0KHZhbHVlKTtcclxufVxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uOiAgXHU4RjZDXHU2MzYyXHU0RTNBXHU1MzQzXHU1MjA2XHU1MjM2XHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZTogXHU2NTcwXHU1QjU3XHU2MjE2XHU4MDA1XHU1QjU3XHU3QjI2XHU0RTMyXHU3QzdCXHU1NzhCXHU3Njg0XHU2NTcwXHU1QjU3XHJcbiAqIEByZXR1cm4geyp9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdG9UaG91c2FuZCh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKTogc3RyaW5nIHtcclxuICByZXR1cm4gSW50bC5OdW1iZXJGb3JtYXQoXCJlbi1VU1wiKS5mb3JtYXQoTnVtYmVyKHZhbHVlKSk7XHJcbn1cclxuLyoqXHJcbiAqIEBkZXByZWNhdGVkIFx1NjYyRlx1NTQyNlx1NjYyRlx1NTM0M1x1NTIwNlx1NTIzNlx1NjU3MFx1NUI1NyhcdTUzMDVcdTYyRUNcdTZCNjNcdTY1NzBcdTMwMDFcdThEMUZcdTY1NzBcdTU0OENcdTVDMEZcdTY1NzBcdUZGMENcdTVGNTNcdTY2MkZcdTVDMEZcdTY1NzBcdTY1RjZcdTVGMDBcdTU5MzRcdTUzRUFcdTgwRkRcdTY3MDkxXHU0RTJBMClcclxuICogQHBhcmFtIHZhbHVlXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVGhvdXNhbmQodmFsdWU6IHN0cmluZykge1xyXG4gIGNvbnN0IHJlZyA9IC9eLT8oXFxkezEsM30oLFxcZHszfSkqfFxcZCspKFxcLlxcZCspP3xeLT8wKFxcLjAqWzEtOV1cXGQqKT8kLztcclxuICByZXR1cm4gcmVnLnRlc3QodmFsdWUpO1xyXG59XHJcbi8qKlxyXG4gKiBcdTYyMkFcdTUzRDZcdTRFMjRcdTRFMkFcdTYzMDdcdTVCOUFcdTVCNTdcdTdCMjZcdTRFMzJcdTRFNEJcdTk1RjRcdTc2ODRcdTVCNTdcdTdCMjZcclxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RhcnRcclxuICogQHBhcmFtIHtzdHJpbmd9IGVuZFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfG51bGx9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QmV0d2VlbihzdHI6IHN0cmluZywgc3RhcnQ6IHN0cmluZywgZW5kOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoYCR7c3RhcnR9KC4qPykke2VuZH1gKTtcclxuICBjb25zdCBtYXRjaCA9IHN0ci5tYXRjaChyZWcpO1xyXG4gIHJldHVybiBtYXRjaCA/IG1hdGNoWzFdIDogXCJcIjtcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGdpdFNwYWNlXFxcXHZ1ZTMtZGVtb1xcXFxzcmNcXFxcdXRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGdpdFNwYWNlXFxcXHZ1ZTMtZGVtb1xcXFxzcmNcXFxcdXRpbHNcXFxccGF0aC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovZ2l0U3BhY2UvdnVlMy1kZW1vL3NyYy91dGlscy9wYXRoLnRzXCI7aW1wb3J0IHsgZ2V0QmV0d2VlbiB9IGZyb20gXCIuL3ZhbGlkYXRlXCI7XHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOYW1lVGhyb3VnaFBhdGgocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcclxuICBsZXQgY2h1bmtOYW1lID0gXCJcIjtcclxuICAvLyBcdTRGOURcdThENTZcdTUzMDVcdTUyMDZcdTUzMDVcclxuICBpZiAocGF0aC5pbmNsdWRlcyhcIm5vZGVfbW9kdWxlc1wiKSkge1xyXG4gICAgY2h1bmtOYW1lID1cclxuICAgICAgcGF0aC50b1N0cmluZygpLnNwbGl0KFwibm9kZV9tb2R1bGVzL1wiKVsyXS5zcGxpdChcIi9cIilbMF0udG9TdHJpbmcoKSArXHJcbiAgICAgIGAke2NodW5rTmFtZX1gO1xyXG4gICAgcmV0dXJuIGB2ZW5kb3ItJHtjaHVua05hbWV9YDtcclxuICB9XHJcbiAgLy8gc3JjXHU0RTBCdmlld3NcdTk4NzVcdTk3NjJcdTUyMDZcdTUzMDVcclxuICBpZiAocGF0aC5pbmNsdWRlcyhcInNyYy92aWV3cy9cIikpIHtcclxuICAgIGNodW5rTmFtZSA9IHBhdGguc3BsaXQoXCIvXCIpWzZdO1xyXG4gICAgaWYgKGNodW5rTmFtZS5pbmNsdWRlcyhcImluZGV4XCIpKSB7XHJcbiAgICAgIGNodW5rTmFtZSA9IHBhdGguc3BsaXQoXCIvXCIpWzVdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGB2aWV3cy0ke2NodW5rTmFtZX1gO1xyXG4gIH1cclxuICAvLyBzcmNcdTRFMEJcdTk2NjR2aWV3c1x1NEU0Qlx1NTkxNlx1NzY4NFx1NzZFRVx1NUY1NVx1NTIwNlx1NTMwNVxyXG4gIGlmIChwYXRoLmluY2x1ZGVzKFwic3JjL1wiKSkge1xyXG4gICAgcmV0dXJuIGdldEJldHdlZW4ocGF0aCwgXCJzcmMvXCIsIFwiL1wiKTtcclxuICB9XHJcbiAgcmV0dXJuIGNodW5rTmFtZTtcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGdpdFNwYWNlXFxcXHZ1ZTMtZGVtb1xcXFxjb25maWdcXFxccHJveHlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGdpdFNwYWNlXFxcXHZ1ZTMtZGVtb1xcXFxjb25maWdcXFxccHJveHlcXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2dpdFNwYWNlL3Z1ZTMtZGVtby9jb25maWcvcHJveHkvaW5kZXgudHNcIjtjb25zdCBlbnYgPSBwcm9jZXNzLmVudi5OT0RFX0VOVjtcclxuY29uc3QgY29uZmlnID0ge1xyXG4gIGRldmVsb3BtZW50OiB7XHJcbiAgICBcIi9lZ2dcIjoge1xyXG4gICAgICB0YXJnZXQ6IFwiaHR0cDovLzEyNy4wLjAuMTo3MDAxXCIsXHJcbiAgICAgIHJld3JpdGU6IChwYXRoOiBzdHJpbmcpID0+IHBhdGgucmVwbGFjZShcIi9lZ2dcIiwgXCJcIiksXHJcbiAgICAgIC8vXHU4QkY3XHU2QzQyXHU1OTM0XHU0RTJEXHU3Njg0SG9zdFx1NUMwNlx1ODhBQlx1OEJCRVx1N0Y2RVx1NEUzQVx1NzZFRVx1NjgwN1VSTFx1NzY4NFx1NEUzQlx1NjczQVx1NTQwRFx1RkYwQ1x1ODAwQ1x1NEUwRFx1NjYyRlx1NEVFM1x1NzQwNlx1NjcwRFx1NTJBMVx1NTY2OFx1NzY4NFx1NEUzQlx1NjczQVx1NTQwRFxyXG4gICAgICAvLyBcdTU5ODJcdTY3OUNcdTYzQTVcdTUzRTNcdThERThcdTU3REZcdUZGMENcdTk3MDBcdTg5ODFcdThGREJcdTg4NENcdThGRDlcdTRFMkFcdTUzQzJcdTY1NzBcdTkxNERcdTdGNkVcclxuICAgICAgLy8gY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICBieXBhc3MocmVxOiBhbnksIHJlczogYW55LCBvcHRpb25zOiBhbnkpIHtcclxuICAgICAgICBjb25zdCBwcm94eVVSTCA9IG9wdGlvbnMudGFyZ2V0ICsgb3B0aW9ucy5yZXdyaXRlKHJlcS51cmwpO1xyXG4gICAgICAgIGlmIChlbnYgPT0gXCJkZXZlbG9wbWVudFwiKSB7XHJcbiAgICAgICAgICByZXMuc2V0SGVhZGVyKFwieC1yZWFsLXVybFwiLCBwcm94eVVSTCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIFwiL2V4cHJlc3NcIjoge1xyXG4gICAgICB0YXJnZXQ6IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCIsXHJcbiAgICAgIHJld3JpdGU6IChwYXRoOiBzdHJpbmcpID0+IHBhdGgucmVwbGFjZShcIi9leHByZXNzXCIsIFwiXCIpLFxyXG4gICAgICAvL1x1OEJGN1x1NkM0Mlx1NTkzNFx1NEUyRFx1NzY4NEhvc3RcdTVDMDZcdTg4QUJcdThCQkVcdTdGNkVcdTRFM0FcdTc2RUVcdTY4MDdVUkxcdTc2ODRcdTRFM0JcdTY3M0FcdTU0MERcdUZGMENcdTgwMENcdTRFMERcdTY2MkZcdTRFRTNcdTc0MDZcdTY3MERcdTUyQTFcdTU2NjhcdTc2ODRcdTRFM0JcdTY3M0FcdTU0MERcclxuICAgICAgLy8gXHU1OTgyXHU2NzlDXHU2M0E1XHU1M0UzXHU4REU4XHU1N0RGXHVGRjBDXHU5NzAwXHU4OTgxXHU4RkRCXHU4ODRDXHU4RkQ5XHU0RTJBXHU1M0MyXHU2NTcwXHU5MTREXHU3RjZFXHJcbiAgICAgIC8vIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgYnlwYXNzKHJlcTogYW55LCByZXM6IGFueSwgb3B0aW9uczogYW55KSB7XHJcbiAgICAgICAgY29uc3QgcHJveHlVUkwgPSBvcHRpb25zLnRhcmdldCArIG9wdGlvbnMucmV3cml0ZShyZXEudXJsKTtcclxuICAgICAgICBpZiAoZW52ID09IFwiZGV2ZWxvcG1lbnRcIikge1xyXG4gICAgICAgICAgcmVzLnNldEhlYWRlcihcIngtcmVhbC11cmxcIiwgcHJveHlVUkwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBwcm9kdWN0aW9uOiB7XHJcbiAgICBwcm94eToge30sXHJcbiAgfSxcclxufTtcclxuY29uc29sZS5sb2coYFxyXG4gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIGNvbmZpZy9wcm94eS9pbmRleC50cyBcclxuICAgIGVudjoke2Vudn1cclxuICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1gKTtcclxuZXhwb3J0IGRlZmF1bHQgY29uZmlnW2VudiBhcyBrZXlvZiB0eXBlb2YgY29uZmlnXTtcclxu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
