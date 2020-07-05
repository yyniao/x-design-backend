class Response {
    static success(data){
        return {code: 0, data: data};
    }

    static failed(message){
        return {code: -1, message: message};
    }
}

module.exports = Response;