const userService = require('../service/user');
const jwt = require('jsonwebtoken');
// const aliClient = require('../util/aliClient');
const tokenProcessor = require('../util/tokenProcessor');
const Response = require('../util/response');

class UserController {
    /**
     * 登录
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async login(ctx) {
        const data = ctx.request.body;
        let result = Response.failed('登陆失败');
        if(data.origin === "微信"){
            result = await userService.loginByMiniProgram(data.code, data.userInfo, 'wx');
        }else if(data.origin === 'QQ') {
            result = await userService.loginByMiniProgram(data.code, data.userInfo, 'qq');
        }else{
            result = Response.failed('非法登录');
        }

        ctx.body = Response.failed('test');
    }
    //
    // static async getInfo(ctx) {
    //     let theUser = await tokenProcessor.getTokenUser(ctx);
    //     if(!theUser){
    //         ctx.status = 401;
    //     }else{
    //         let id = theUser.id;
    //         const user = await userService.getInfo(id);
    //         if (user) {
    //             ctx.body = Response.success({phone: user.phone, email: user.email, id: user.id, name: user.name, signature: user.signature});
    //         } else {
    //             ctx.body = Response.failed('用户信息获取失败');
    //         }
    //     }
    // }

}

module.exports = UserController;