const mysql = require('@mysql/xdevapi');

const config = {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'user',
    password: process.env.MYSQL_PASSWORD || 'password',
    port: 33060,
    schema: process.env.MYSQL_SCHEMA || 'schema'
};

module.exports = mysql.getClient(
    config,
    {
        pooling:
        {
            queueTimeout: 1000
        }
    }
);