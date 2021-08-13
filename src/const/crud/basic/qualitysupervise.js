import { fetchList } from "@/api/basic/qualitypersonnel";

export const tableOption = {
  column: [
    {
      type: "table",
      label: "监督人员",
      prop: "participants",
      display: true,
      editDisabled: false,
      slot:true,
      rules: [
        {
          required: true,
          message: "监督人员必须选择"
        }
      ],
      props: {
        label: "name",
        value: "id"
      },
      children: {
        border: true,
        column: [
          { label: "姓名", prop: "name" },
          {
            label: "年龄",
            prop: "age",
            search: true,
            searchSpan: 24
          },
          {
            label: "手机号",
            prop: "phone"
          }
        ]
      },
      // 匹配值
      formatter: row => {
        //   console.log(JSON.stringify(row));
        if (!row.name) {
          return "";
        }
        return row.name;
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
            console.log("搜索条件为空");
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
            console.log("分页信息为空", page);
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
      type: "datetime",
      label: "监督计划时间",
      prop: "time",
      display: true,
      search: true,
      searchRange: true, // 搜索条件中是否显示日期范围
      searchSpan: 12, // 搜索条件所占用的宽度
      searchClearable: true, // 是否可清除搜索条件
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
      required: true,
      rules: [
        {
          required: true,
          message: "监督计划时间必须填写"
        }
      ]
    },
    {
      type: "input",
      overHidden: true,
      label: "监督计划内容",
      overHidden:true,
      prop: "content"
    },
    {
      type: "select",
      label: "监督状态",
      prop: "status",
      search:true,
      overHidden: true,
      addDisabled: false,
      addDisplay: false,
      editDisabled: false,
      editDisplay: false,
      //   slot: true,
      dicData: [
        {
          label: "已完成",
          value: "已完成"
        },
        {
          label: "未完成",
          value: "未完成"
        }
      ]
      //   display: true
    }
  ],
  labelPosition: "left",
  labelSuffix: "：",
  labelWidth: 120,
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
  menuAlign: "center",
  align: "center",
  searchLabelWidth:120,
  searchMenuSpan: 6
};
