import fileDownload from "@/api/basic/download";
import { handleBatchDownload } from "./one";
export default {
  methods: {
    handleDownload(row, index) {
      const keys = Object.keys(row);

      console.log(row);
      const httpStr = keys
        .map(function(item) {
          const value = row[item] + "";
          if (value.includes("/files/")) {
            return value;
          }
        })
        .filter(ele => {
          return ele;
        })
        .join(",");
      console.log(JSON.stringify(httpStr));
      if (!httpStr.length) {
        this.$message.error("没有可下载文件");
        return;
      }
      //   handleBatchDownload(["http://localhost:8080/20210803/新建文本文档.txt,http://localhost:8080/20210803/新建文本文档.txt,http://localhost:8080/20210803/wel.vue"])
      fileDownload({ paths: httpStr }).then(
        res => {
          console.log("地址：", res);
          const url = res.data.data + "?auth=6afbd1215b9c83c4879e17045a6d76ae";

          window.open(url);
        },
        err => {
          console.log("zip下载失败", "错误信息：" + err);
        }
      );
    }
  }
};
