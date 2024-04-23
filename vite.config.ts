import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import type { UserConfigExport, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import dayjs from "dayjs";
import { resolve } from "path";

import { viteMockServe } from "vite-plugin-mock"; //mock
// https://vitejs.dev/config/
export default defineConfig(({ command }: ConfigEnv): any => {
  return {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
        imports: ["vue", "vue-router", "pinia", "@vueuse/core"],
        //注意这个配置和src同级
        dts: "/src/auto-imports.d.ts",
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      viteMockServe({
        mockPath: "mock", //设置模拟.ts 文件的存储文件夹
        enable: true, //是否启用 mock 功能
        watchFiles: true, //设置是否监视mockPath对应的文件夹内文件中的更改
        logger: true // 是否在控制台显示请求日志
      })
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src")
      }
    },
    //定义全局常量替换方式。其中每项在开发环境下会被定义在全局，而在构建时被静态替换
    define: {}
  };
});
