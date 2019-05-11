const Fight = require('../models/Fight');

async function createNew(title, description) {
    const c = new Fight({
        title,
        description,
    });
    await c.save();
}

module.exports = {
    createNew,
};