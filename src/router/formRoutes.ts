import { CustomRouteRecordRaw } from "@/types/router";
const formRoutes: CustomRouteRecordRaw = {
  path: "/form",
  name: "form",
  labelName: "表单",
  children: [
    {
      name: "CreateFormPage",
      path: "/CreateFormPage",
      labelName: "创建表单",
      meta: {},
      component: () =>
        import("@/views/ComponentManage/CreateFormPage/index.vue"),
    },
  ],
};
export default formRoutes;
