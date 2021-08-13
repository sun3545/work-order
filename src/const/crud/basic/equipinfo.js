import { fetchList } from "@/api/basic/applier";

export const tableOption = {
  column: [
    {
      type: "input",
      overHidden: true,
      label: "设备名称",
      prop: "equipName",
      required: true,
      rules: [
        {
          required: true,
          message: "设备名称必须填写"
        }
      ],
      display: true
    },
    {
      type: "input",
      overHidden: true,
      editDisplay: false,
      label: "设备编号",
      prop: "equipCode"
    },
    {
      type: "table",
      label: "供应商",
      prop: "applierId",
      display: true,
      props: {
        label: "applierName",
        value: "applierId"
      },
      children: {
        border: true,
        column: [
          {
            label: "供应商",
            prop: "applierName",
            search: true,
            searchSpan: 24
          },
          {
            label: "供应商地址",
            prop: "addr"
          }
        ]
      },
      // 匹配值
      formatter: row => {
        //   console.log(JSON.stringify(row));
        if (!row.applierName) {
          return "";
        }
        return row.applierName;
      },
      onLoad: ({ page, value, data }, callback) => {
        // 首次加载查询对应的值
        if (value) {
          console.log("首次查询" + value);
          return;
        }
        // 如果搜索条件不为空
        if (data) {
          fetchList(Object.assign(data, page)).then(response => {
            callback({
              total: response.data.data.total,
              data: response.data.data.records
            });
          });
          return;
        }
        // 如果分页信息不为空
        if (page) {
          if (data) {
            return;
          }
          fetchList(page).then(response => {
            callback({
              total: response.data.data.total,
              data: response.data.data.records
            });
          });
        }
        //分页查询信息
        callback({
          total: 0,
          data: []
        });
      }
    },
    {
      type: "input",
      overHidden: true,
      label: "规格型号",
      prop: "model"
    },
    {
      type: "upload",
      overHidden: true,
      label: "合格证",
      prop: "certificate",
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
      type: "upload",
      overHidden: true,
      label: "说明书",
      prop: "instructions",
      display: true,
      showFileList: true,
      multiple: true,
      showColumn: false,
      limit: 10,
      dataType: "string",
      propsHttp: { res: "data" },
      loadText: "附件上传中，请稍等",
      canvasOption: {},
      drag: false,
      action: "/admin/file/upload"
    },
    {
      type: "select",
      overHidden: true,
      label: "设备状态",
      prop: "status",
      search:true,
      slot: true,
      dicData: [
        {
          label: "在用",
          value: 0
        },
        {
          label: "停用",
          value: 1
        }
      ],
      cascaderItem: [],
      display: true,
      props: {
        label: "",
        value: ""
      }
    },
    {
      type: "input",
      overHidden: true,
      label: "停用原因",
      prop: "stopReason"
    }
  ],
  labelPosition: "left",
  labelSuffix: "：",
  labelWidth: 100,
  menuWidth: 350,
  gutter: 0,
  menuBtn: true,
  submitBtn: true,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  //   viewBtn:true,
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
  searchMenuSpan: 6,
  searchLabelWidth: 110
};
