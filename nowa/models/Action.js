const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActionType = {
    MOVEMENT: 'MOVEMENT',
    ATTACK: 'ATTACK',
    TAKE_DAMAGE: 'TAKE_DAMAGE',
    DIE: 'DIE',
    RAGE: 'RAGE',
};

const ActionSchema = new Schema({
    fightId: Schema.ObjectId,
    actionType: { type: String, enum: Object.values(ActionType) },
    targets: [{x: Number, y: Number}],
    reactions: [{ type: String, enum: Object.values(ActionType) }], // TODO
    output: [
        {
            characterId: Schema.ObjectId,
            actionType: { type: String, enum: Object.values(ActionType) },
            damageAmount: Number
        }
    ]
}, {timestamps: true});

const Action = mongoose.model('Action', ActionSchema);

module.exports = Action;