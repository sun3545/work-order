import { fetchList } from "@/api/basic/qualitydept";

export const tableOption = {
  column: [
    {
      type: "input",
      label: "参与部门",
      prop: "depts",
      slot: true,
      display: false,
      overHidden:true,
      editDisabled: false,
      addDisabled: false
    },
    {
      label: "参与人员",
      prop: "participants",
      type: "tree",
      //   formslot: true,
        slot: true,
      display: false,
      overHidden:true,
      editDisabled: false,
      editDisplay: false,
      addDisabled: false,
      addDisplay: false
    },
    {
      type: "datetime",
      overHidden: true,
      label: "培训计划时间",
      prop: "time",
      search: true,
      searchRange: true, // 搜索条件中是否显示日期范围
      searchSpan: 12, // 搜索条件所占用的宽度
      searchClearable: true, // 是否可清除搜索条件
      display: true,
      format: "yyyy-MM-dd HH:mm:ss",
      valueFormat: "yyyy-MM-dd HH:mm:ss",
      required: true,
      rules: [
        {
          required: true,
          message: "培训计划时间必须填写"
        }
      ]
    },
    {
      type: "input",
      overHidden: true,
      label: "培训计划内容",
      prop: "content",
      required: false,
      overHidden:true,
      rules: []
    },
    {
      type: "select",
      overHidden: true,
      label: "培训状态",
      prop: "status",
      search:true,
      addDisabled: false,
      addDisplay: false,
      editDisabled: false,
      editDisplay: false,
      // slot: true,
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
    }
  ],
  labelPosition: "left",
  labelSuffix: "：",
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
  //   border: true,
  index: true,
  indexLabel: "序号",
  //   stripe: true,
  menuAlign: "center",
  align: "center",
  searchLabelWidth:120,
  searchMenuSpan: 6
};
