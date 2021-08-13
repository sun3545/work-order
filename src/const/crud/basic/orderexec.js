import { fetchList } from "@/api/basic/orderbusiness";
export const tableOption = {
  column: [
    {
      // 与order_business表中的order_id关联，在录入信息时，
      // 直接选择order_business表中的订单编号（输入选择），可作为查询条件
      type: "table",
      label: "系统编号",
      prop: "orderId",
      search: true,
      overHidden: true,
      required: true,
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
            // console.l
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
      overHidden: true,
      //   showColumn:false,
      addDisabled: false, // 表单新增是否禁止
      addDisplay: false, // 表单新增是否可见
      editDisabled: false, // 表单新增是否禁止
      editDisplay: false, // 表单新增是否可见
      search: true,
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
      label: "任务指派人",
      prop: "taskAssignor",
      required: true,
      rules: [
        {
          required: true,
          message: "任务指派人必须填写"
        }
      ]
    },
    {
      type: "input",
      overHidden: true,
      label: "任务描述",
      prop: "taskDesc",
      rules: []
    },
    {
      type: "input",
      overHidden: true,
      label: "执行人",
      prop: "execUser",
      rules: [
        {
          required: true,
          message: "执行人必须填写"
        }
      ]
    },
    {
      type: "input",
      overHidden: true,
      label: "执行设备",
      prop: "execEquip"
    },
    {
      type: "input",
      overHidden: true,
      label: "执行辅助设备",
      prop: "execAssistEquip"
    },
    {
      type: "input",
      overHidden: true,
      label: "耗材描述",
      prop: "consDesc"
    },
    {
      type: "datetime",
      overHidden: true,

      //   search:true,
      //   searchRange: true, // 搜索条件中是否显示日期范围
      //   searchSpan: 12, // 搜索条件所占用的宽度
      //   searchClearable: true, // 是否可清除搜索条件

      label: "起始日期",
      prop: "beginTime",
      display: true,
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    },
    {
      type: "datetime",
      overHidden: true,
      label: "结束日期",
      prop: "endTime",
      display: true,
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss"
    },
    {
      type: "upload",
      overHidden: true,
      label: "监测报告记录",
      prop: "monitorFiles",
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
      label: "监测报告记录说明",
      prop: "monitorFilesDesc"
    },
    {
      type: "input",
      overHidden: true,
      label: "客户代表",
      prop: "customerRep"
    },
    {
      type: "input",
      overHidden: true,
      label: "联系电话",
      prop: "customerRepPhone"
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
      slot: true,
      search: true,
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
  searchLabelWidth: 90,
  labelWidth: 120,
  menuWidth: 280,
  gutter: 0,
  menuBtn: true,
  submitBtn: true,
  submitText: "提交",
  emptyBtn: true,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  emptyText: "暂无数据",
  menuPosition: "center",
  border: true,
  index: true,
  indexLabel: "序号",
  //   stripe: true,
  menuAlign: "center",
  align: "center",
  searchMenuSpan: 24
};
