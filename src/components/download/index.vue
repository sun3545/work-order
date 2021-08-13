<template>
  <el-button @click="handleDownload">一键下载</el-button>
</template>
<script>
import axios from "axios";
import JSZip from "jszip";
// import FileSaver from "file-saver";
export default {
  data() {
    return {
      fileList: []
    };
  },
  created() {
    this.$observer.$on("downloadFileList", fileList => {
      console.log(fileList);
      this.fileList = fileList;
    });
  },
  methods: {
    handleDownload() {
      const zip = new JSZip();
      const cache = {};
      const promises = [];
      this.fileList.forEach(item => {
        const promise = this.getFile(item.fileUrl).then(data => {
          const file_name = item.fileName;
          zip.file(file_name, data, { binary: true });
          cache[file_name] = data;
        });
        promises.push(promise);
      });
      Promise.all(promises).then(() => {
        zip.generateAsync({ type: "blob" }).then(content => {
          // 生成二进制流
        //   FileSaver.saveAs(content, '文件下载.zip') // 利用file-saver保存文件  自定义文件名
          saveAs(content, "文件下载.zip"); // 利用file-saver保存文件  自定义文件名
        });
      });
    },
    getFile(url) {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url,
          responseType: "blob"
          // responseType: 'arraybuffer'
        })
          .then(data => {
            console.log(data);
            resolve(data.data);
          })
          .catch(error => {
            reject(error.toString());
          });
      });
    }
  }
};
</script>
