import JSZip from 'jszip';
import FileSaver from 'filesaver'
function getFile(url) {
    return new Promise(resolve => {
        const xhr =new XMLHttpRequest();
        // 避免 200 from disk cache
        url = url + `?r=${Math.random()}`;
        xhr.open('GET', url,true);
        xhr.responseType ='blob';
        xhr.onload = () => {
            if (xhr.status === 200) {
              resolve(xhr.response);
            }else {
              resolve();// 避免图片下载失败，导致批量导出失败
            }
        };
        xhr.send();
    });
}
// 批量下载
export  async function handleBatchDownload(selectImgList, idArray) {
    const data = selectImgList;
    const zip =new JSZip();
    const cache = {};
    const promises = [];
    await data.forEach((item, index) => {
      const promise = getFile(item).then((fileData) => {
        // 下载文件
        const arrName = item.split('/');
        let fileName = arrName[arrName.length - 1];// 获取文件名
        // 转码文件名, 上传的文件用decodeURIComponent转汉字
        const endIndex = fileName.lastIndexOf('.');
        const format = fileName.slice(endIndex);
        const startName = fileName.slice(0, endIndex);
        const newFileName = decodeURIComponent(startName) + format;
        zip.file(newFileName, fileData, {
          binary:true
        });// 逐个添加文件
        cache[newFileName] = fileData;
      });
      promises.push(promise);
    });
    Promise.all(promises).then(() => {
      zip
        .generateAsync({
          type:'blob'
        })
        .then(async (content) => {
          // 生成二进制流；利用file-saver保存文件
          FileSaver.saveas("https://httpbin.org/image", "image.jpg");
        //   FileSaver.saveAs(
        //     content,
        //     `压缩文件.zip`
        //   );
        });
    });
  };