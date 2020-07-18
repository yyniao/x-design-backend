const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Response = require('../util/response');
const Request = require('../util/httpsRequest');
const secret = require('../config/secret');
const WXBizDataCrypt = require('../util/WXBizDataCrypt');
const userModel = require('../model/user');

const baseUrls = {
    qq: 'https://api.q.qq.com',
    wx: 'https://api.weixin.qq.com'
};

class UserService{
    static async loginByMiniProgram(code, info, origin){
        if(!code || !info || !info.signature || !info.encryptedData || !info.iv || !origin){
            return Response.failed('数据格式非法');
        }
        let appid='', appsecret='';
        if(origin === 'wx'){
            appid = secret['wx-appid'];
            appsecret = secret['wx-appsecret'];
        }else if(origin === 'qq'){
            appid = secret['qq-appid'];
            appsecret = secret['qq-appsecret'];
        }

        let url = `${baseUrls[origin]}/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`;

        console.log(url);

        await Request.get(url).then(async res => {
            const sessionKey = res.session_key;
            if(sessionKey){
                let pc = new WXBizDataCrypt(secret[`${origin}-appid`], sessionKey);
                let data = pc.decryptData(info.encryptedData , info.iv);
                console.log(data);
                if(!data.watermark || data.watermark.appid !== secret[`${origin}-appid`]){
                    return Response.failed('请求非法');
                }
                // 后期请删除
                if(!data.unionId){
                    data.unionId = 'mock001';
                }

                let user;
                if(origin === 'wx'){
                    user = await userModel.findByWXUnionId(data.unionId);
                }else if(origin === 'qq'){
                    user = await userModel.findByQQUnionId(data.unionId);
                }
                if(user && !user.isValid){
                    return Response.failed('账号封禁中');
                }

                if(!user){
                    user = await userModel.create(data);
                }
                return Response.success({token: jwt.sign(user.id, secret.sign), nickName: user.nickName, avatarUrl: user.avatarUrl});



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
