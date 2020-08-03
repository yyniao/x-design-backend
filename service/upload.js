const myUploadOssHelper = require('../util/uploadOssHelper');
const secret = require('../config/secret');

const previewHelper = new myUploadOssHelper({
    accessKeyId: secret.accessKeyID,
    accessKeySecret: secret.accessKeySecret,
    timeout: 1, // 限制参数的生效时间(单位：小时)。
    maxSize: 0.2, // 限制上传文件大小(单位：Mb)。
});

class UserService{
 static async getPreviewParam(){
        return previewHelper.createUploadParams();
    }
}
