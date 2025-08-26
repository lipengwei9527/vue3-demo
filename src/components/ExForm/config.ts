import {
  ExFormConfigType,
  DiyFormItemType,
  CompCfgType,
} from "@/types/components";
const configData: CompCfgType[] = [
  {
    id: 1,
    type: "DiyInput",
    label: "姓名",
    field: "name",
    value: "li",
    isFullLine: true,
    disabled: false,
    rules: [],
  },
  {
    id: 2,
    type: "DiyInput",
    label: "年龄",
    field: "age",
    value: 18,
    isFullLine: false,
    disabled: false,
    rules: [],
  },
  {
    id: 3,
    type: "DiyInput",
    label: "地址",
    field: "address",
    value: 18,
    isFullLine: true,
    disabled: false,
    rules: [],
  },
  // {
  //   id: "3",
  //   type: "DiySelect",
  //   label: "职位",
  //   field: "job",
  //   value: "1",
  //   isFullLine: true,
  //   options: [
  //     { label: "员工1", value: "1", disabled: true },
  //     { label: "员工2", value: "2", disabled: true },
  //     { label: "员工3", value: "3", disabled: true },
  //   ],
  //   disabled: false,
  //   rules: [],
  // },
];
const formConfig: ExFormConfigType = {
  name: "exampleForm",
  id: 123,
  mode: "create", //create,edit,read
  // (DiyContainerType | DiyFormItemType)[]
  labelWidth: "",
  // containerConfig
  containerCfg: [
    {
      id: 1,
      type: "DiyContainer",
      title: "标题1",
      // config: JSON.parse(JSON.stringify(configData)),
      // DiyFormItemType
      config: [
        {
          id: 2,
          type: "DiyFormItem",
          label: "姓名",
          compCfg: {
            id: "1-1",
            type: "DiyInput",
            field: "name",
            value: "",
            disabled: false,
          },
          // config: [],
        },
        {
          id: 3,
          type: "DiyFormItem",
          label: "年龄",
          compCfg: {
            id: "1-2",
            type: "DiyInput",
            field: "age",
            value: "",
            disabled: false,
          },
          // config: [],
        },
        {
          id: 5,
          type: "DiyContainer",
          title: "标题5",
          config: [],
          // config: JSON.parse(JSON.stringify(configData)),
        },
      ],
    },
    {
      id: 6,
      type: "DiyContainer",
      title: "标题6",
      config: [],
      // config: JSON.parse(JSON.stringify(configData)),
    },
    {
      id: 7,
      type: "DiyContainer",
      title: "标题7",
      config: [],
      // config: JSON.parse(JSON.stringify(configData)),
    },
  ],
};
export default formConfig;
