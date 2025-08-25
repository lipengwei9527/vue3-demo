import { CustomRouteRecordRaw } from "@/types/router";
const compRoutes: CustomRouteRecordRaw = {
  path: "/comp",
  name: "comp",
  labelName: "组件管理",
  children: [
    // {
    //   name: "CalendarPage",
    //   path: "/CalendarPage",
    //   labelName: "日历页",
    //   component: () => import("@/views/ComponentManage/CalendarPage/index.vue"),
    // },
    {
      path: "/",
      name: "",
      labelName: "表单页",
      isHidden: true,
      redirect: "FormPage",
    },
    {
      name: "FormPage",
      path: "/FormPage",
      labelName: "表单页",
      component: () => import("@/views/ComponentManage/FormPage/index.vue"),
    },
    {
      path: "/ContextMenuPage",
      name: "ContextMenuPage",
      labelName: "左键菜单页",
      component: () =>
        import("@/views/ComponentManage/ContextMenuPage/index.vue"),
    },

    {
      name: "TablePage",
      path: "/TablePage",
      labelName: "表格页",
      component: () => import("@/views/ComponentManage/TablePage/index.vue"),
    },
    {
      name: "FilePage",
      path: "/FilePage",
      labelName: "文件页",
      component: () => import("@/views/ComponentManage/FilePage/index.vue"),
    },

    {
      name: "testPage",
      path: "/testPage",
      labelName: "测试页面",
      component: () => import("@/views/ComponentManage/testPage/index.vue"),
    },
  ],
};
export default compRoutes;
