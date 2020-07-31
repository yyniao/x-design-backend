const OSS = require('ali-oss')
const STS = client.STS
const express = require('express');
const app = express();
const secret = require('../config/secret');


const stsClient = new STS({
    accessKeyId: secret.accessKeyID,
    accessKeySecret: secret.accessKeySecret,
    bucket: 'x-design'
});

async function getSTSToken(uid) {
    const STS_ROLE = '<STS_ROLE>'  // 指定角色的ARN。格式：acs:ram::$accountID:role/$roleName。
    const STSPolicy = {
        Statement: [
            {
                Action: [
                    "oss:PutObject"
                ],
                Effect: 'Allow',
                Resource: [`acs:oss:*:*:x-design/user${uid}`, `acs:oss:*:*:x-design/user${uid}/*`]
            }
        ],
        Version: '1'
    };
    const result = await stsClient.assumeRole(
        STS_ROLE,
        STSPolicy,
        3600 // STS过期时间，单位：秒。
    );
    const { credentials } = result;

    return credentials;
}

module.exports = getSTSToken;