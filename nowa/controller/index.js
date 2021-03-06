const routes = {
    '/user': require('./userController.js'),
    '/campaign': require('./campaignController.js'),
    '/fight': require('./fightController.js'),
};

module.exports = (app) => {
    Object.keys(routes).forEach((path) => {
        app.use('/api/v1' + path, routes[path]);
    });
};