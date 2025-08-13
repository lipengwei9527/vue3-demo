export default {
  formName: "exampleForm",
  id: "123",
  schema: "create", //create,edit,read
  formConfig: [
    {
      id: "1",
      name: "ex-input",
      type: "input",
      label: "姓名",
      field: "name",
      defaultValue: "li",
      disabled: false,
      rules: [],
    },
    {
      idL: "2",
      name: "ex-input",
      type: "input",
      label: "年龄",
      field: "age",
      defaultValue: 18,
      disabled: false,
      rules: [],
    },
    {
      id: "3",
      name: "ex-select",
      type: "select",
      label: "职位",
      field: "job",
      defaultValue: "1",
      fullLine: true,
      options: [
        { label: "员工1", value: "1", disabled: true },
        { label: "员工2", value: "2" },
        { label: "员工3", value: "3" },
      ],
      disabled: false,
      rules: [],
    },
  ],
};
