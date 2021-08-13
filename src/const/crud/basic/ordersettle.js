import { fetchList } from "@/api/basic/orderbusiness";

export const tableOption = {
  column: [
    {
      type: "table",
      label: "系统编号",
      prop: "orderId",
      overHidden: true,
      required: true,
      search: true,
      //   formslot: true,
      //   slot: true,
      rules: [
        {
          required: true,
          message: "订单编号必须填写"
        }
      ],
      //   search: true,
      display: true,
      editDisabled: false,
      props: {
        label: "orderId",
        value: "orderId"
      },
      children: {
        border: true,
        column: [
          {
            type: "input",
            label: "系统编号",
            search: true,
            searchSpan: 24,
            prop: "orderId"
          },
          {
            label: "订单编号",
            prop: "clientOrderId"
          },
          {
            label: "客户",
            prop: "customerName"
          },
          {
            label: "订单类型",
            prop: "orderType"
          },
          {
            label: "订单描述",
            prop: "orderDesc"
          },
          {
            label: "确认成交日期",
            prop: "confirmTime",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss"
          },
          {
            label: "费率",
            prop: "rate"
          },
          {
            label: "注意事项",
            prop: "attention"
          },
          {
            label: "CRM负责人",
            prop: "crmUser"
          }
        ]
      },
      // 匹配值
      formatter: row => {
        //   console.log(JSON.stringify(row));
        if (!row.orderId) {
          return "";
        }
        return row.orderId;
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
      type: "table",
      label: "客户名称",
      prop: "customerId",
      //   showColumn:false,
      overHidden: true,
      addDisabled: false,
      addDisplay: false,
      editDisabled: false,
      editDisplay: false,
      search: true,
      //   formslot: true,
      //   slot: true,
      //   display: true,
      props: {
        label: "customerName",
        value: "customerId"
      },
      children: {
        border: true,
        column: [
          {
            label: "客户名称",
            prop: "customerName",
            search: true,
            searchSpan: 24
          },
          {
            type: "input",
            label: "客户编号",
            //   prop: "customerId" //客户id
            prop: "customerCode"
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
      label: "计费工作量",
      prop: "chargeWorkload"
    },
    {
      type: "upload",
      overHidden: true,
      label: "工作量确认文件",
      prop: "workloadFiles",
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
      label: "工作量确认文件说明",
      prop: "workloadFilesDesc"
    },
    {
      type: "input",
      overHidden: true,
      label: "费率",
      prop: "rate"
    },
    {
      type: "upload",
      overHidden: true,
      label: "结算文件",
      prop: "settleFiles",
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
      label: "结算文件说明",
      prop: "settleFilesDesc"
    },
    {
      type: "upload",
      overHidden: true,
      label: "结算文件确认记录",
      prop: "settleConfirmFiles",
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
      label: "结算文件确认记录说明",
      prop: "settleConfirmFilesDesc"
    },
    {
      type: "year",
      overHidden: true,
      label: "执行年份",
      search: true,
      prop: "execYear",
      display: true,
      format: "yyyy",
      valueFormat: "yyyy"
    },
    {
      type: "month",
      overHidden: true,
      search: true,
      label: "执行月份",
      prop: "execMonth",
      display: true,
      format: "MM",
      valueFormat: "MM"
    },
    {
      type: "input",
      overHidden: true,
      label: "执行金额",
      prop: "execAmount"
    },
    {
      type: "upload",
      overHidden: true,
      label: "差旅费客户不承担情况",
      prop: "expenseNoncomFiles",
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
      label: "差旅费客户不承担情况说明",
      prop: "expenseNoncomFilesDesc"
    },
    {
      type: "upload",
      overHidden: true,
      label: "差旅费客户开票",
      prop: "expenseBillingFiles",
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
      label: "差旅费客户开票说明",
      prop: "expenseBillingFilesDesc"
    },
    {
      type: "upload",
      overHidden: true,
      label: "差旅费客户实报实销",
      prop: "expenseReimFiles",
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
      label: "差旅费客户实报实销说明",
      prop: "expenseReimFilesDesc"
    },
    {
      type: "upload",
      overHidden: true,
      label: "差旅费客户不开发票",
      prop: "expenseNoBillingFiles",
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
      label: "差旅费客户不开发票说明",
      prop: "expenseNoBillingFilesDesc"
    },
    {
      type: "upload",
      overHidden: true,
      label: "差旅到款记录",
      prop: "payedFiles",
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
      label: "到款记录描述",
      prop: "payedFilesDesc"
    },
    {
      type: "input",
      overHidden: true,
      label: "执行月份对应产值",
      prop: "execMonthAmount"
    },
    {
      type: "input",
      overHidden: true,
      label: "含税金额",
      prop: "taxedAmount"
    },
    {
      type: "input",
      overHidden: true,
      label: "未税金额",
      prop: "noTaxedAmount"
    },
    {
      type: "datetime",
      overHidden: true,
      label: "开票日期",
      prop: "billingDate",
      display: true,
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    },
    {
      type: "input",
      overHidden: true,
      label: "发票号",
      prop: "invoiceCode"
    },
    {
      type: "upload",
      overHidden: true,
      label: "发票文件",
      prop: "billingFiles",
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
      label: "发票文件说明",
      prop: "billingFilesDesc"
    },
    {
      type: "input",
      overHidden: true,
      label: "发票快递单号",
      prop: "billingExpressCode"
    },
    {
      type: "upload",
      overHidden: true,
      label: "对方收票确认",
      prop: "customerConfirm",
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
      label: "对方售票确认说明",
      prop: "customerConfirmDesc"
    },
    {
      type: "upload",
      overHidden: true,
      label: "到款记录",
      prop: "payReceivedFiles",
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
      label: "到款记录说明",
      prop: "payReceivedFilesDesc"
    },
    {
      type: "datetime",
      overHidden: true,
      label: "收款日期",
      prop: "receivedDate",
      display: true,
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    },
    {
      type: "input",
      overHidden: true,
      label: "佣金",
      prop: "commission"
    },
    {
      label: "是否关闭",
      prop: "status",
      type: "select",
      search: true,
      slot: true,
      addDisabled: false,
      addDisplay: false,
      editDisabled: false,
      editDisplay: false,
      overHidden: true,
      dicData: [
        {
          label: "未关闭",
          value: "未关闭"
        },
        {
          label: "已关闭",
          value: "已关闭"
        }
      ]
    },
    {
      type: "select",
      overHidden: true,
      label: "未关闭原因",
      prop: "reason",
      search: true,
      slot: true,
      addDisabled: false,
      addDisplay: false,
      editDisabled: false,
      editDisplay: false,
      overHidden: true,
      props: {
        label: "label",
        value: "value"
      },
      dicUrl: "/admin/dict/type/order_onclosed_reason"
    }
  ],
  labelPosition: "left",
  labelSuffix: ":",
  labelWidth: 180,
  searchLabelWidth: 90,
  menuWidth: 280,
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
  showSummary: true,
  sumColumnList: [
    {
      label: "合计:",
      name: "execAmount",
      type: "sum"
    },
    {
      label: "合计:",
      name: "taxedAmount",
      type: "sum"
    },
    {
      label: "合计:",
      name: "noTaxedAmount",
      type: "sum"
    },
    {
      label: "合计:",
      name: "commission",
      type: "sum"
    }
  ],
  searchMenuSpan: 24,
  searchSpan: 8
};
