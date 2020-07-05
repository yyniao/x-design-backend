const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Response = require('../util/response');
const Request = require('../util/httpsRequest');
const secret = require('../config/secret');
const WXBizDataCrypt = require('../util/WXBizDataCrypt');
const userModel = require('../model/user');

class UserService{
    static async loginByWX(code, info){
        if(!code || !info || !info.rawData || !info.signature || !info.encryptedData || !info.iv){
            return Response.failed('数据格式非法');
        }
        Request.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${secret["wx-appid"]}&secret=${secret["wx-appsecret"]}&js_code=${code}&grant_type=authorization_code`).then(res => {
            const sessionKey = res.session_key;
            if(sessionKey){
                let pc = new WXBizDataCrypt(secret["wx-appid"], sessionKey);
                let data = pc.decryptData(info.encryptedData , info.iv);
                console.log(data);
                const userLogin = new Promise((resolve, reject) => {
                    //userModel.create(data.openId, data.nickName, data.gender, data.language, data.avatarUrl)
                });
                return Response.success({token: jwt.sign(data.openId, secret.sign), nickName: data.nickName, avatarUrl: data.avatarUrl});

            }else{
                return Response.failed('登录凭证无效');
            }
        }).catch(err => {
            console.log(err);
            return Response.failed(err.message);
        })
    }
}

module.exports = UserService;
