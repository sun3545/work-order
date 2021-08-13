export const tableOption = {
  column: [
    {
      type: "input",
      overHidden: true,
      label: "供应商名称",
      prop: "applierName",
      display: true,
      required: true,
      rules: [
        {
          required: true,
          message: "供应商名称，录入必须填写"
        }
      ]
    },
    {
      type: "input",
      overHidden: true,
      label: "供应商编号",
      prop: "applierCode",
      rules: []
    },
    {
      type: "input",
      overHidden: true,
      label: "供应商地址",
      prop: "addr"
    }
  ],
  labelPosition: "left",
  labelSuffix: "：",
  labelWidth: 120,
  gutter: 0,
  menuBtn: true,
  submitBtn: true,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  submitText: "提交",
  emptyBtn: true,
  emptyText: "暂无数据",
  menuPosition: "center",
  border: true,
  index: true,
  indexLabel: "序号",
  stripe: true,
  menuAlign: "center",
  align: "center",
  searchMenuSpan: 6
};
