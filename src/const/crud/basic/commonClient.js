
import { fetchList } from "@/api/basic/customer";
// import { fetchList } from "@/api/basic/applier";
import { fetchList as businessFetchList} from "@/api/basic/orderbusiness";
export const clientOptions =  {
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
        //   type: "input",
          label: "客户编号",
          //   prop: "customerId" //客户id
          prop: "customerCode",
          search: true,
          searchSpan: 12
        },
        {
          label: "客户名称",
          prop: "customerName",
          search: true,
          searchSpan: 12
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
  }