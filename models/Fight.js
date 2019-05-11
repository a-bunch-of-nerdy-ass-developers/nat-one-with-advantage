const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FightSchema = new Schema({
	title: String,
	description: String,
	grid: {
		x: Number,
		y: Number,
	},
	items: [
		{
			position: {x: Number, y: Number},
		}
	]
});

const Fight = mongoose.model('Fight', FightSchema);

module.exports = Fight;