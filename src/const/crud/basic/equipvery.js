import { fetchList } from "@/api/basic/equipinfo";
export const tableOption = {
  column: [
    {
      type: "table",
      label: "设备名称",
      prop: "equipId",
      display: true,
      search: true,
      editDisabled: false,
      props: {
        label: "equipName",
        value: "id"
      },
      children: {
        border: true,
        column: [
          {
            label: "设备名称",
            prop: "equipName",
            search: true,
            searchSpan: 24
          },
          {
            label: "设备编号",
            prop: "equipCode"
          }
        ]
      },
      // 匹配值
      formatter: row => {
        //   console.log(JSON.stringify(row));
        if (!row.equipName) {
          return "";
        }
        return row.equipName;
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
      addDisplay: false,
      editDisplay: false,
      label: "设备编号",
      prop: "equipCode"
    },
    {
      type: "datetime",
      overHidden: true,
      label: "核查时间",
      prop: "veryTime",
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
          message: "核查时间必须填写"
        }
      ]
    },
    {
      type: "input",
      overHidden: true,
      showColumn: false,
      label: "期间核查内容",
      prop: "veryContent"
    },
    {
      type: "upload",
      overHidden: true,
      label: "期间核查文件",
      prop: "veryFiles",
      display: true,
      showFileList: true,
      multiple: true,
      limit: 10,
      dataType: "string",
      propsHttp: { res: "data" },
      showColumn: false, // 不显示在表格中
      loadText: "附件上传中，请稍等",
      canvasOption: {},
      action: "/admin/file/upload"
    },
    {
      type: "input",
      overHidden: true,
      showColumn: false,
      label: "期间核查文件说明",
      prop: "veryFilesDesc"
    },
    {
      type: "select",
      overHidden: true,
      label: "核查状态",
      prop: "status",
      search: true,
      slot: true,
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
  menuWidth: 430,
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
  searchLabelWidth: 90,
  searchMenuSpan: 24
};
