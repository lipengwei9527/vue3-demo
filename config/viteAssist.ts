import { createHtmlPlugin } from "vite-plugin-html";
import type { PluginOption } from "vite";
// 自定义插件：过滤空 chunk
export const removeEmptyChunks = (): PluginOption => {
  return {
    name: "remove-empty-chunks", // 插件名称
    generateBundle(options, bundle) {
      // 遍历所有 chunk
      Object.keys(bundle).forEach((id) => {
        const chunk = bundle[id];

        // 检查是否为 chunk 且内容为空（根据实际场景调整判断条件）
        if (
          chunk.type === "chunk" &&
          (!chunk.code || chunk.code.trim() === "") && // 代码为空
          chunk.modules &&
          Object.keys(chunk.modules).length === 0
        ) {
          // 没有模块
          // 删除空 chunk
          delete bundle[id];
        }
      });
    },
  };
};

type CusUserOptions = Parameters<typeof createHtmlPlugin>[0];
// createHtmlPlugin函数的参数配置项
export const htmlPluginConfig: CusUserOptions = {
  inject: {
    data: {
      title: "vite+vue3+ts项目",
    },
    tags: [
      {
        injectTo: "body",
        tag: "script",
        attrs: {
          src: "/src/utils/update.ts",
          type: "module",
        },
      },
      {
        injectTo: "head",
        tag: "link",
        attrs: {
          rel: "icon",
          type: "image/svg+xml",
          href: "/vite.svg",
        },
      },
    ],
  },
};
