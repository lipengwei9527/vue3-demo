// {
//   "dyn_id": "981118307352444930",
//   "dyn_type": 8

// },
import { ObjType } from "@/utils/types";
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
export declare interface TableConfig {
  showIndex: boolean;
  showSelection: boolean;
  currentPage: number;
  pageSize: number;
  height?: number;
  api: string;
  loading: boolean;
  showOverflowTooltip: boolean;
  colSlots: string[];
  columns: { prop: string; label: string }[];
  query: ObjType;
  tableData: any[];
  total: number;
  background: boolean;
  pageSizes: number[];
  layout: string;
}
export const tableConfig: TableConfig = {
  // 表格配置
  query: {},
  tableData: data,
  showIndex: true,
  showSelection: true,
  currentPage: 1,
  pageSize: 10,
  height: 200,
  api: "",
  loading: false,
  showOverflowTooltip: true,
  colSlots: ["dyn_id"],
  columns: [
    { prop: "dyn_id", label: "a表头" },
    { prop: "dyn_type", label: "b表头" },
  ],
  // 分页配置
  total: 1000,
  background: true,
  pageSizes: [10, 20, 30, 40, 50, 100],
  layout: "total,prev, pager, next,layout,sizes",
};
export const setTableConfig = (cfg?: object) => {
  return {
    ...tableConfig,
    ...cfg,
  };
};
export const getTableConfig = () => {
  return {
    ...tableConfig,
  };
};
