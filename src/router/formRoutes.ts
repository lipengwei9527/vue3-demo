export default {
  path: "/form",
  name: "创建表单",
  children: [
    {
      path: "/CreateFormPage",
      name: "创建表单",
      component: () =>
        import("@/views/ComponentManage/CreateFormPage/index.vue"),
    },
  ],
};
