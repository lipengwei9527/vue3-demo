import { RouteRecordRaw } from "vue-router";
type SupRouteRecordRaw = {
  labelName: string; // 菜单显示名称
  isHidden?: boolean; // 是否在菜单中隐藏该路由
  children?: CustomRouteRecordRaw[]; // 子路由
};
export declare type CustomRouteRecordRaw = RouteRecordRaw & SupRouteRecordRaw;
