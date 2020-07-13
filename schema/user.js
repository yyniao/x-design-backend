
const moment = require('moment');

module.exports = (sequelize, DataTypes) =>
    sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        phone: {
            type: DataTypes.STRING(64),
            allowNull: true
        },
        nickname: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(512),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(512),
            allowNull: true
        },
        avatarUrl: {
            type: DataTypes.STRING(512),
            allowNull: false,
            defaultValue: "/static/image/mine/photo.png"
        },
        gender: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING(64),
            allowNull: false,
            defaultValue: ""
        },
        province: {
            type: DataTypes.STRING(64),
            allowNull: false,
            defaultValue: ""
        },
        city: {
            type: DataTypes.STRING(64),
            allowNull: false,
            defaultValue: ""
        },
        wxOpenid: {
            type: DataTypes.STRING(64),
            allowNull: true
        },
        qqOpenid: {
            type: DataTypes.STRING(64),
            allowNull: true
        },
        wxUnionid: {
            type: DataTypes.STRING(64),
            allowNull: true
        },
        qqUnionid: {
            type: DataTypes.STRING(64),
            allowNull: true
        },
        registerTime: {
            type: DataTypes.DATE,
            allowNull: false,
            get() {
                return moment(this.getDataValue('createdTime')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        isValid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    }, {
        tableName: 'user'
    });
