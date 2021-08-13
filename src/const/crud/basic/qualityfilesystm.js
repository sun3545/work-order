export const tableOption = {
  column: [
    {
      type: "select",
      overHidden: true,
      search:true,
      label: "文件分类",
      prop: "type",
      required: true,
      rules: [
        {
          required: true,
          message: "订单编号必须填写"
        }
      ],
      dicData: [
        {
          label: "质量书册",
          value: 0
        },
        {
          label: "程序文件",
          value: 1
        }, 
        {
          label: "作业指导",
          value: 2
        },
        {
          label: "记录表格",
          value: 3
        }
      ],
      cascaderItem: [],
      display: true,
      props: {
        label: "label",
        value: "value"
      },
      required: true,
      rules: [
        {
          required: true,
          message: "请选择文件分类"
        }
      ]
    },
    {
      type: "upload",
      overHidden: true,
      label: "文件",
      prop: "file",
      display: true,
      showFileList: true,
      multiple: true,
      limit: 10,
      dataType: "string",
      propsHttp: { res: "data" },
      showColumn: false,
      loadText: "附件上传中，请稍等",
      canvasOption: {},
      action: "/admin/file/upload"
    },
    {
      type: "input",
      overHidden: true,
      label: "文件说明",
      prop: "fileDesc",
      rules: []
    }
  ],
  labelPosition: "left",
  labelSuffix: ":",
  labelWidth: 120,
  menuWidth:350,
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
  searchIcon: true,
  searchSpan: 8,
  showSummary: true,
  sumColumnList: [
    {
      label: "设备数量：",
      name: "equipId",
      type: "count",
    },
  ],
  searchMenuSpan: 6
};
