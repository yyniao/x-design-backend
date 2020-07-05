const jwt = require('jsonwebtoken');
const secret = require('../config/secret');

module.exports = {
    getTokenUser: function(ctx){
        let token = ctx.header.authorization.substr(7);
        try{
            return jwt.verify(token, secret.sign);
        }catch (e) {
            return null;
        }

    }
}
