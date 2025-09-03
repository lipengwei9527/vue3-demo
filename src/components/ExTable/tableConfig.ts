// {
//   "dyn_id": "981118307352444930",
//   "dyn_type": 8

// },
const data = [
  {
    dyn_id: "981118307352444930",
    dyn_type: 8,
  },
  {
    dyn_id: "981099233446723617",
    dyn_type: 8,
  },
  {
    dyn_id: "980962374298107942",
    dyn_type: 8,
  },
  {
    dyn_id: "980962370015723573",
    dyn_type: 8,
  },
  {
    dyn_id: "980948226680029184",
    dyn_type: 8,
  },
  {
    dyn_id: "980731777499791478",
    dyn_type: 8,
  },
  {
    dyn_id: "980699552380092432",
    dyn_type: 8,
  },
  {
    dyn_id: "980686658843181057",
    dyn_type: 8,
  },
  {
    dyn_id: "980685542413828200",
    dyn_type: 8,
  },
  {
    dyn_id: "980680190643404882",
    dyn_type: 8,
  },
  {
    dyn_id: "980591551144001541",
    dyn_type: 8,
  },
  {
    dyn_id: "980591289127927816",
    dyn_type: 8,
  },
  {
    dyn_id: "980591284853932066",
    dyn_type: 8,
  },
  {
    dyn_id: "980220203962990627",
    dyn_type: 8,
  },
  {
    dyn_id: "980220199672217632",
    dyn_type: 8,
  },
  {
    dyn_id: "979478033604804662",
    dyn_type: 8,
  },
  {
    dyn_id: "979478033601658897",
    dyn_type: 8,
  },
  {
    dyn_id: "979463916016893989",
    dyn_type: 8,
  },
  {
    dyn_id: "979448505697304598",
    dyn_type: 8,
  },
  {
    dyn_id: "979268666852900901",
    dyn_type: 8,
  },
  {
    dyn_id: "979264853131657234",
    dyn_type: 8,
  },
  {
    dyn_id: "979255137683898408",
    dyn_type: 8,
  },
  {
    dyn_id: "979235638539714577",
    dyn_type: 8,
  },
  {
    dyn_id: "979200784894787617",
    dyn_type: 8,
  },
  {
    dyn_id: "979193328822124665",
    dyn_type: 8,
  },
  {
    dyn_id: "979106952691843081",
    dyn_type: 8,
  },
  {
    dyn_id: "979106948400021509",
    dyn_type: 8,
  },
  {
    dyn_id: "979100523169841158",
    dyn_type: 8,
  },
  {
    dyn_id: "978830094859501573",
    dyn_type: 8,
  },
  {
    dyn_id: "978814504087322675",
    dyn_type: 8,
  },
  {
    dyn_id: "978737323772477506",
    dyn_type: 8,
  },
  {
    dyn_id: "978735863223549991",
    dyn_type: 8,
  },
  {
    dyn_id: "978735858985205816",
    dyn_type: 8,
  },
  {
    dyn_id: "978721711350349860",
    dyn_type: 8,
  },
  {
    dyn_id: "978458893704232965",
    dyn_type: 8,
  },
  {
    dyn_id: "978364778091118614",
    dyn_type: 8,
  },
  {
    dyn_id: "978364773766791203",
    dyn_type: 8,
  },
];
type queryType = {
  [key in string]: any;
};
import.meta.env;
export type QueryConfigType = {
  [key: string]: any;
  label: string;
  value: any;
  compsName: "ExInput" | "ExSelect";
};
export declare interface TableConfig {
  query: queryType; //点击搜索按钮返回的参数
  queryConfig: QueryConfigType[]; //搜索组件配置的参数
  tableData: any[]; //表格展示的数据
  showIndex: boolean; // 是否显示列的行号
  showSelection: boolean; //是否显示复选框
  currentPage: number; //当前是第几页,从1开始
  pageSize: number; //表格默认显示几行
  height?: number; //表格默认高度
  api: string; //获取表格数据的api
  loading: boolean; //是否显示遮罩层
  showOverflowTooltip: boolean; //是否显示单元格提示信息
  colSlots: string[]; //自定义哪些插槽
  columns: { prop: string; label: string }[]; // 接口中哪些字段显示和显示的中文名称
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
  showIndex: true,
  showSelection: true,
  currentPage: 1,
  pageSize: 10,
  height: 200,
  api: "",
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
