import { fetchList } from "@/api/basic/orderbusiness";

export const tableOption = {
  // private String id;
  // private String orderId;
  // private String businessStatus;// 商务阶段状态
  // private Integer businessReason; // 商务阶段未关闭原因
  // private String execStatus;// 执行阶段状态
  // private Integer execReason; // 执行阶段未关闭原因
  // private String settleStatus;// 商务阶段状态
  // private Integer settleReason; // 商务阶段未关闭原因

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
            console.log(JSON.stringify(row));
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
      label: "商务阶段状态",
      prop: "businessStatus",
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
      label: "商务阶段未关闭原因",
      prop: "businessReason",
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
    },
    {
      label: "执行阶段状态",
      prop: "execStatus",
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
      label: "执行阶段未关闭原因",
      prop: "execReason",
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
    },
    {
      label: "结算阶段状态",
      prop: "settleStatus",
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
      label: "结算阶段未关闭原因",
      prop: "settleReason",
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
  labelWidth: 120,
  menuWidth: 300,
  gutter: 0,
  menuBtn: true,
  menu: false,
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
  searchLabelWidth: 150,
  searchWidth: 380,
  searchSpan: 8,
  searchMenuSpan: 24
};
