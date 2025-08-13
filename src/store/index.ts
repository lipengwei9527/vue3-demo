import { createPinia } from "pinia";
import persistPlugin from "@/store/plugin/persistPlugin";
const pinia = createPinia();
/**
 * @description 仓库数据持久化插件
 * @example 去除持久化先注释掉插件，在删除本地存储数据
 */
pinia.use(persistPlugin);
export default pinia;
