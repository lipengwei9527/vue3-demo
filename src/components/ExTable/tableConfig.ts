// {
//   "dyn_id": "981118307352444930",
//   "dyn_type": 8

// },
const data: { name: string; age: number }[] = [];
for (let index = 0; index < 100; index++) {
  data.push({ name: "张三" + index, age: index + 18 });
}

import.meta.env;
export type QueryConfigType = {
  label: string; //搜索的参数
  value: any; //搜索输入的值
  compsName: "ExInput" | "ExSelect"; //搜索的组件名称
  [key: string]: any;
};
export declare interface TableConfig {
  query: Record<string, any>; //点击搜索按钮返回的参数
  queryConfig: QueryConfigType[]; //搜索组件配置的参数
  tableData: any[]; //表格展示的数据
  useLocal: boolean; //表格中的数据是否使用的本地的数据
  localData: any[]; //本地的全部表格数据,useLocal为true时,tableData从localData中获取数据
  showIndex: boolean; // 是否显示列的行号
  showSelection: boolean; //是否显示复选框
  currentPage: number; //当前是第几页,从1开始
  pageSize: number; //表格默认显示几行
  height: number; //表格当前高度
  tableApi: string; //获取表格数据的api
  dictApi: string; //字典枚举值api
  loading: boolean; //是否显示遮罩层
  showOverflowTooltip: boolean; //是否显示单元格提示信息
  colSlots: string[]; //表格中的哪些列中的数据使用自定义插槽来显示
  columns: { prop: string; label: string }[]; // 接口中哪些字段显示和显示的中文名称
  // 分页配置
  total: number; //数据总数有多少
  background: boolean; //是否为分页按钮添加背景
  pageSizes: number[]; //分页时一页显示的数据量
  layout: ("prev" | "pager" | "next" | "jumper" | "total")[]; // 分页组件配置
}
const tableConfig: TableConfig = {
  // 表格配置
  query: {},
  queryConfig: [],
  tableData: data,
  useLocal: false,
  localData: [],
  showIndex: true,
  showSelection: true,
  currentPage: 1,
  pageSize: 10,
  height: 200,
  tableApi: "",
  dictApi: "",
  loading: false,
  showOverflowTooltip: true,
  colSlots: [],
  columns: [],
  // 分页配置
  total: 1000,
  background: true,
  pageSizes: [10, 20, 30, 40, 50, 100],
  layout: ["prev", "pager", "next", "jumper", "total"],
};
export const createTableConfig = (
  config: Partial<TableConfig> = {}
): TableConfig => {
  return JSON.parse(JSON.stringify(Object.assign(tableConfig, config)));
};
