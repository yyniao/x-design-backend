const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://root:123456@localhost:3306/x_design', {
    define: {timestamps: false},
        timezone: '+08:00' //东八时区
    });

sequelize.sync({alter: true});
module.exports = sequelize;
