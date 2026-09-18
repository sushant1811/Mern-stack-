const { createClient } = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_KEY,
    socket: {
        host: 'redis-13258.crce217.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 13258
    }
});

module.exports=redisClient;