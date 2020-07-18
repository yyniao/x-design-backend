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
     * 按微信的unionId查询
     * @param unionId
     * @returns {Promise.<*>}
     */
    static async findByWXUnionId(unionId){
        return User.findOne({
            where: {wxUnionId: unionId}
        });
    }

    /**
     * 按QQ的unionId查询
     * @param unionId
     * @returns {Promise.<*>}
     */
    static async findByQQUnionId(unionId){
        return User.findOne({
            where: {qqUnionId: unionId}
        });
    }

    /**
     * 创建用户
     * @returns {Promise.<*>}
     */
    static async create({phone='', nickName="未命名", password='', email='', avatarUrl='/static/image/mine/photo.png', gender=0,
                        country='', province='', city='', wxUnionId='', qqUnionId=''}){
        let user = await User.create({
            phone: phone, nickname: nickName, password: password, email: email, avatarUrl: avatarUrl, gender: gender,
            country: country, province: province, city: city, wxUnionId: wxUnionId, qqUnionId: qqUnionId,
            registerTime: getNowFormatTime()
        });
        return user;
    }

    static async findByUid(id){
        return User.findOne({
            where: {id:id}
        });
    }

    static async updateNickname(id, newName){
        let user = await User.findOne({
            where: {name: newName}
        });
        if(user){
            return {code: -1};
        }

        await User.update({name: newName}, {where: {id: id}});
        return {code: 0};
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
