const Campaign = require('../models/Campaign');


async function createNew(title, description, avatarUrl) {
    const c = new Campaign({
        title,
        description,
        avatarUrl,
    });
    await c.save();
}

module.exports = {
    createNew,
};