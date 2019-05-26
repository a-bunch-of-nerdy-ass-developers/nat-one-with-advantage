const Campaign = require('../models/Campaign');

module.exports = {
    createNew: async function (title, description, avatarUrl, isPrivate) {
        const c = new Campaign({
            title,
            description,
            avatarUrl,
            isPrivate,
        });
        await c.save();
    },

    getAllPublic: async function () {
        return Campaign
                .find({ isPrivate: false })
                .lean()
                .exec();
    }

};