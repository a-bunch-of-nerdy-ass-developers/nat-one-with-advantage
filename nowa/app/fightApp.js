const Fight = require('../models/Fight');
const Action = require('../models/Action');
const io = require('../socketIO');

module.exports = {
    createNew: async function (campaignId, title, description, isPrivate) {
        const c = new Fight({
            campaignId,
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
    },

    doAnAction: async function(fightId, actionType, targets, reactions, outputs) {
        const a = new Action({
            fightId,
            actionType,
            targets,
            reactions,
            outputs
        });
        a.save();
        io.to(`fight-${fightId}`).emit({
            actionType,
            targets,
            reactions,
            outputs
        });
    }

};