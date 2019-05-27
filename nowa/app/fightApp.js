const Fight = require('../models/Fight');
const Action = require('../models/Action');
const {io, sockets} = require('../socketIO');

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
        if (Array.isArray(sockets[fightId])) {
            sockets[fightId].forEach(s => s.emit('update fight', {
                actionType,
                targets,
                reactions,
                outputs
            }));
        }
        return a.save;
    },

    getById: async function(id) {
      return Fight
              .findById(id)
              .lean()
              .exec();
    },

};