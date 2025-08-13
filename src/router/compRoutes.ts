export default [
  {
    path: "/context_menu",
    name: "左键菜单",
    component: () => import("@/views/componentManage/contextMenu/index.vue"),
  },
  {
    path: "/calendar",
    name: "日历",
    component: () => import("@/views/componentManage/calendarPage/index.vue"),
  },
  {
    path: "/table_page",
    name: "表格组件",
    component: () => import("@/views/componentManage/tablePage/index.vue"),
  },
  {
    path: "/file_page",
    name: "文件上传",
    component: () => import("@/views/componentManage/filePage/index.vue"),
  },
  {
    path: "/form_page",
    name: "表单",
    component: () => import("@/views/componentManage/FormPage/index.vue"),
  },
  {
    path: "/create_form_page",
    name: "创造表单",
    component: () => import("@/views/componentManage/createFormPage/index.vue"),
  },
];
