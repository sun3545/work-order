export const tableOption = {
  column: [
    //   {
    //     type: 'input',
    //     label: '部门ID',
    //     prop: 'deptId'
    //   },
    {
      type: "input",
      label: "部门名称",
      required: true,
      search:true,
      rules: [
        {
          required: true,
          message: "订单编号必须填写"
        }
      ],
      prop: "deptName"
    },
    {
      type: "input",
      label: "备注",
      prop: "notes"
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
  emptyText: "清空",
  menuPosition: "center",
  border: true,
  index: true,
  indexLabel: "序号",
  stripe: true,
  menuAlign: "center",
  align: "center",
  searchLabelWidth:100,
  searchMenuSpan: 6
};
