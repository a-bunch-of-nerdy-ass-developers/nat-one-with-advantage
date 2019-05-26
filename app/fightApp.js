const Fight = require('../models/Fight');

module.exports = {
    createNew: async function (title, description, isPrivate) {
        const c = new Fight({
            title,
            description,
            isPrivate,
        });
        await c.save();
    },

    getAllPublic: async function () {
        return Fight
                .find({ isPrivate: false })
                .lean()
                .exec();
    }

};