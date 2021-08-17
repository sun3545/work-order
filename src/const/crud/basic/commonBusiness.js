import { fetchList } from "@/api/basic/customer";
export const BusinessTableOption = {
  column: [
    {
      type: "input",
      label: "系统编号",
      prop: "orderId",
      overHidden: true,
      addDisplay: false,
      search: true
    },
    {
      type: "input",
      overHidden: true,
      label: "订单编号",
      prop: "clientOrderId",
      // search: true,
      required: true,
      rules: [
        {
          required: true,
          message: "订单编号必须填写"
        }
      ]
    },
    {
      type: "table",
      label: "客户名称",
      prop: "customerId",
      overHidden: true,
      search: true,
      display: true,
      props: {
        label: "customerName",
        value: "customerId"
      },
      required: true,
      rules: [
        {
          required: true,
          message: "订单编号必须填写"
        }
      ],
      children: {
        border: true,
        column: [
          {
            type: "input",
            label: "客户编号",
            //   prop: "customerId" //客户id
            prop: "customerCode"
          },
          {
            label: "客户名称",
            prop: "customerName",
            search: true,
            // searchSpan: 24
          },

          {
            label: "客户地址",
            prop: "addr"
          }
        ]
      },
      // 匹配值
      formatter: row => {
        //   console.log(JSON.stringify(row));
        if (!row.customerName) {
          return "";
        }
        return row.customerName;
      },
      onLoad: ({ page, value, data }, callback) => {
        // 首次加载查询对应的值
        if (value) {
          console.log("首次查询" + value);
          return;
        }
        // 如果搜索条件不为空
        if (data) {
            const newPage = {
                ...page,
                current: page.currentPage,
                size: page.pageSize
              };
          fetchList(Object.assign(data, newPage)).then(response => {
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
          const newPage = {
            ...page,
            current: page.currentPage,
            size: page.pageSize
          };
          fetchList(newPage).then(response => {
            callback({
              total: response.data.data.total,
              data: response.data.data.records
            });
          });
        }
        //分页查询信息
        // callback({
        //   total: 0,
        //   data: []
        // });
      }
    },
    {
      type: "input",
      overHidden: true,
      label: "客户编号",
      overHidden: true,
      prop: "customerCode",
      addDisplay: false
    },

    {
      type: "input",
      overHidden: true,
      label: "订单类型",
      prop: "orderType"
    },
    {
      type: "input",
      overHidden: true,
      label: "订单描述",
      prop: "orderDesc"
    },
    {
      type: "upload",
      overHidden: true,
      label: "订单/合同文件",
      prop: "orderFiles",
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
      showColumn: false,
      label: "订单文件说明",
      prop: "orderFilesDesc"
    },
    {
      type: "upload",
      overHidden: true,
      label: "合同审批文件",
      prop: "orderApproval",
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
      showColumn: false,
      label: "审批文件说明",
      prop: "orderApprovalDesc"
    },
    {
      type: "input",
      overHidden: true,
      label: "确认成交人",
      prop: "confirmUser"
    },
    {
      type: "datetime",
      overHidden: true,
      search: true,
      searchRange: true, // 搜索条件中是否显示日期范围
    //   searchSpan: 12, // 搜索条件所占用的宽度
      searchClearable: true, // 是否可清除搜索条件
      label: "成交日期",
      prop: "confirmTime",
      display: true,
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    },
    {
      type: "input",
      overHidden: true,
      label: "费率",
      prop: "rate"
    },
    {
      type: "input",
      overHidden: true,
      label: "注意事项",
      prop: "attention"
    },
    {
      type: "input",
      overHidden: true,
      label: "CRM负责人",
      prop: "crmUser"
    },

    {
      label: "订单状态",
      prop: "status",
      type: "select",
      search: true,
      dicData: [
        {
          label: "未关闭",
          value: "未关闭"
        },
        {
          label: "已关闭",
          value: "已关闭"
        }
      ],
      overHidden: true
    },
    // {
    //   type: "select",
    //   label: "未关闭原因",
    //   prop: "reason",
    //   slot: true,
    //   search: true,
    //   overHidden: true,
    //   props: {
    //     label: "label",
    //     value: "value"
    //   },
    //   dicUrl: "/admin/dict/type/order_onclosed_reason"
    // }
  ],
  labelPosition: "left",
  labelSuffix: ":",
  labelWidth: 120,
  searchLabelWidth: 90,
  menuWidth: 300,
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
  //   stripe: true,
  menuAlign: "center",
  align: "center",
  searchIcon: true,
  searchSpan: 6,
  searchMenuSpan: 24
};
