const Fight = require('../models/Fight');
const Action = require('../models/Action');
const {io, sockets} = require('../socketIO');

module.exports = {
    createNew: async function (campaignId, title, description, items, grid, isPrivate) {
        const c = new Fight({
            campaignId,
            title,
            description,
            items,
            grid,
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

    doAnAction: async function(fightId, characterName, actionType, targets, reactions, outputs) {
        const a = new Action({
            fightId,
            actionType,
            targets,
            reactions,
            outputs,
            characterName,
        });
        await a.save();
        if (Array.isArray(sockets[fightId])) {
            sockets[fightId].forEach(s => s.emit('update fight', {
                actionType,
                targets,
                reactions,
                outputs,
                characterName,
            }));
        }
    },

    getById: async function(id) {
      return Fight
              .findById(id)
              .lean()
              .exec();
    },

};