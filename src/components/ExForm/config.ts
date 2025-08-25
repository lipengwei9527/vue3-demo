import { ExFormConfigType, DiyConfigType } from "@/types/components";
const configData: DiyConfigType[] = [
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
  model: "create", //create,edit,read
  config: [
    {
      id: 1,
      type: "DiyContainer",
      title: "标题1",
      // config: JSON.parse(JSON.stringify(configData)),
      config: [
        {
          id: 4,
          type: "DiyContainer",
          title: "标题4",
          // config: JSON.parse(JSON.stringify(configData)),
        },
        {
          id: 5,
          type: "DiyContainer",
          title: "标题5",
          // config: JSON.parse(JSON.stringify(configData)),
        },
      ],
    },
    {
      id: 2,
      type: "DiyContainer",
      title: "标题2",
      // config: JSON.parse(JSON.stringify(configData)),
    },
    {
      id: 3,
      type: "DiyContainer",
      title: "标题3",
      // config: JSON.parse(JSON.stringify(configData)),
    },
  ],
};
export default formConfig;
