const querystring = require('querystring');
const http = require('http');

const httpRequest = {
    get: function(url, config={}){
        return new Promise((resolve, reject) => {
            http.get(url, config, (res) => {
                const {statusCode} = res;
                const contentType = res.headers['content-type'];
                let err;
                let rawData = "";

                if (statusCode !== 200) {
                    err = new Error("服务器响应失败");
                } else if (!/application\/json/.test(contentType)){
                    err = new Error("数据格式错误，需要json格式");
                }
                if (err) {
                    console.log(err);
                    //释放内存
                    res.resume();
                    return;
                }

                // chunk是16进制BUFFER数据，需要转成字符打印
                res.on("data", (chunk) => {
                    rawData += chunk;
                });

                //监听请求结束
                res.on("end", () => {
                    try {
                        const parsedData = JSON.parse(rawData);
                        console.log(parsedData);
                    } catch (e) {
                        reject(e);
                    }
                });
            }).on("error", (error) => {
                console.log(error);
            });

        });
    },

    post: function(url, data, config){
        const postData = querystring.stringify(data);

        const options = config || {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        return new Promise((resolve, reject) => {
            const req = http.request(url, options, (res) => {
                console.log(`状态码: ${res.statusCode}`);
                console.log(`响应头: ${JSON.stringify(res.headers)}`);
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    console.log(`响应主体: ${chunk}`);
                });
                res.on('end', () => {
                    console.log('响应中已无数据');
                });
            });

            req.on('error', (e) => {
                console.error(`请求遇到问题: ${e.message}`);
            });

            // 将数据写入请求主体。
            req.write(postData);
            req.end();
        })

    }



};

module.exports = httpRequest;