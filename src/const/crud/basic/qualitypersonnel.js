import { fetchList } from "@/api/basic/qualitydept";

export const tableOption = {
  column: [
    {
      type: "table",
      label: "部门",
      prop: "deptId",
      display: true,
      search:true,
      editDisabled: false,
      rules: [
        {
          required: true,
          message: "部门必须选择"
        }
      ],
      props: {
        label: "deptName",
        value: "deptId"
      },
      children: {
        border: true,
        column: [
          {
            label: "部门",
            prop: "deptName",
            search: true,
            searchSpan: 24
          },
          {
            label: "备注",
            prop: "notes"
          }
        ]
      },
      // 匹配值
      formatter: row => {
        //   console.log(JSON.stringify(row));
        if (!row.deptName) {
          return "";
        }
        return row.deptName;
      },
      onLoad({ page, value, data }, callback){
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
            console.log("分页信息为空",page);
            callback({
              total: response.data.data.total,
              data: response.data.data.records
            });
          });
        }
        //分页查询信息
        // console.log(data, page);
        // fetchList(Object.assign(data={}, page)).then(response => {
        //   callback({
        //     total: response.data.data.total,
        //     data: response.data.data.records
        //   });
        // });
        callback({
          total: 0,
          data: []
        });
      }
    },
    {
      type: "input",
      overHidden: true,
      label: "姓名",
      prop: "name",
      search:true,
      required: true,
      rules: [
        {
          required: true,
          message: "姓名必须填写"
        }
      ]
    },
    {
      type: "radio",
      label: "性别",
      prop: "sexy",
      default: "",
      dicData: [
        {
          label: "男",
          value: "0"
        },
        {
          label: "女",
          value: "1"
        }
      ],
      display: true,
      props: {
        label: "",
        value: ""
      },
      required: true,
      rules: [
        {
          required: true,
          message: "请选择性别"
        }
      ]
    },
    {
      type: "input",
      overHidden: true,
      label: "年龄",
      prop: "age"
    },
    {
      type: "input",
      overHidden: true,
      label: "身份证号",
      prop: "cardNumber",
      rules: [
        {
          required: true,
          message: "身份证号必须填写"
        }
      ],
      required: true
    },
    {
      type: "input",
      overHidden: true,
      label: "联系电话",
      prop: "phone",
      rules: [
        {
          required: true,
          message: "联系电话必须填写"
        }
      ],
      required: true
    },
    {
      type: "upload",
      overHidden: true,
      label: "入职情况",
      prop: "entryFiles",
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
      label: "入职情况说明",
      prop: "entryFilesDesc"
    },
    {
      type: "upload",
      overHidden: true,
      label: "资质证书",
      prop: "certFiles",
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
      label: "资质说明",
      prop: "certFilesDesc"
    },
    {
      type: "upload",
      overHidden: true,
      label: "获奖情况",
      prop: "awardFile",
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
      label: "获奖情况说明",
      prop: "awardFileDesc"
    }
  ],
  labelPosition: "left",
  labelSuffix: "：",
  labelWidth: 120,
  menuWidth: 350,
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
  searchMenuSpan: 6
};
