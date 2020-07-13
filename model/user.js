const db = require('../config/db');
const getNowFormatTime = require('../util/timeProcesser');
const User = db.import('../schema/user.js');
const seq = require('sequelize');
const Op = seq.Op;

User.sync();

class UserModel {
    /**
     * 按手机号码查询
     * @param phone
     * @returns {Promise.<*>}
     */
    static async findByPhone(phone){
        return User.findOne({
            where: {phone:phone}
        });
    }

    /**
     * 按openId查询
     * @param openId
     * @returns {Promise.<*>}
     */
    static async findByWXOpenId(openId){
        return User.findOne({
            where: {WXOpenId: openId}
        });
    }

    /**
     * 按openId查询
     * @param openId
     * @returns {Promise.<*>}
     */
    static async findByQQOpenId(openId){
        return User.findOne({
            where: {QQOpenId: openId}
        });
    }

    /**
     * 创建用户
     * @param name 昵称
     * @param password 密码
     * @param phone 手机号码
     * @returns {Promise.<*>}
     */
    static async create(phone='', nickname, password='', email='', avatarUrl='/static/image/mine/photo.png', gender=0,
                        country='', province='', city='', wxOpenid, qqOpenId, wxUnionid, qqUnionid){
        let user = await User.findOne({
            where: {phone:phone}
        });
        if(user){
            return {code: -2};
        }
        user = await User.findOne({
            where: {name:name}
        });
        if(user){
            return {code: -1};
        }
        user = await User.create({name: name, password: password, phone: phone, email: email, createdTime: getNowFormatTime()});
        return {code: 0, data: user};
    }

    static async findByUid(id){
        return User.findOne({
            where: {id:id}
        });
    }

    static async updateName(id, newName){
        let user = await User.findOne({
            where: {name: newName}
        });
        if(user){
            return {code: -1};
        }

        await User.update({name: newName}, {where: {id: id}});
        return {code: 0};
    }

    static async updateEmail(id, newEmail){
        await User.update({email: newEmail}, {where: {id: id}});
        return {code: 0};
    }

    static async updateSignature(id, newSignature){
        await User.update({signature: newSignature}, {where: {id: id}});
        return {code: 0};
    }

    static async identifyTeacher(uid){
        await User.update({role: 'TEACHER'}, {where: {id: uid}});
        return true;
    }

    static async resetPassword(phone, newPassword){
        let result = await User.update({password: newPassword}, {where: {phone: phone}});
        return result[0]> 0;
    }

    static async getUsers(){
        return User.findAll({
            where: {role: {[Op.ne]: 'ADMIN'}}
        });
    }

    static async updateIsValid(id, isValid){
        await User.update({isValid: isValid}, {where: {id: id}});
        return true;
    }
}

module.exports = UserModel;
