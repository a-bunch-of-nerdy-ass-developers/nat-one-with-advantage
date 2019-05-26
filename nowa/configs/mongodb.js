const mongoConfig = {
    user: 'dm',
    pass: 'dm',
    host: 'localhost',
    port: 27017,
    databaseName: 'nowa_dev',
};

mongoConfig.uri = `mongodb://${mongoConfig.user}:${mongoConfig.pass}@${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.databaseName}`

module.exports = mongoConfig;