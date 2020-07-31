const OSS = require('ali-oss');
const secret = require('../config/secret');

const client = new OSS({
    region: 'oss-cn-hangzhou',
    accessKeyId: secret.accessKeyID,
    accessKeySecret: secret.accessKeySecret,
    bucket: 'x-design'
});

// 获取下载文件ossdemo.txt的签名URL，浏览器访问时默认直接预览要下载的文件。
function signatureUrls(urls){
    let signedUrls = [];
   for(let url of urls){
       signedUrls.push(client.signatureUrl(url));
   }
   return signedUrls;
}
module.exports = signatureUrls;
