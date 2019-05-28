const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Race = {
	DWARF: 'DWARF',
	ELF: 'ELF',
	GNOME: 'GNOME',
	HUMAN: 'HUMAN',
	GOLEM: 'GOLEM',
	SKELETON: 'SKELETON'
};

const Side = {
	ALLIED: 'ALLIED',
	NEUTRAL: 'NEUTRAL',
	ENEMY: 'ENEMY',
};

const FightSchema = new Schema({
	campaignId: Schema.ObjectId,
	title: String,
	description: String,
	isPrivate: { type: Boolean, default: false },
	grid: {
		x: Number,
		y: Number,
	},
	items: [
		{
			position: {x: Number, y: Number},
			character: {
				id: Schema.ObjectId, // TODO specify the ref
				name: String,
				health: {
					max: Number,
					current: Number,
				},
				race: { type: String, enum: Object.values(Race) },
				side: { type: String, enum: Object.values(Side) },
				// TODO add any weapon or staff or objects
			}
		}
	]
}, {timestamps: true});

const Fight = mongoose.model('Fight', FightSchema);

module.exports = Fight;