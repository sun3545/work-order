export const tableOption = {
  column: [
    {
      type: "input",
      overHidden: true,
      label: "客户名称",
      prop: "customerName",
      required: true,
      rules: [
        {
          required: true,
          message: "客户名称必须填写"
        }
      ],
      display: true
    },
    {
      type: "input",
      overHidden: true,
      label: "客户编号",
      prop: "customerCode",
      rules: []
    },
    {
      type: "input",
      overHidden: true,
      label: "客户来源",
      prop: "source"
    },
    {
      type: "input",
      overHidden: true,
      label: "客户地址",
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
