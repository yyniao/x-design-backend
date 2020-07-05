const bcrypt = require('bcrypt');
const Response = require('../util/response');
const Request = require('../util/request');
const secret = require('../config/secret')

class UserService{
    static async loginByWX(code, info){
        if(!code || !info || !info.rawData || info.signature || info.encryptedData || !info.iv){
            return Response.failed('数据格式非法');
        }
        Request.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${secret["wx-appid"]}&secret=SECRET&js_code=JSCODE&grant_type=authorization_code`)
    }
}

module.exports = UserService;
